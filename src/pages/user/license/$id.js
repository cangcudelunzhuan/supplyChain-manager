import React, { Component } from 'react';
import { Form, Input, Row, Col, Button, message, Cascader } from 'antd';
import { DyPage, DyUpload, DyAuditLog, DyControl } from 'dy-components';
import { connect } from 'dva';
import RegExp from 'src/utils/regExp';
import options from 'src/utils/regionData';
import { isContain, getFileList, setAccount, goBack } from 'src/utils/tools';
import '../index.less';
import { formItemLayout, formItemLayout_1, gutter } from 'src/utils/gridInit';
@connect(({ license }) => ({
  license,
}))
@Form.create()
class Index extends Component {
  state = {
    status: null,
    fileParamList: [],
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    let status = id === 'add' ? false : true;
    this.setState({
      status,
    });
    if (status) {
      this.getDetail(id);
    }
  }
  // 获取详情
  getDetail = async (id) => {
    let res = await this.props.dispatch({
      type: 'license/getDetail',
      payload: { id },
    });
    let formKey = this.props.form.getFieldsValue();
    let areaCode = [res.data.provinceCode, res.data.cityCode, res.data.regionCode];
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


  // 新增
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let provinceCode = values.areaCode[0];
        let cityCode = values.areaCode[1];
        let regionCode = values.areaCode[2];
        let fileParamList = this.state.fileParamList;
        delete values.areaCode;
        let allValue = {
          ...values,
          provinceCode: provinceCode,
          regionCode: regionCode,
          cityCode: cityCode,
          fileParamList: fileParamList,
        };
        this.props.dispatch({
          type: 'license/addLicense',
          payload: allValue,
        }).then((res) => {
          message.success('新增成功！');
          goBack(e, this);
        });
      }
    });
  }
  // 渲染表单方法
  renderField = (label, key, component, options = {
    rules: [
      { required: true, whitespace: true, message: `${label}不能为空` },
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
    const { status } = this.state;
    let id = this.props.match.params.id;
    let breadcrumb;
    let action = [<Button key="back" onClick={(e)=>goBack(e, this)}>返回</Button>];
    if (isContain(1001001001) && this.props.match.params.id === 'add') {
      action.push(<Button key="edit" type="primary" onClick={(e) => { this.handleSubmit(e); }}>新增</Button>);
      breadcrumb = '添加持牌机构';
    } else {
      breadcrumb = '持牌机构详情';
    }
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
            name: breadcrumb,
          }]}
          action={action}
        >
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Row gutter={gutter}>
              <DyAuditLog
                id={id}
              />
              <div className="block-title">基本信息</div>
              {this.renderField('持牌机构名称', 'licenseOrganizationName', <Input disabled={status} />)}
              {status && this.renderField('持牌机构编码', 'licenseOrganizationNo', <Input disabled={status} />, {
                rules: [
                  { required: false },
                ],
              })}
              {this.renderField('统一社会信用代码', 'socialCreditCode', <Input disabled={status} />)}
              {this.renderField('公司座机', 'licenseOrganizationPhone', <Input disabled={status} placeholder={'请以“-”号分开，最多13位'} />, {
                rules: [
                  { required: false, ...RegExp.Telephone },
                ],
              })}
              {this.renderField('公司邮箱', 'licenseOrganizationEmail', <Input disabled={status} />, {
                rules: [
                  { required: true, ...RegExp.Email },
                ],
              })}
              <Col span={24}>
                <Form.Item
                  label="公司经营地址"
                  {...formItemLayout_1}
                >
                  {getFieldDecorator('licenseOrganizationAddress', { rules: [{ required: true, whitespace: true, message: '不能为空' }] })(<Input.TextArea rows={3} maxLength={200} disabled={status} />)}
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
                      disabled={status} />)}
                  </Form.Item>
                </Col>

                {this.renderField('', 'detailAddress', <Input placeholder="镇/街道/区" maxLength={50} disabled={status} />)}
              </Col>
            </Row>

            <Row gutter={gutter}>
              <div className="block-title">人员信息</div>
              {this.renderField('法人姓名', 'legalPerson', <Input maxLength={13} disabled={status} />)}
              {this.renderField('法人身份证号', 'legalCardNo', <Input disabled={status} />, {
                rules: [
                  { required: true, ...RegExp.Idcard },
                ],
              })}
              {this.renderField('联系人职务', 'contactPosition', <Input maxLength={13} disabled={status} />)}
              {this.renderField('联系人姓名', 'contactName', <Input disabled={status} />)}
              {this.renderField('联系人身份证号', 'contactCardNo', <Input disabled={status} />, {
                rules: [
                  { required: true, ...RegExp.Idcard },
                ],
              })}
              {this.renderField('联系人座机', 'contactPhone', <Input disabled={status} placeholder={'请以“-”号分开，最多13位'} />, {
                rules: [
                  { required: false, ...RegExp.Telephone },
                ],
              })}
              {this.renderField('联系人手机号码', 'contactMobilePhone', <Input disabled={status} />, {
                rules: [
                  { required: true, ...RegExp.Phone },
                ],
              })}
            </Row>
            <Row gutter={gutter}>
              <div className="block-title">账号信息</div>
              {this.renderField('银行名称', 'bankName', <Input maxLength={15} disabled={status} />)}
              {this.renderField('银行开户支行', 'bankBranchName', <Input maxLength={50} disabled={status} />)}
              {this.renderField('银行卡号', 'bankCardNo', <Input maxLength={25} disabled={status} onBlur={() => { setAccount('bankCardNo', this); }} />)}
            </Row>
            <Row gutter={gutter}>
              <div className="block-title">附件</div>
              {this.renderField('', 'fileParamList',
                <DyUpload app={this}
                  fileList={this.state.fileParamList}
                  action={'global/toUpload'}
                  fileListName={'fileParamList'} status={status}
                />, {
                  rules: [
                    { required: false },
                  ],
                })}
            </Row>
          </Form>
        </DyPage>
      </DyControl>
    );
  }
}

export default Index;