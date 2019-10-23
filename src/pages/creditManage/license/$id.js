import React, { Component } from 'react';
import { Form, Input, Row, Col, Button, message, Select, Radio, DatePicker, Table } from 'antd';
import { DyPage, DyFormModal, DyUpload, DyExamineBox, DyControl } from 'dy-components';
import Logs from './components/Logs';
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
    status: null,
    fileParamList: [],
    licenseOrganizationId: '',
    fundingOrganizationId: '',
    visible: false,
    repaymentDay: true,
    checkValues: '',
    logList: [],
    showLimitDateInput: true,
    notexaminevisible: false,
    id: '',
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    this.setState({ id });
    let type = id === 'add' ? false : true;
    if (type) {
      this.getDetail(id);
    }
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
      if (this.state.id !== 'add') {
        this.getDetail(this.state.id);
      }
    }
  }
  getDetail = async (id) => {
    let res = await this.props.dispatch({
      type: 'business_l/getBusiDetail',
      payload: { id },
    });
    this.setState({
      status: res.data.status,
      licenseOrganizationId: res.data.licenseOrganizationId,
      fundingOrganizationId: res.data.fundingOrganizationId,
      logList: res.data.auditLogVoList || [],
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


  // 提交修改
  handleSubmit = (e) => {
    e.preventDefault();
    const { licenseOrganizationId, fundingOrganizationId } = this.state;
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(values);
      if (!err) {
        let fileParamList = this.state.fileParamList;
        delete values.licenseOrganizationNo;
        delete values.fundingOrganizationNo;
        delete values.fundingOrganizationName;
        delete values.licenseOrganizationName;
        let allValue = {
          ...values,
          fileParamList,
          licenseOrganizationId,
          fundingOrganizationId,
        };
        if (values.isLimited === 1) {
          allValue.expireDate = moment(values.expireDate).format('YYYY-MM-DD');
        }
        let id = this.props.match.params.id;
        if (id !== 'add') {
          allValue.id = Number(id);
        }
        this.props.dispatch({
          type: id === 'add' ? 'business_l/postAdd' : 'business_l/putUpdate',
          payload: allValue,
        }).then((res) => {
          message.success('操作成功！');
          goBack(e, this);
        });
      }
    });
  }
  // 打开审核框
  openModal = () => {
    this.setState({
      visible: true,
    });
  }
  // 审核不通过modal打开
  notexamine = () => {
    this.setState({
      notexaminevisible: true,
    });
  }
  // 审核不通过
  setAction = (data) => {
    this.toex(3, data);
  }
  // 审核通过
  examine = () => {
    this.toex(2);
  }
  // 审核接口调用
  toex = async (type, data) => {
    let res = await this.props.dispatch({
      type: 'business_l/putCheck',
      payload: {
        id: this.props.match.params.id,
        status: type,
        ...data,
      },
    });
    ;
    message.success('操作成功！');
    goBack(null, this);
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
  // 通过编号获取详情
  getLicense = () => {
    let licenseOrganizationNo = '';
    licenseOrganizationNo = this.props.form.getFieldValue('licenseOrganizationNo');
    if (licenseOrganizationNo && (licenseOrganizationNo.length === 18 || licenseOrganizationNo.length === 10)) {
      this.props.dispatch({
        type: 'business_l/getLicense',
        payload: {
          id: licenseOrganizationNo,
        },
      }).then((res) => {
        const data = res.data;
        this.props.form.setFieldsValue({
          'licenseOrganizationName': data.licenseOrganizationName,
        });
        this.setState({
          licenseOrganizationId: data.id,
        });
      });
    } else {
      this.setState({
        licenseOrganizationId: '',
      });
      this.props.form.setFieldsValue({
        'licenseOrganizationName': '',
      });
    }
  }
  // 数值改变清空相关信息
  clearInfo = (type) => {
    this.props.form.setFieldsValue({
      [type]: '',
    });
  }
  // 获取出资机构详情
  getFunding = () => {
    let fundingOrganizationNo = '';
    fundingOrganizationNo = this.props.form.getFieldValue('fundingOrganizationNo');
    if (fundingOrganizationNo && (fundingOrganizationNo.length === 18 || fundingOrganizationNo.length === 10)) {
      this.props.dispatch({
        type: 'business_l/getFunding',
        payload: {
          id: fundingOrganizationNo,
        },
      }).then((res) => {
        const data = res.data;
        this.props.form.setFieldsValue({
          'fundingOrganizationName': data.organizationName,
          'organizationType': data.organizationType,
        });
        this.setState({
          fundingOrganizationId: data.id,
        });
      });
    } else {
      this.setState({
        fundingOrganizationId: '',
      });
      this.props.form.setFieldsValue({
        'fundingOrganizationName': '',
        'organizationType': '',
      });
    }
  }
  rentTypeChange = (v) => {
    this.setState({
      repaymentDay: v === 1 ? true : false,
      showLimitDateInput: v === 1 ? true : false,
    });
  }
  // 额度期限类别改动
  onLimitTypeChange = (e) => {
    e.preventDefault();
    const vLimitType = e.target.value;
    this.setState({
      showLimitDateInput: vLimitType === 1,
    });
  };
  payTypes = (v) => {
    console.log(v);
    this.setState({ checkValues: v });
  }
  paytypeChange = (type) => {
    let ticket = this.props.form.getFieldValue('ticketPayRate');
    let cash = this.props.form.getFieldValue('casePayRate');
    console.log(ticket, cash);
    if (type === 'ticket' && (0 <= ticket) && (ticket <= 100)) {

      this.props.form.setFieldsValue({
        casePayRate: 100 - ticket,
      });
    }
    if (type === 'cash' && (0 <= cash) && (cash <= 100)) {
      this.props.form.setFieldsValue({
        ticketPayRate: 100 - cash,
      });
    }
  }
  render() {
    const formData = [
      {
        key: 'remark',
        render() {
          return <Input.TextArea maxLength={40} placeholder="审核不通过原因" />;
        },
        options: {
          rules: [{ required: true, message: '必填!' }],
        },
      },
    ];
    const { status, fileParamList, repaymentDay, showLimitDateInput, checkValues, logList } = this.state;
    let rateRule = {
      rules: [
        { required: true, ...RegExp.Rate },
      ],
    };
    const type = status;
    let isDisabled = true;
    let action = [
      <Button key="back" onClick={(e) => { goBack(e, this); }}>返回</Button>,
    ];
    let breadcrumbName = '持牌机构额度详情';

    switch (type) {
    case 1:
      if (isContain(1004001003)) {
        action.push(<Button key="edit" type="primary" onClick={this.openModal}>审核</Button>);
        breadcrumbName = '持牌机构额度审核';
      }
      break;
    case 3:
      if (isContain(1004001002)) {
        action.push(<Button key="add" type="primary" onClick={this.handleSubmit}>修改</Button>);
        breadcrumbName = '持牌机构额度修改';
        isDisabled = false;
      }
      break;
    default:
      break;
    }
    if (isContain(1004001001) && this.props.match.params.id === 'add') {
      action.push(<Button key="add" type="primary" onClick={this.handleSubmit}>新增</Button>);
      breadcrumbName = '添加持牌机构额度';
      isDisabled = false;
    }
    return (
      <DyControl permission="1004001004" key="control">
        <DyPage
          className="user-manage-detail"
          breadcrumb={[{
            name: '额度管理',
          }, {
            name: '持牌机构额度管理',
            href: '/creditManage/license',
          }, {
            name: breadcrumbName,
          }]}
          action={action}
        >
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Row gutter={gutter}>
              <Logs
                tableData={logList}
              />
              <div className="block-title">基本信息</div>
              {this.renderField('持牌机构编号', 'licenseOrganizationNo', <Input onChange={() => this.clearInfo('licenseOrganizationName')} onBlur={this.getLicense} disabled={isDisabled} />, {
                rules: [
                  { required: true, ...RegExp.SocialCode },
                ],
              })}
              {this.renderField('持牌机构名称', 'licenseOrganizationName', <Input disabled />)}
              {this.renderField('出资机构编号', 'fundingOrganizationNo', <Input onChange={() => this.clearInfo('fundingOrganizationName')} onBlur={this.getFunding} disabled={isDisabled} />, {
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
                <Radio.Group onChange={this.onLimitTypeChange} disabled={isDisabled}>
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
                <Select onChange={this.payTypes} placeholder="请选择计息方式" disabled={isDisabled}>
                  <Select.Option value={1} key={1}>{'仅现金'}</Select.Option>
                  <Select.Option value={2} key={2}>{'仅银票'}</Select.Option>
                  <Select.Option value={3} key={3}>{'混合支付'}</Select.Option>
                  <Select.Option value={4} key={4}>{'比例支付'}</Select.Option>
                </Select>, {
                  rules: [
                    { required: true, type: 'number', message: '必选' },
                  ],
                })}
              {checkValues === 4 && this.renderField('银票占比（%）', 'ticketPayRate', <Input disabled={isDisabled} onBlur={() => this.paytypeChange('ticket')} />, rateRule)}
              {checkValues === 4 && this.renderField('现金占比（%）', 'casePayRate', <Input disabled={isDisabled} onBlur={() => this.paytypeChange('cash')} />, rateRule)}
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
          <DyExamineBox visible={this.state.visible} ok={this.examine} not={this.notexamine}
            app={this} />
          <DyFormModal visible={this.state.notexaminevisible} formData={formData} title="请填写不通过的原因"
            visibleName={'notexaminevisible'} app={this} action={this.setAction} />
        </DyPage>
      </DyControl>
    );
  }
}

export default Index;
