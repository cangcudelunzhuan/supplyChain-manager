import React, { Component } from 'react';
import { DyPage, DyUpload } from 'dy-components';
import { Form, Input, Button, Row, message, DatePicker, Radio } from 'antd';
import { connect } from 'dva';
import RegExp from 'src/utils/regExp';
import { DyExamineBox, DyFormModal, DyLog, DyControl } from 'dy-components';
import { isContain, fileChange, getFileList, timeFormat, goBack } from 'src/utils/tools';
import '../../index.less';
import moment from 'moment';
import { formItemLayout, renderField, gutter } from 'src/utils/gridInit';
const { RangePicker } = DatePicker;

@connect()
@Form.create()
class index extends Component {
  state = {
    visible: false,
    notexaminevisible: false,
    status: '',
    fileParamList: [],
    id: '',
    showLimitDateInput: true,
    showCount: true,
    logList: [],
    planType: 1,
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    this.getBusiDetail({
      id: id,
    });
  }

  // 获取客户详情
  getBusiDetail = (payload) => {
    this.props.dispatch({
      type: 'business/getBusiDetail',
      payload,
    }).then((res) => {
      if (res.code === '000000') {
        const data = res.data;
        if (res.data.fileVoList) {
          let fileParamList = getFileList(res.data.fileVoList);
          data.fileParamList = fileParamList;
          this.setState({
            fileParamList: fileParamList,
          });
        }
        if (data.expireDate) {
          data.expireDate = moment(data.expireDate);
        }
        this.setState({
          logList: data.logList ? timeFormat(data.logList) : [],
          status: data.status,
          showLimitDateInput: data.expireDate ? true : false,
          showCount: data.dealerFinanceCreditAmount ? true : false,
        });
        this.props.form.setFieldsValue({
          ...data,
          'yearPlanTime': [moment(data.startTime), moment(data.endTime)],
          type: data.type === 1 ? '先授信后放款' : '整体授信放款',
          neverExpire: data.expireDate ? 2 : 1,
        });
      }
    });
  };
  // 审核不通过
  setAction = (data) => {
    this.toex(3, data);
  };
  // 审核通过
  examine = () => {
    // 1.待审核 2.审核成功(待确认) 3.审核不通过(待修改) 4.待申请 5.确认通过
    if (this.state.status === 1) {
      this.toex(2);
    } else {
      this.toex(5);
    }
  };
  // 审核或确认接口调用
  toex = async (type, data) => {
    // let remark = data||{};
    let url = '';
    if (this.state.status === 1) {
      url = 'business/putAudit';
    } else {
      url = 'business/putConfirm';
    }
    let res = await this.props.dispatch({
      type: url,
      payload: {
        id: this.props.match.params.id,
        status: type,
        ...data,
      },
    });
    ;
    message.success(res.message);
    goBack(null, this);
  };
  // 关闭对话框
  hideModal = () => {
    this.setState({
      visible: false,
    });
  };
  // 审核不通过modal打开
  notexamine = () => {
    this.setState({
      notexaminevisible: true,
    });
  };
  // 申请和修改
  handleSubmit = (e, type) => {
    e.preventDefault();
    let dealType = type;
    switch (dealType) {
    case 'apply':
      dealType = 'business/putApply';
      break;
    case 'update':
      dealType = 'business/putUpdate';
      break;
    default:
      break;
    }
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let id = this.props.match.params.id;
        let financeCreditAmount = values.financeCreditAmount;
        let neverExpire = values.neverExpire;
        let expireDate = moment(values.expireDate).format('YYYY-MM-DD');;
        let type = values.type === '先授信后放款' ? 1 : 2;
        let fileParamList = this.state.fileParamList;
        let allValue = {
          id,
          financeCreditAmount,
          neverExpire,
          type,
          expireDate,
          fileParamList,
        };
        if (neverExpire === 1) {
          delete allValue.expireDate;
        }
        this.props.dispatch({
          type: dealType,
          payload: allValue,
        }).then((res) => {
          goBack(e, this);
        });
      }
    });
  };
  // 提交审核请求
  checkDetail = () => {
    this.setState({ visible: true });
  };

  onLimitTypeChange = (e) => {
    e.preventDefault();
    const vLimitType = e.target.value;
    this.setState({
      showLimitDateInput: vLimitType === 2,
    });
  };

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
    const { status, logList, showLimitDateInput, showCount, planType } = this.state;
    let isDisabled = true;
    let breadName = '经销商额度详情';
    let action = [<Button key="back" onClick={(e) => goBack(e, this)}>返回</Button>];
    switch (status) {
    case 4:
      if (isContain(1004002001001)) {
        breadName = '经销商额度申请';
        isDisabled = false;
        action.push(
          <Button key="sure" type="primary" onClick={(e) => this.handleSubmit(e, 'apply')}>申请</Button>,
        );
      }
      break;
    case 1:
      if (isContain(1004002001002)) {
        breadName = '经销商额度审核';
        action.push(
          <Button key="audit" type="primary" onClick={this.checkDetail}>审核</Button>,
        );
      }
      break;
    case 2:
      if (isContain(1004002001003)) {
        breadName = '经销商额度确认';
        action.push(
          <Button key="audit" type="primary" onClick={this.checkDetail}>确认</Button>,
        );
      }
      break;
    case 3:
      if (isContain(1004002001004)) {
        breadName = '经销商额度修改';
        isDisabled = false;
        action.push(
          <Button key="edit" type="primary" onClick={(e) => this.handleSubmit(e, 'update')}>修改</Button>,
        );
      }
      break;
    default:
      break;
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <DyControl permission="1004002001005" key="control">
        <DyPage className="user-manage-detail"
          breadcrumb={[{
            name: '额度管理',
          }, {
            name: '经销商额度管理',
          }, {
            name: '经销商额度审批',
            href: '/creditManage/dealerManage/business',
          }, {
            name: breadName,
          }]}
          action={action}
        >
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Row gutter={gutter}>
              <DyLog
                dataSource={logList}
              />
              <div className="block-title">年度计划信息</div>
              {renderField(getFieldDecorator, '年度计划编号', 'yearPlanNo', <Input disabled />)}
              {renderField(getFieldDecorator, '年度计划名称', 'yearPlanName', <Input disabled />)}
              {renderField(getFieldDecorator, '年度计划金额（元）', 'amount', <Input disabled />)}
              {renderField(getFieldDecorator, '计划起止时间', 'yearPlanTime', <RangePicker disabled />)}
              {renderField(getFieldDecorator, '计划类别', 'planType14', <Input disabled />)}
              {renderField(getFieldDecorator, '经销商编号', 'dealerNo', <Input disabled />)}
              {renderField(getFieldDecorator, '经销商名称', 'dealerName', <Input disabled />)}
              {showCount && renderField(getFieldDecorator, '融资额度（元）', 'dealerFinanceCreditAmount', <Input disabled />)}
              {showCount && renderField(getFieldDecorator, '融资可用额度（元）', 'dealerAvailableAmount', <Input disabled />)}
            </Row>
            <Row gutter={gutter}>
              <div className="block-title">年度计划额度信息</div>
              {status !== 4 && renderField(getFieldDecorator, '年度计划额度编号', 'financeCreditNo', <Input disabled />)}
              {renderField(getFieldDecorator, '年度计划额度（元）', 'financeCreditAmount', <Input disabled={isDisabled} />, {
                rules: [
                  { required: !isDisabled, ...RegExp.Money },
                ],
              })}
              {renderField(getFieldDecorator, '出资方式', 'type', <Input disabled />)}
              {renderField(getFieldDecorator, '额度期效类别', 'neverExpire',
                <Radio.Group onChange={this.onLimitTypeChange} disabled={isDisabled}>
                  <Radio value={2}>额度有期限</Radio>
                  <Radio value={1}>额度无期限</Radio>
                </Radio.Group>, {
                  rules: [
                    { required: true },
                  ],
                })}
              {planType === 1 && (renderField(getFieldDecorator, '额度生效日', 'endDate14',
                <DatePicker format="YYYY-MM-DD" disabledDate={(e) => {
                  return e && e < moment().endOf('day');
                }}
                disabled={isDisabled} />, {
                  rules: [
                    { required: true, message: '必选项' },
                  ],
                }))}
              {showLimitDateInput && (renderField(getFieldDecorator, '年度计划额度到期日', 'expireDate',
                <DatePicker format="YYYY-MM-DD" disabledDate={(e) => {
                  return e && e < moment().endOf('day');
                }}
                disabled={isDisabled} />, {
                  rules: [
                    { required: true, message: '必选项' },
                  ],
                }))}
            </Row>
            <Row gutter={gutter}>
              <div className="block-title">附件</div>
              {renderField(getFieldDecorator, '', 'fileParamList',
                <DyUpload app={this} onChanges={(fileName, fileList) => {
                  fileChange(fileName, fileList, this);
                }}
                fileList={this.state.fileParamList}
                action={'global/toUpload'}
                fileListName={'fileParamList'} status={isDisabled}
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

export default index;
