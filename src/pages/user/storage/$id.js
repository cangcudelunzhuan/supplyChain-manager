import React, { Component, Fragment } from 'react';
import { DyPage, DyUpload, DyAuditLog, DyExamineBox, DyFormModal } from 'dy-components';
import { Form, Input, Col, Row, Select, Modal, message, Spin  } from 'antd';
import { connect } from 'dva';
import RegExp from 'src/utils/regExp';
import '../../user/index.less';
import { detailAction } from 'src/utils/actionReturn';
import {  storageType } from 'src/utils/statusData';
import { fileChange, setAccount, goBack } from 'src/utils/tools';
import { formItemLayout, formItemLayout_1, renderField, gutter } from 'src/utils/gridInit';
const confirm = Modal.confirm;
@connect(({ storage, loading }) => ({
  storage,
  detailLoading: loading.effects['storage/getDetail'],
}))
@Form.create()
class index extends Component {
  state = {
    status: null,
    type: null,
    visible: false,
    fileParamList: [],
    personFileList: [],
    accountFileList: [],
    // creditAmountFileList: [],
    // escrowAccountFileList: [],
    // repurchaseAccountFileList: [],
    watweFile: null,
    bankShow: true,
    showLimitDateInput: 1,
    showPaydayInput: 1,
  };
  componentDidMount() {
    let id = this.props.match.params.id;
    let status = id === 'add' ? null : true;
    this.setState({
      status: status,
    });
    if (status) {
      this.getDetail(id);
    } else {
      this.props.form.setFieldsValue({
        fundingType: 1,
        interestType: 1,
        isLimited: 1,
      });
    }
  }

