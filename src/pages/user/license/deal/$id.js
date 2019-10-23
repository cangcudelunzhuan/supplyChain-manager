import React, { Component } from 'react';
import { Modal, Form, Input, Row, Col, message, Cascader } from 'antd';
import { DyPage, DyFormModal, DyUpload, DyAuditLog, DyExamineBox, DyControl } from 'dy-components';
import { connect } from 'dva';
import RegExp from 'src/utils/regExp';
import options from 'src/utils/regionData';
import { getFileList, setAccount, goBack } from 'src/utils/tools';
import { detailAction } from 'src/utils/actionReturn';
import { formItemLayout, formItemLayout_1, gutter } from 'src/utils/gridInit';
import '../../index.less';
const confirm = Modal.confirm;

@connect(({ license }) => ({
  license,
}))
@Form.create()
class Index extends Component {
  state = {
    status: null,
    fileParamList: [],
    visible: false,
    notexaminevisible: false,
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    this.getDetail(id);
  }
  // 获取详情信息
  getDetail = async (id) => {
    let res = await this.props.dispatch({
      type: 'license/getDetail',
      payload: { id },
    });
    let formKey = this.props.form.getFieldsValue();
    let areaCode = [res.data.provinceCode, res.data.cityCode, res.data.regionCode];
    this.setState({
      status: res.data.status,
    });
    for (let key in formKey) {
      formKey[key] = res.data[key];
    }
    if (res.data.fileVoList) {
      let fileParamList = getFileList(res.data.fileVoList);
      formKey.fileParamList = fileParamList;
      this.setState({
        fileParamList: fileParamList,
      });
    }
    this.props.form.setFieldsValue({
      ...formKey, 'areaCode': areaCode,
    });
  }
  // 提交修改
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let id = this.props.match.params.id;
        let provinceCode = values.areaCode[0];
        let cityCode = values.areaCode[1];
        let regionCode = values.areaCode[2];
        let fileParamList = this.state.fileParamList;
        delete values.areaCode;
        let allValue = {
          ...values,
          provinceCode,
          regionCode,
          cityCode,
          fileParamList,
          id,
        };
        confirm({
          title: '确认修改此项？',
          onOk: async () => {
            e.persist();
            await this.props.dispatch({
              type: 'license/postUpdate',
              payload: allValue,
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
    let res = await this.props.dispatch({
      type: 'license/postCheck',
      payload: {
        id: this.props.match.params.id,
        status: type,
        ...data,
      },
    });
    ;
    message.success(res.message);
    goBack(e, this);
  }
  renderField = (label, key, component, options = {
    rules: [
      { required: true, whitespace: true, message: '不能为空' },
    ],
  }) => {
    const { getFieldDecorator } = this.props.form;

    return (
      <Col span={12}>
        <Form.Item
          label={label}
        >
          {key ? getFieldDecorator(key, options)(component) : component}
        </Form.Item>
      </Col>
    );
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    let id = this.props.match.params.id;
    let { actionlist, breadcrumbName, edit } = detailAction({
      type: this.state.status,
      permission: '100100100',
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
      <DyControl permission="1001001003" key="control">
        <DyPage
          className="user-manage-detail"
          breadcrumb={[{
            name: '用户管理',
          }, {
            name: '持牌机构管理',
            href: '/user/license',
          }, {
            name: `持牌机构${breadcrumbName}`,
          }]}
          action={actionlist}
        >
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Row gutter={gutter}>
              <DyAuditLog
                id={id}
              />
              <div className="block-title">基本信息</div>
              {this.renderField('持牌机构名称', 'licenseOrganizationName', <Input disabled={edit} />)}
              {this.renderField('持牌机构编码', 'licenseOrganizationNo', <Input disabled />, {
                rules: [
                  { required: false },
                ],
              })}
              {this.renderField('统一社会信用代码', 'socialCreditCode', <Input disabled={edit} />)}
              {this.renderField('公司座机', 'licenseOrganizationPhone', <Input disabled={edit} placeholder={'请以“-”号分开，最多13位'} />, {
                rules: [
                  { required: false, ...RegExp.Telephone },
                ],
              })}
              {this.renderField('公司邮箱', 'licenseOrganizationEmail', <Input disabled={edit} />, {
                rules: [
                  { required: true, ...RegExp.Email },
                ],
              })}
              <Col span={24}>
                <Form.Item
                  label="公司经营地址"
                  {...formItemLayout_1}
                >
                  {getFieldDecorator('licenseOrganizationAddress', { rules: [{ required: true, whitespace: true, message: '不能为空' }] })(<Input.TextArea rows={3} maxLength={200} disabled={edit} />)}
                </Form.Item>
              </Col>
              <Col span={24}>
                <Col span={12}>
                  <Form.Item
                    label="所属区域"
                  >
                    {getFieldDecorator('areaCode', {
                      rules: [
                        { type: 'array', required: true, message: '请选择地址！' },
                      ],
                    })(<Cascader showSearch placeholder="请选择地址" options={options}
                      disabled={edit} />)}
                  </Form.Item>
                </Col>

                {this.renderField('', 'detailAddress', <Input placeholder="镇/街道/区" maxLength={50} disabled={edit} />)}
              </Col>
            </Row>

            <Row gutter={gutter}>
              <div className="block-title">人员信息</div>
              {this.renderField('法人姓名', 'legalPerson', <Input maxLength={13} disabled={edit} />)}
              {this.renderField('法人身份证号', 'legalCardNo', <Input disabled={edit} />, {
                rules: [
                  { required: true, ...RegExp.Idcard },
                ],
              })}
              {this.renderField('联系人职务', 'contactPosition', <Input maxLength={13} disabled={edit} />)}
              {this.renderField('联系人姓名', 'contactName', <Input disabled={edit} />)}
              {this.renderField('联系人身份证号', 'contactCardNo', <Input disabled={edit} />, {
                rules: [
                  { required: true, ...RegExp.Idcard },
                ],
              })}
              {this.renderField('联系人座机', 'contactPhone', <Input disabled={edit} placeholder={'请以“-”号分开，最多13位'} />, {
                rules: [
                  { required: false, ...RegExp.Telephone },
                ],
              })}
              {this.renderField('联系人手机号码', 'contactMobilePhone', <Input disabled={edit} />, {
                rules: [
                  { required: true, ...RegExp.Phone },
                ],
              })}
            </Row>
            <Row gutter={gutter}>
              <div className="block-title">账号信息</div>
              {this.renderField('银行名称', 'bankName', <Input maxLength={15} disabled={edit} />)}
              {this.renderField('银行开户支行', 'bankBranchName', <Input maxLength={50} disabled={edit} />)}
              {this.renderField('银行卡号', 'bankCardNo', <Input maxLength={25} disabled={edit} onBlur={() => { setAccount('bankCardNo', this); }} />)}
            </Row>
            <Row gutter={gutter}>
              <div className="block-title">附件</div>
              {this.renderField('', 'fileParamList',
                <DyUpload app={this}
                  fileList={this.state.fileParamList}
                  action={'global/toUpload'}
                  fileListName={'fileParamList'} status={edit}
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