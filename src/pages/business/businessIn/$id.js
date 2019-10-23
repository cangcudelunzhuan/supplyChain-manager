import React, { Component } from 'react';
import { Form, Input, Row, Col, Button, message, DatePicker } from 'antd';
import { DyPage, DyFormModal, DyUpload, DyExamineBox, DyControl } from 'dy-components';
import { connect } from 'dva';
import RegExp from 'src/utils/regExp';
import moment from 'moment';
import { isContain, getFileList, goBack } from 'src/utils/tools';
import { formItemLayout, gutter } from 'src/utils/gridInit';
import '../index.less';
const { RangePicker } = DatePicker;
@connect(({ businesIn, loading }) => ({
  businesIn,
  detailLoading: loading.effects['businesIn/getdetail'] && loading.effects['businesIn/getFileList'],
}))
@Form.create()
class Index extends Component {
  state = {
    status: null,
    fileParamList: [],
    licenseId: '',
    dealerId: '',
    brandId: '',
    isYwshow: true,
    visible: false,
    notexaminevisible: false,
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    let isYwshow = id === 'add' ? false : true;
    this.setState({
      isYwshow,
    });
    if (isYwshow) {
      this.getDetail(id);
    }
  }
  getDetail = async (id) => {
    let res = await this.props.dispatch({
      type: 'businesIn/getDetail',
      payload: { id },
    });
    let formKey = this.props.form.getFieldsValue();
    for (let key in formKey) {
      formKey[key] = res.data[key];
    }
    this.setState({
      status: res.data.status,
      licenseOrganizationNo: res.data.licenseOrganizationNo,
      dealerId: res.data.dealerId,
      brandId: res.data.brandId,
      isYwshow: res.data.status === 1 ? false : true,
    });
    if (res.data.fileVoList) {
      let fileParamList = getFileList(res.data.fileVoList);
      formKey.fileParamList = fileParamList;
      this.setState({
        fileParamList: fileParamList,
      });
    }
    this.props.form.setFieldsValue({
      ...formKey, 'dateTime': [moment(res.data.startTime), moment(res.data.endTime)],
    });
  }
  // 提交修改
  handleSubmit = (e) => {
    e.preventDefault();
    const { dealerId, brandId } = this.state;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let fileParamList = this.state.fileParamList;
        let startTime = moment(values.dateTime[0]).format('YYYY-MM-DD');
        let endTime = moment(values.dateTime[1]).format('YYYY-MM-DD');
        delete values.socialCreditCode;
        delete values.brandSocialCreditCode;
        delete values.dateTime;
        delete values.brandName;
        delete values.dealerName;
        let allValue = {
          ...values,
          startTime,
          endTime,
          fileParamList,
          dealerId,
          brandId,
        };
        let id = this.props.match.params.id;
        if (id !== 'add') {
          allValue.id = id;
        }
        this.props.dispatch({
          type: id === 'add' ? 'businesIn/postAdd' : 'businesIn/putUpdate',
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
      type: 'businesIn/putCheck',
      payload: {
        id: this.props.match.params.id,
        status: type,
        ...data,
      },
    });
    ;
    message.success(res.message);
    goBack(window.event, this);
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
  getSocId = () => {
    let socialCreditCode = '';
    socialCreditCode = this.props.form.getFieldValue('socialCreditCode');
    if (socialCreditCode && (socialCreditCode.length === 18 || socialCreditCode.length === 10)) {
      this.props.dispatch({
        type: 'businesIn/getSocId',
        payload: {
          id: socialCreditCode,
        },
      }).then((res) => {
        const data = res.data;
        this.props.form.setFieldsValue({
          'dealerName': data.dealerName,
        });
        this.setState({
          dealerId: data.dealerId,
        });
      });
    } else {
      this.setState({
        dealerId: '',
      });
      this.props.form.setFieldsValue({
        'dealerName': '',
      });
    }
  }
  // 数值改变清空相关信息
  clearInfo = (type) => {
    this.props.form.setFieldsValue({
      [type]: '',
    });
  }
  // 获取品牌商id
  getBrandId = () => {
    let brandSocialCreditCode = '';
    brandSocialCreditCode = this.props.form.getFieldValue('brandSocialCreditCode');
    if (brandSocialCreditCode && (brandSocialCreditCode.length === 18 || brandSocialCreditCode.length === 10)) {
      this.props.dispatch({
        type: 'businesIn/getBrandId',
        payload: {
          id: brandSocialCreditCode,
        },
      }).then((res) => {
        const data = res.data;
        this.props.form.setFieldsValue({
          'brandName': data.brandName,
        });
        this.setState({
          brandId: data.id,
        });
      });
    } else {
      this.setState({
        brandId: '',
      });
      this.props.form.setFieldsValue({
        'brandName': '',
      });
    }
  }

  render() {
    // 审核状态：1.待审核 2.待指派(审核成功)  3.审核失败 4.已指派
    const { status, fileParamList, isYwshow } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formData = [
      {
        key: 'remark',
        render() {
          return <Input.TextArea maxLength={40} placeholder="审核不通过原因" />;
        },
      },
    ];
    const type = status;
    let isDisabled = true;
    let action = [
      <Button key="back" onClick={(e)=>goBack(e, this)}>返回</Button>,
    ];
    let breadcrumbName = '年度计划详情';
    if (isContain(1002001001) && this.props.match.params.id === 'add') {
      action.push(<Button key="add" type="primary" onClick={this.handleSubmit}>新增</Button>);
      breadcrumbName = '年度计划新增';
      isDisabled = false;
    }
    switch (type) {
    case 1:
      if (isContain(1002001004)) {
        action.push(<Button key="edit" type="primary" onClick={this.openModal}>审核</Button>);
        breadcrumbName = '年度计划审核';
      }
      if (isContain(1002001002)) {
        action.push(<Button key="add" type="primary" onClick={this.handleSubmit}>修改</Button>);
        breadcrumbName = '年度计划修改';
        isDisabled = false;
      }
      if (isContain(1002001002) && isContain(1002001004)) {
        breadcrumbName = '年度计划详情';
      }
      break;
    case 2:
      breadcrumbName = '年度计划详情';
      break;
    case 3:
      breadcrumbName = '年度计划详情';
      break;
    default:
      break;
    }
    return (
      <DyControl permission="1002001003" key="control">
        <DyPage
          className="user-manage-detail"
          breadcrumb={[{
            name: '业务管理',
          }, {
            name: '年度计划录入',
            href: '/business/businessIn',
          }, {
            name: breadcrumbName,
          }]}
          action={action}
        >
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Row gutter={gutter}>
              <div className="block-title">基本信息</div>
              {isYwshow ? this.renderField('年度计划编号', 'yearPlanNo', <Input disabled />) : ''}
              {this.renderField('年度计划名称', 'yearPlanName', <Input disabled={isDisabled} />)}
              <Col span={12}>
                <Form.Item label="计划起止时间">
                  {getFieldDecorator('dateTime', {
                    rules: [{ type: 'array', required: true, message: '请选择时间' }],
                  })(
                    <RangePicker disabled={isDisabled} />,
                  )}
                </Form.Item>
              </Col>
              {this.renderField('年度计划金额（元）', 'amount', <Input disabled={isDisabled} />, {
                rules: [
                  { required: true, ...RegExp.Money },
                ],
              })}
              {this.renderField('经销商统一社会信用代码', 'socialCreditCode', <Input onChange={() => this.clearInfo('dealerName')} onBlur={this.getSocId} disabled={isDisabled} />, {
                rules: [
                  { required: true, ...RegExp.SocialCode },
                ],
              })}
              {this.renderField('经销商名称', 'dealerName', <Input disabled />)}
              {this.renderField('品牌商统一社会信用代码', 'brandSocialCreditCode', <Input onChange={() => this.clearInfo('brandName')} onBlur={this.getBrandId} disabled={isDisabled} />, {
                rules: [
                  { required: true, ...RegExp.SocialCode },
                ],
              })}
              {this.renderField('品牌商名称', 'brandName', <Input disabled />)}
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