  getDetail = async (id) => {
    let [res] = await Promise.all([
      this.props.dispatch({
        type: 'storage/getDetail',
        payload: { id },
      }),
    ]);
    this.setState({
      status: res.data.status,
    });
    let formKey = this.props.form.getFieldsValue();
    for (let key in formKey) {
      if (res.data[key]) {
        formKey[key] = res.data[key];
      }
    }
    this.orgChange(formKey.organizationType);
    this.onLimitTypeChange(formKey.isLimited);
    this.changeInterest(formKey.interestType);
    this.setState({
      fileParamList: formKey.fileParamList,
      // escrowAccountFileList: formKey.escrowAccountFileList,
      // creditAmountFileList: formKey.creditAmountFileList,
      accountFileList: formKey.accountFileList,
      personFileList: formKey.personFileList,
      // repurchaseAccountFileList: formKey.repurchaseAccountFileList,
    });
    this.props.form.setFieldsValue({
      ...formKey,
      // 'expireDate': moment(res.data.expireDate),
    });
  };
  // 提交审核
  handleSubmit = (e, type) => {
    console.log('start submit ...');
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let title;
        if (type === 'add') {
          title = '新增';
        } else {
          title = '提交';
          values.id = this.props.match.params.id;
        }
        confirm({
          title: `确认${title}此项？`,
          onOk: () => {
            // values.fileParamList = this.state.fileParamList;
            // values.personFileList = this.state.personFileList;
            // values.accountFileList = this.state.accountFileList;
            // values.escrowAccountFileList = this.state.escrowAccountFileList;
            // values.expireDate = this.state.showLimitDateInput === 1 ? moment(values.expireDate).format('YYYY-MM-DD') : null;
            // values.creditAmountFileList = this.state.creditAmountFileList;
            // values.repurchaseAccountFileList = this.state.repurchaseAccountFileList;
            this.examineAction(values, type, e);
          },
        });
      }
    });
  };
  examineAction = async (values, type, e) => {
    e.persist();
    let res = type === 'add' ? (
      await this.props.dispatch({
        type: 'storage/toAdd',
        payload: values,
      })
    ) : (
      await this.props.dispatch({
        type: 'storage/toEdit',
        payload: values,
      })
    );
    message.success(res.message);
    goBack(e, this);
  };
  // 打开审核框
  openModal = (e) => {
    e.preventDefault();
    this.setState({
      visible: true,
    });
  };
  // 审核不通过modal打开
  notexamine = () => {
    this.setState({
      notexaminevisible: true,
    });
  };
  // 审核不通过
  setAction = (data, e) => {
    this.toex(3, data, e);
  };
  // 审核通过
  examine = (e) => {
    this.toex(2, {}, e);
  };
  // 审核接口调用
  toex = async (type, data, e) => {
    e.persist();
    let res = await this.props.dispatch({
      type: 'storage/toExamine',
      payload: {
        id: this.props.match.params.id,
        status: type,
        ...data,
      },
    });
    ;
    message.success(res.message);
    goBack(e, this);
  };
  orgChange = (v) => {
    if (v === 1) {
      this.setState({
        bankShow: false,
      });
    } else {
      this.setState({
        bankShow: true,
      });
    }
  };
  changeInterest = (v) => {
    this.setState({ showPaydayInput: v });
  };
  onLimitTypeChange = (value) => {
    this.setState({
      showLimitDateInput: value,
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { detailLoading } = this.props;
    let { actionlist, breadcrumbName, edit } = detailAction({
      type: this.state.status,
      permission: '100100400',
      props: 'storage',
      add: (e) => {
        this.handleSubmit(e, 'add');
      },
      back: (e) => {
        goBack(e, this);
      },
      sh: (e) => {
        this.openModal(e);
      },
      ed: (e) => {
        this.handleSubmit(e, 'edit');
      },
    });
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

    return (
      <DyPage className="user-manage-detail"
        breadcrumb={[{
          name: '用户管理',
        }, {
          name: '仓储公司管理',
          href: '/user/storage',
        }, {
          name: `仓储公司${breadcrumbName}`,
        }]}
        action={
          actionlist
        }
      >
        <Spin spinning={this.state.status ? detailLoading : false}>
          <DyAuditLog
            id={this.props.match.params.id} type={5}
          />
          <Form {...formItemLayout} >
            <Row gutter={gutter}>
              <div className="block-title">基本信息</div>
              {renderField(getFieldDecorator, '公司名称', 'organizationName', <Input disabled={edit} />,
                {
                  rules: [
                    { required: true, message: '请输入公司名称' },
                  ],
                },
              )}
              {renderField(getFieldDecorator, '统一社会信用代码', 'socialCreditCode', <Input
                disabled={edit} />,
              {
                rules: [
                  { required: true, ...RegExp.SocialCode },
                ],
              },
              )}
              {renderField(getFieldDecorator, '仓储类型', 'organizationType',
                <Select placeholder="仓储类型 " disabled={edit} onChange={this.orgChange}>
                  {storageType.map((item) => {
                    return (<Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>);
                  })}
                </Select>, {
                  rules: [{ required: true, message: '请选择仓储类型!' }],
                },
              )}
              {renderField(getFieldDecorator, '公司座机', 'organizationPhone', <Input disabled={edit} placeholder={'请以“-”号分开，最多13位'} />, {
                rules: [
                  { required: false, ...RegExp.Telephone },
                ],
              })}
              {renderField(getFieldDecorator, '公司传真', 'organizationFax', <Input disabled={edit} />, {
                rules: [
                  { required: false, ...RegExp.Telephone, message: '格式不正确' },
                ],
              })}
              {renderField(getFieldDecorator, '公司邮箱', 'organizationEmail', <Input disabled={edit} />, {
                rules: [
                  { required: true, ...RegExp.Email },
                ],
              })}
              {renderField(getFieldDecorator, '所属行业', 'trade', <Input disabled={edit} />)}
              <Col span={24}>
                <Form.Item label="公司经营地址" {...formItemLayout_1}>
                  {getFieldDecorator('companyAddress')(<Input.TextArea rows={2} disabled={edit} />)}
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="公司注册地址" {...formItemLayout_1}>
                  {getFieldDecorator('companyAddress')(<Input.TextArea rows={2} disabled={edit} />)}
                </Form.Item>
              </Col>
              {renderField(getFieldDecorator, '附件', 'fileParamList',
                <DyUpload app={this} onChanges={(fileName, fileList) => {
                  fileChange(fileName, fileList, this);
                }}
                fileList={this.state.fileParamList}
                fileListName={'fileParamList'} status={edit}
                />)}
            </Row>
            <Row gutter={gutter}>
              <div className="block-title">人员信息</div>
              {renderField(getFieldDecorator, '法人姓名', 'legalPerson', <Input disabled={edit} />)}
              {renderField(getFieldDecorator, '法人身份证号', 'legalCardNo', <Input disabled={edit} />, {
                rules: [
                  { required: false, ...RegExp.Idcard },
                ],
              })}
              {renderField(getFieldDecorator, '联系人职务', 'contactPosition', <Input disabled={edit} />)}
              {renderField(getFieldDecorator, '联系人姓名', 'contactName', <Input disabled={edit} />)}
              {renderField(getFieldDecorator, '联系人身份证号', 'contactCardNo', <Input disabled={edit} />, {
                rules: [
                  { required: false, ...RegExp.Idcard },
                ],
              })}
              {renderField(getFieldDecorator, '联系人座机', 'contactPhone', <Input disabled={edit} placeholder={'请以“-”号分开，最多13位'} />, {
                rules: [
                  { required: false, ...RegExp.Telephone },
                ],
              })}
              {renderField(getFieldDecorator, '联系人手机号码', 'contactMobilePhone', <Input disabled={edit} />, {
                rules: [
                  { required: false, ...RegExp.Phone },
                ],
              })}
              {renderField(getFieldDecorator, '附件', 'personFileList',
                <DyUpload app={this} onChanges={(fileName, fileList) => {
                  fileChange(fileName, fileList, this);
                }}
                fileList={this.state.personFileList}
                fileListName={'personFileList'} status={edit}
                />)}
            </Row>
            <Row gutter={gutter}>
              <div className="block-title">账号信息</div>
              {(this.props.match.params.id !== 'add') ? (
                renderField(getFieldDecorator, '客户编号', 'organizationNo', <Input disabled />)
              ) : ''}
              {renderField(getFieldDecorator, '银行名称', 'bankName', <Input disabled={edit} maxLength={15}/>, {
                rules: [
                  { required: true, message: '必填' },
                ],
              })}
              {renderField(getFieldDecorator, '银行开户行', 'bankBranchName', <Input disabled={edit} maxLength={50}/>, {
                rules: [
                  { required: true, message: '必填' },
                ],
              })}
              {this.state.bankShow && (
                <Fragment>
                  {renderField(getFieldDecorator, '银行卡号', 'bankCardNo', <Input disabled={edit}  onBlur={() => {
                    setAccount('bankCardNo', this);
                  }} />, {
                    rules: [
                      { required: true, message: '必填' },
                    ],
                  })}
                </Fragment>
              )}
              {renderField(getFieldDecorator, '附件', 'accountFileList',
                <DyUpload app={this} onChanges={(fileName, fileList) => {
                  fileChange(fileName, fileList, this);
                }}
                fileList={this.state.accountFileList}
                fileListName={'accountFileList'} status={edit}
                />)}
            </Row>
          </Form>
        </Spin>
        <DyExamineBox visible={this.state.visible} ok={this.examine} not={this.notexamine}
          app={this} />
        <DyFormModal visible={this.state.notexaminevisible} formData={formData} title="请填写不通过的原因"
          visibleName={'notexaminevisible'} app={this} action={this.setAction} />
      </DyPage>
    );
  }
}

export default index;
