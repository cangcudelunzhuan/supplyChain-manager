import React, { Component } from 'react';
import { Modal, Form, Input, Row, Col, message, Spin } from 'antd';
import { DyPage, DyFormModal, DyUpload, DyAuditLog, DyExamineBox } from 'dy-components';
import { connect } from 'dva';
import RegExp from 'src/utils/regExp';
import {  getFileList, setAccount, goBack } from 'src/utils/tools';
import { detailAction } from 'src/utils/actionReturn';
import '../index.less';
import TableForm from '../components/companyTable';
import { formItemLayout, formItemLayout_1, renderField, gutter } from 'src/utils/gridInit';
const confirm = Modal.confirm;

@connect(({ distributor, loading }) => ({
  distributor,
  detailLoading: loading.effects['distributor/detail'] && loading.effects['distributor/getFileList'],
}))
@Form.create()
class Index extends Component {
  state = {
    status: null,
    type: null,
    dealerFileList: [],
    visible: false,
    notexaminevisible: false,
    allowChange: false,
    companyid: null,
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.setState({
      //  status: (this.props.location.query.type === 'edit') ? false :true,
      companyid: id,
    });
    if (id) {
      this.getDetail(id);
    }
  }
  getDetail = async (id) => {
    let [res, fileres] = await Promise.all([
      this.props.dispatch({
        type: 'distributor/detail',
        payload: {
          id,
        },
      }),
      this.props.dispatch({
        type: 'distributor/getFileList',
        payload: { id },
      }),
    ]);
    this.setState({
      status: res.data.status,
    });
    let formKey = this.props.form.getFieldsValue();
    for (let key in formKey) {
      formKey[key] = res.data[key];
    }
    if (fileres.data) {
      let brandFileParams = getFileList(fileres.data);
      formKey.dealerFileList = brandFileParams;
      this.setState({
        dealerFileList: brandFileParams,
      });
    }
    this.props.form.setFieldsValue({
      ...formKey,
    });

  }
  // 提交修改
  handleSubmits = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.id = this.props.match.params.id;
        values.dealerFileList = this.state.dealerFileList;
        confirm({
          title: '确认修改此项？',
          onOk: async () => {
            e.persist();
            await this.props.dispatch({
              type: 'distributor/toEdit',
              payload: values,
            });
            message.success('修改成功！');
            goBack(e, this);
          },
        });
      }
    });
  }
  // 打开审核框
  openModal = (e) => {
    e.preventDefault();
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
  setAction = (data, e) => {
    this.toex(3, data, e);
  }
  // 审核通过
  examine = (e) => {
    this.toex(2, {}, e);
  }
  // 审核接口调用
  toex = async (type, data, e) => {
    e.persist();
    await this.props.dispatch({
      type: 'distributor/toExamine',
      payload: {
        id: this.props.match.params.id,
        status: type,
        ...data,
      },
    });
    ;
    message.success('操作成功！');
    goBack(e, this);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { detailLoading } = this.props;
    let { actionlist, edit } = detailAction({
      type: this.state.status,
      permission: '100100300',
      back: (e) => { goBack(e, this); },
      sh: (e) => { this.openModal(e); },
      ed: (e) => { this.handleSubmits(e); },
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
      <DyPage
        className="user-manage-detail"
        breadcrumb={[{
          name: '用户管理',
        }, {
          name: '经销商管理',
          href: '/user/distributor',
        }, {
          name: '经销商详情',
        }]}
        action={
          actionlist
        }
      >
        <Spin spinning={detailLoading}>
          <DyAuditLog
            id={this.props.match.params.id} type={4}
          />
          <Form {...formItemLayout} >
            <Row gutter={gutter}>
              <div className="block-title">基本信息</div>
              {renderField(getFieldDecorator, '公司名称', 'dealerName', <Input disabled />)}
              {renderField(getFieldDecorator, '统一社会信用代码', 'socialCreditCode', <Input disabled />)}
              {renderField(getFieldDecorator, '公司座机', 'dealerPhone', <Input disabled={edit} placeholder={'请以“-”号分开，最多13位'} />, {
                rules: [
                  { required: false, ...RegExp.Telephone },
                ],
              })}
              {renderField(getFieldDecorator, '公司传真', 'dealerFax', <Input disabled={edit} />, {
                rules: [
                  { required: false, ...RegExp.Telephone, message: '格式不正确' },
                ],
              })}
              {renderField(getFieldDecorator, '公司邮箱', 'dealerEmail', <Input disabled={edit} />, {
                rules: [
                  { required: false, ...RegExp.Email },
                ],
              })}
              {renderField(getFieldDecorator, '所属行业', 'trade', <Input disabled={edit} />)}
              <Col span={24}>
                <Form.Item
                  label="公司经营地址"
                  {...formItemLayout_1}
                >
                  {getFieldDecorator('dealerAddress')(<Input.TextArea rows={3} disabled={edit} />)}
                </Form.Item>
              </Col>
              <Col span={24}>
                {/* <Col span={12}>
                  <Form.Item
                    label="公司注册地址"
                  >
                    {getFieldDecorator('dealerRegisterAddress', {
                      rules: [
                        { type: 'array', required: true, message: '请选择地址！' },
                      ],
                    })(<Cascader showSearch placeholder="请选择地址" options={options}
                      disabled={this.state.status}/>)}
                  </Form.Item>
                </Col> */}
                {renderField(getFieldDecorator, '公司注册地址', 'dealerRegisterAddress', <Input placeholder="镇/街道/区" maxLength={50} disabled={edit} />)}
              </Col>
              <Col span={24} className="dynamic-table">
                <Form.Item
                  label="关联公司信息"
                  {...formItemLayout_1}
                >
                  {getFieldDecorator('companyList')(
                    <TableForm style={{ marginTop: 200 }}
                      companyid={this.props.match.params.id} disable={edit} />
                  )}
                </Form.Item>
              </Col>
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
              }
              )}
              {renderField(getFieldDecorator, '联系人手机号码', 'contactMobilePhone', <Input disabled={edit} />, {
                rules: [
                  { required: false, ...RegExp.Phone },
                ],
              })}
              {renderField(getFieldDecorator, '配偶名字', 'spouseName', <Input disabled={edit} />)}
              {renderField(getFieldDecorator, '配偶证件号', 'spouseCardNo', <Input disabled={edit} />, {
                rules: [
                  { required: false, ...RegExp.Idcard },
                ],
              })}
            </Row>
            <Row gutter={gutter}>
              <div className="block-title">账号信息</div>
              {renderField(getFieldDecorator, '银行名称', 'bankName', <Input disabled={edit} />)}
              {renderField(getFieldDecorator, '银行开户支行', 'bankBranchName', <Input disabled={edit} />)}
              {renderField(getFieldDecorator, '银行卡号', 'bankCardNo', <Input disabled={edit} onBlur={() => { setAccount('bankCardNo', this); }} />)}
              {renderField(getFieldDecorator, '客户编码', 'dealerNo', <Input disabled />)}
            </Row>
            <Row gutter={gutter}>
              <div className="block-title">附件</div>
              {renderField(getFieldDecorator, '', 'dealerFileList',
                <DyUpload app={this}
                  fileList={this.state.dealerFileList}
                  fileListName={'dealerFileList'} status={edit}
                />)}
            </Row>
          </Form>
          <DyExamineBox visible={this.state.visible} ok={this.examine} not={this.notexamine}
            app={this} />
          <DyFormModal visible={this.state.notexaminevisible} formData={formData} title="请填写不通过的原因"
            app={this} action={this.setAction} />
        </Spin>
      </DyPage>
    );
  }
}

export default Index;