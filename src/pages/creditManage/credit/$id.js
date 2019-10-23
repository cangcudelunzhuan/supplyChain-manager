import React, { Component } from 'react';
import { Form, Input, Row, Col, Button, Select, Radio, DatePicker } from 'antd';
import { DyPage, DyUpload, DyControl } from 'dy-components';
import { connect } from 'dva';
import RegExp from 'src/utils/regExp';
import { isContain, getFileList, goBack } from 'src/utils/tools';
import moment from 'moment';
import '../index.less';
import { formItemLayout, gutter } from 'src/utils/gridInit';
import LicenseHistory from './components/LicenseHistory';
@connect(({ business_l, loading }) => ({
  business_l,
  detailLoading: loading.effects['business_l/getdetail'] && loading.effects['business_l/getFileList'],
}))
@Form.create()
class Index extends Component {
  state = {
    fileParamList: [],
    repaymentDay: true,
    checkValues: '',
    showLimitDateInput: true,
    id: '',
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    this.setState({ id });
    this.getDetail(id);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.match.params.id !== prevState.id) {
      let id = nextProps.match.params.id;
      return {
        id,
      };
    }
    return null;
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.state.id) {
      this.getDetail(this.state.id);
    }
  }
  getDetail = async (id) => {
    let res = await this.props.dispatch({
      type: 'business_l/getBusiDetail',
      payload: { id },
    });
    this.rentTypeChange(res.data.interestType);
    if (res.data.fileVoList) {
      let fileParamList = getFileList(res.data.fileVoList);
      this.setState({
        fileParamList: fileParamList,
      });
    }
    this.setState({
      checkValues: res.data.payRateType,
    });
    this.props.form.setFieldsValue({
      ...res.data,
      expireDate: moment(res.data.expireDate),
    });
  }
  // 渲染表单组件
  renderField = (label, key, component, options = {
    rules: [
      { required: true, whitespace: true, message: '不能为空' },
    ],
  }, col = 12) => {
    const { getFieldDecorator } = this.props.form;
    return (
      <Col span={col}>
        <Form.Item
          label={label}
        >
          {key ? getFieldDecorator(key, options)(component) : component}
        </Form.Item>
      </Col>
    );
  }
  rentTypeChange = (v) => {
    this.setState({
      repaymentDay: v === 1 ? true : false,
      showLimitDateInput: v === 1 ? true : false,
    });
  }

  render() {
    const { fileParamList, repaymentDay, showLimitDateInput, checkValues } = this.state;
    let rateRule = {
      rules: [
        { required: true, ...RegExp.Rate },
      ],
    };
    let isDisabled = true;
    let action = [
      <Button key="back" onClick={(e) => { goBack(e, this); }}>返回</Button>,
    ];
    return (
      <DyControl permission="1004001004" key="control">
        <DyPage
          className="user-manage-detail"
          breadcrumb={[{
            name: '额度管理',
          }, {
            name: '授信额度管理',
            href: '/creditManage/credit',
          }, {
            name: '授信额度详情',
          }]}
          action={action}
        >
          <Form {...formItemLayout} >
            <Row gutter={gutter}>
              <div className="block-title">基本信息</div>
              {this.renderField('持牌机构编号', 'licenseOrganizationNo', <Input disabled={isDisabled} />, {
                rules: [
                  { required: true, ...RegExp.SocialCode },
                ],
              })}
              {this.renderField('持牌机构名称', 'licenseOrganizationName', <Input disabled />)}
              {this.renderField('出资机构编号', 'fundingOrganizationNo', <Input disabled={isDisabled} />, {
                rules: [
                  { required: true, ...RegExp.SocialCode },
                ],
              })}
              {this.renderField('出资机构名称', 'fundingOrganizationName', <Input disabled />)}
              {this.renderField('出资机构类型', 'organizationType', <Select disabled>
                <Select.Option value={1} key={1}>{'银行'}</Select.Option>
                <Select.Option value={2} key={2}>{'非银行金融机构'}</Select.Option>
                <Select.Option value={3} key={3}>{'其他'}</Select.Option>
              </Select>, {
                rules: [
                  { required: true, message: '不能为空', type: 'number' },
                ],
              })}
            </Row>
            <Row gutter={gutter}>
              <div className="block-title">授信额度</div>
              {this.renderField('授信额度（元）', 'creditAmount', <Input disabled={isDisabled} />, {
                rules: [
                  { required: true, ...RegExp.Money },
                ],
              })}
              {this.renderField('出资方式', 'type', <Select disabled>
                <Select.Option value={1} key={1}>{'先授信后放款 '}</Select.Option>
                <Select.Option value={2} key={2}>{'授信并放款'}</Select.Option>
              </Select>, { initialValue: 1 })}
              {this.renderField('计息方式', 'interestType', <Select onChange={this.rentTypeChange} placeholder="请选择计息方式" disabled={isDisabled}>
                <Select.Option value={1} key={1}>{'按月付息到期还本'}</Select.Option>
                <Select.Option value={2} key={2}>{'一次性还本付息'}</Select.Option>
              </Select>, {
                rules: [
                  { required: true, type: 'number', message: '必选' },
                ],
              })}
              {repaymentDay && this.renderField('固定付费日', 'repaymentDay', <Input disabled={isDisabled} placeholder="不能填写28日之后的日期" />, {
                rules: [
                  { required: true, ...RegExp.payDay },
                ],
              })}
              {this.renderField('授信利率（%）', 'financeRate', <Input disabled={isDisabled} />, rateRule)}
              {this.renderField('额度期限类别', 'isLimited',
                <Radio.Group disabled={isDisabled}>
                  <Radio value={1}>额度有期限</Radio>
                  <Radio value={2}>额度无期限</Radio>
                </Radio.Group>, {
                  rules: [
                    { required: true, message: '必选' },
                  ],
                })}
              {showLimitDateInput && (this.renderField('授信额度到期日', 'expireDate',
                <DatePicker format="YYYY-MM-DD" disabledDate={(e) => {
                  return e && e < moment().endOf('day');
                }}
                disabled={isDisabled} />, {
                  rules: [
                    { required: true, message: '必选' },
                  ],
                }))}
              {this.renderField('授信保证金比例（%）', 'riskDepositRate', <Input disabled={isDisabled} />, rateRule)}
              {this.renderField('授信类别', 'payRateType',
                <Select placeholder="请选择计息方式" disabled={isDisabled}>
                  <Select.Option value={1} key={1}>{'仅现金'}</Select.Option>
                  <Select.Option value={2} key={2}>{'仅银票'}</Select.Option>
                  <Select.Option value={3} key={3}>{'混合支付'}</Select.Option>
                  <Select.Option value={4} key={4}>{'比例支付'}</Select.Option>
                </Select>, {
                  rules: [
                    { required: true, type: 'number', message: '必选' },
                  ],
                })}
              {checkValues === 4 && this.renderField('银票占比（%）', 'ticketPayRate', <Input disabled={isDisabled} />, rateRule)}
              {checkValues === 4 && this.renderField('现金占比（%）', 'casePayRate', <Input disabled={isDisabled} />, rateRule)}
              {(checkValues === 2 || checkValues === 3 || checkValues === 4) && this.renderField('票据保证金比例(%)', 'ticketDepositRate', <Input disabled={isDisabled} />, rateRule)}
            </Row>
            <Row gutter={gutter}>
              <div className="block-title">附件</div>
              {this.renderField('', 'fileParamList',
                <DyUpload app={this}
                  fileList={fileParamList}
                  action={'global/toUpload'}
                  fileListName={'fileParamList'}
                  status={isDisabled}
                />, {
                  rules: [
                    { required: false },
                  ],
                })}
            </Row>
          </Form>
          <LicenseHistory />
        </DyPage>
      </DyControl>
    );
  }
}

export default Index;
