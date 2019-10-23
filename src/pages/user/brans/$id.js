import React, { Component } from 'react';
import { Modal, Form, Input, Row, Col, message, Spin } from 'antd';
import { DyPage, DyFormModal, DyUpload, DyAuditLog, DyExamineBox } from 'dy-components';
import { connect } from 'dva';
import RegExp from 'src/utils/regExp';
import '../index.less';
import { setAccount, goBack } from 'src/utils/tools';
import { detailAction } from 'src/utils/actionReturn';
import { formItemLayout, formItemLayout_1, renderField, gutter } from 'src/utils/gridInit';
const confirm = Modal.confirm;

@connect(({ brans, loading }) => ({
  brans,
  detailLoading: loading.effects['brans/getdetail'] && loading.effects['brans/getFileList'],
}))
@Form.create()
class Index extends Component {
  state = {
    status: null,
    type: null,
    fileVoList: [],
    visible: false,
    notexaminevisible: false,
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    if (id) {
      this.getDetail(id);
    }
  }
  getDetail = async (id) => {
    let res = await this.props.dispatch({
      type: 'brans/getdetail',
      payload: { id },
    });
    this.setState({
      status: res.data.status,
    });
    let formKey = this.props.form.getFieldsValue();
    for (let key in formKey) {
      formKey[key] = res.data[key];
    }
    this.setState({
      fileVoList: formKey.fileVoList,
    });
    this.props.form.setFieldsValue({
      ...formKey,
    });
  }
  // 提交修改
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.id = this.props.match.params.id;
        values.fileParamList = this.state.fileVoList;
        confirm({
          title: '确认修改此项？',
          onOk: async () => {
            e.persist();
            await this.props.dispatch({
              type: 'brans/toEdit',
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
      type: 'brans/toExamine',
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
      permission: '100100200',
      back: (e) => { goBack(e, this); },
      sh: (e) => { this.openModal(e); },
      ed: (e) => { this.handleSubmit(e); },
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
          name: '品牌商管理',
          href: '/user/brans',
        }, {
          name: '品牌商详情',
        }]}
        action={
          actionlist
        }
      >
        <Spin spinning={detailLoading}>
          <DyAuditLog
            id={this.props.match.params.id} type={3}
          />
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Row gutter={gutter}>
              <div className="block-title">基本信息</div>
              {renderField(getFieldDecorator, '公司名称', 'brandName', <Input disabled />, {
                rules: [
                  { required: true, message: '请输入公司名称' },
                ],
              })}
              {renderField(getFieldDecorator, '统一社会信用代码', 'socialCreditCode', <Input disabled />)}
              {renderField(getFieldDecorator, '公司座机', 'brandPhone', <Input disabled={edit} placeholder={'请以“-”号分开，最多13位'} />, {
                rules: [
                  { required: false, ...RegExp.Telephone },
                ],
              })}
              {renderField(getFieldDecorator, '公司传真', 'brandFax', <Input disabled={edit} />, {
                rules: [
                  { required: false, ...RegExp.Telephone, message: '格式不正确' },
                ],
              })}
              {renderField(getFieldDecorator, '公司邮箱', 'brandEmail', <Input disabled={edit} />, {
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
                  {getFieldDecorator('brandAddress')(<Input.TextArea rows={3} disabled={edit} />)}
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
              })}
              {renderField(getFieldDecorator, '联系人手机号码', 'contactMobilePhone', <Input disabled={edit} />, {
                rules: [
                  { required: false, ...RegExp.Phone },
                ],
              })}
            </Row>
            <Row gutter={gutter}>
              <div className="block-title">账号信息</div>
              {renderField(getFieldDecorator, '银行名称', 'bankName', <Input disabled={edit} />)}
              {renderField(getFieldDecorator, '银行开户支行', 'bankBranchName', <Input disabled={edit} />)}
              {renderField(getFieldDecorator, '银行卡号', 'bankCardNo', <Input disabled={edit} onBlur={() => { setAccount('bankCardNo', this); }} />)}
              {renderField(getFieldDecorator, '客户编号', 'brandNo', <Input disabled />)}
              {/* {renderField(getFieldDecorator,'登录密码', null, '自动生成***')} */}
            </Row>
            <Row gutter={gutter}>
              <div className="block-title">附件</div>
              {renderField(getFieldDecorator, '', 'fileVoList',
                <DyUpload app={this}
                  fileList={this.state.fileVoList}
                  action={'global/toUpload'}
                  fileListName={'fileVoList'} status={edit}
                />)}
            </Row>
          </Form>
          <DyExamineBox visible={this.state.visible} ok={this.examine} not={this.notexamine}
            app={this} />
          <DyFormModal visible={this.state.notexaminevisible} formData={formData} title="请填写不通过的原因"
            visibleName={'notexaminevisible'} app={this} action={this.setAction} />
        </Spin>
      </DyPage>
    );
  }
}

export default Index;