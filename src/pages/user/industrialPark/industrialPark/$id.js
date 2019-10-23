import React, { Component } from 'react';
import { DyPage, DyUpload, DyAuditLog, DyExamineBox, DyFormModal } from 'dy-components';
import { Form, Input, Col, Row, Modal, message, Spin, Cascader } from 'antd';
import { connect } from 'dva';
import RegExp from 'src/utils/regExp';
import '../../index.less';
import { detailAction } from 'src/utils/actionReturn';
import { getFileList, setAccount, goBack } from 'src/utils/tools';
import options from '../../../../utils/regionData';
import { formItemLayout, formItemLayout_1, renderField, gutter } from 'src/utils/gridInit';
const confirm = Modal.confirm;

const pagePermission = '1001005001';
const pageProps = 'industrialPark';

const formData = [
  {
    key: 'remark',
    render() {
      return <Input.TextArea maxLength={40} placeholder="审核不通过原因"/>;
    },
    options: {
      rules: [{ required: true, message: '必填!' }],
    },
  },
];


@connect(({ attestation, loading }) => ({
  attestation,
  detailLoading: loading.effects[`${pageProps}/getIndustrialParkDetail`],
}))
@Form.create()
class index extends Component {
  state = {
    status: null,
    type: null,
    areaText: '',
    visible: false,
    fileParamList: [],
    province: '',
    city: '',
    region: '',
  };


  componentDidMount() {
    let id = this.props.match.params.id;
    let status = id === 'add' ? null : true;
    this.setState({
      status: status,
    });
    console.log('componentDidMount status=', status);
    if (status) {
      this.getDetail(id);
    } else {
      this.props.form.setFieldsValue({});
    }
  }

  getDetail = async (id) => {
    console.log('getDetail start');
    let [res, fileListRes] = await Promise.all([
      this.props.dispatch({
        type: `${pageProps}/getIndustrialParkDetail`,
        payload: { id },
      }),
      this.props.dispatch({
        type: `${pageProps}/getIndustrialParkFiles`,
        payload: { id },
      }),
    ]);
    let areaCode = [res.data.provinceCode, res.data.cityCode, res.data.regionCode];
    console.log('getDetail 0areaCode=', areaCode);
    let formKey = this.props.form.getFieldsValue();
    console.log('getDetail 1formKey=', formKey);
    for (let key in formKey) {
      if (res.data[key]) {
        formKey[key] = res.data[key];
      }
    }
    console.log('getDetail 2formKey=', formKey);
    if (fileListRes.data) {
      let fileParams = getFileList(fileListRes.data);
      formKey.fileParamList = fileParams;
      this.setState({
        fileParamList: fileParams,
      });
    }

    this.setState({
      status: res.data.status,
      province: res.data.province,
      city: res.data.city,
      region: res.data.region,
    });

    this.props.form.setFieldsValue({
      ...formKey, areaCode: areaCode,
    });
  };

  // 提交审核
  handleSubmit = (e, type) => {
    console.log('start submit ...');
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let title;
        values.provinceCode = values.areaCode[0];
        values.cityCode = values.areaCode[1];
        values.regionCode = values.areaCode[2];
        if (type === 'add') {
          title = '新增';
          let areas = this.state.areaText.split('/');
          values.province = areas[0];
          values.city = areas[1];
          values.region = areas[2];
        } else {
          title = '提交';
          values.id = this.props.match.params.id;
          values.province = this.state.province;
          values.city = this.state.city;
          values.region = this.state.region;
        }
        // 后台不能处理null
        if (values.telephone === undefined) values.telephone = '';
        if (values.email === undefined) values.email = '';
        if (values.contactTelephone === undefined) values.contactTelephone = '';
        delete values.areaCode;
        confirm({
          title: `确认${title}此项？`,
          onOk: () => {
            this.examineAction(values, type, e);
          },
        });
      }
    });
  };

  examineAction = async (values, type, e) => {
    e.persist();
    console.log('examineAction values = ', values);
    let res = type === 'add' ? (
      await this.props.dispatch({
        type: `${pageProps}/addIndustrialPark`,
        payload: values,
      })
    ) : (
      await this.props.dispatch({
        type: `${pageProps}/updateIndustrialPark`,
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

  ;

  // 审核不通过modal打开
  notexamine = () => {
    this.setState({
      notexaminevisible: true,
    });
  };

  // 审核不通过
  setAction = (data, e) => {
    this.toex(2, data, e);
  };

  // 审核通过
  examine = (e) => {
    this.toex(1, {}, e);
  };

  // 审核接口调用
  toex = async (passed, data, e) => {
    e.persist();
    let res = await this.props.dispatch({
      type: `${pageProps}/auditIndustrialPark`,
      payload: {
        id: this.props.match.params.id,
        auditResult: passed,
        ...data,
      },
    });
    ;
    message.success(res.message);
    goBack(e, this);
  };

  onAreaChange = (value, selectedOptions) => {
    this.setState({
      areaText: selectedOptions.map((o) => o.label).join('/'),
    });
  };

  render() {

    const { getFieldDecorator } = this.props.form;
    const { detailLoading } = this.props;
    let { actionlist, breadcrumbName, edit } = detailAction({
      type: this.state.status,
      permission: `${pagePermission}00`,
      props: pageProps,
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

    return (
      <DyPage className="user-manage-detail"
        breadcrumb={[{
          name: '用户管理',
        }, {
          name: '产业园管理',
          href: '/user/industrialPark/industrialPark',
        }, {
          name: `产业园管理${breadcrumbName}`,
        }]}
        action={
          actionlist
        }
      >
        <Spin spinning={this.state.status ? detailLoading : false}>
          <DyAuditLog
            id={this.props.match.params.id} type={34}
          />
          <Form {...formItemLayout} >
            <Row gutter={gutter}>
              <div className="block-title">基本信息</div>
              {(this.props.match.params.id !== 'add') ? (
                renderField(getFieldDecorator, '产业园编号', 'no', <Input disabled/>)
              ) : ''}
              {renderField(getFieldDecorator, '产业园名称', 'name', <Input disabled={edit}/>,
                {
                  rules: [
                    { required: true, message: '请输入产业园名称' },
                  ],
                },
              )}
              {renderField(getFieldDecorator, '统一社会信用代码', 'uscc', <Input
                disabled={edit}/>,
              {
                rules: [
                  { required: true, ...RegExp.SocialCode },
                ],
              },
              )}
              {renderField(getFieldDecorator, '公司座机', 'telephone', <Input disabled={edit} placeholder={'请以“-”号分开，最多13位'}/>, {
                rules: [
                  { required: false, ...RegExp.Telephone },
                ],
              })}
              {renderField(getFieldDecorator, '公司邮箱', 'email', <Input disabled={edit}/>, {
                rules: [
                  { required: false, ...RegExp.Email },
                ],
              })}
              <Col span={24}>
                <Form.Item label="公司经营地址" {...formItemLayout_1}>
                  {getFieldDecorator('officeAddress', {
                    rules: [
                      { required: true, message: '请输入经营地址！' },
                    ],
                  })(<Input.TextArea rows={2} disabled={edit}/>)}
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
                      disabled={edit} onChange={this.onAreaChange}/>)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  {renderField(getFieldDecorator, '', 'registrationAddress', <Input placeholder="镇/街道/区" maxLength={50}
                    disabled={edit}/>, {
                    rules: [
                      { required: true, message: '请输入详细地址！' },
                    ],
                  })}
                </Col>
              </Col>
            </Row>
            <Row gutter={gutter}>
              <div className="block-title">人员信息</div>
              {renderField(getFieldDecorator, '法人姓名', 'legalPerson', <Input disabled={edit}/>, {
                rules: [
                  { required: true, message: '请输入法人姓名！' },
                ],
              })}
              {renderField(getFieldDecorator, '法人身份证号', 'legalPersonId', <Input disabled={edit}/>, {
                rules: [
                  { required: true, ...RegExp.Idcard },
                ],
              })}
              {renderField(getFieldDecorator, '联系人职务', 'contactPosition', <Input disabled={edit}/>, {
                rules: [
                  { required: true, message: '请输入联系人职务！' },
                ],
              })}
              {renderField(getFieldDecorator, '联系人姓名', 'contact', <Input disabled={edit}/>, {
                rules: [
                  { required: true, message: '请输入联系人姓名！' },
                ],
              })}
              {renderField(getFieldDecorator, '联系人身份证号', 'contactId', <Input disabled={edit}/>, {
                rules: [
                  { required: true, ...RegExp.Idcard },
                ],
              })}
              {renderField(getFieldDecorator, '联系人手机号码', 'contactMobile', <Input disabled={edit}/>, {
                rules: [
                  { required: true, ...RegExp.Phone },
                ],
              })}
              {renderField(getFieldDecorator, '联系人座机', 'contactTelephone', <Input disabled={edit} placeholder={'请以“-”号分开，最多13位'}/>, {
                rules: [
                  { required: false, ...RegExp.Telephone },
                ],
              })}
            </Row>
            <Row gutter={gutter}>
              <div className="block-title">账号信息</div>
              {renderField(getFieldDecorator, '银行名称', 'accountBank', <Input disabled={edit}/>, {
                rules: [
                  { required: true, message: '必填' },
                ],
              })}
              {renderField(getFieldDecorator, '银行开户支行', 'accountSubBranch', <Input disabled={edit}/>, {
                rules: [
                  { required: true, message: '必填' },
                ],
              })}
              {renderField(getFieldDecorator, '银行卡号', 'accountCode', <Input disabled={edit} onBlur={() => {
                setAccount('accountCode', this);
              }}/>, {
                rules: [
                  { required: true, message: '必填' },
                ],
              })}
            </Row>
            <Row gutter={gutter}>
              <div className="block-title">附件</div>
              {renderField(getFieldDecorator, '', 'fileParamList',
                <DyUpload app={this}
                  fileList={this.state.fileParamList}
                  fileListName={'fileParamList'} status={edit}
                />)}
            </Row>
          </Form>
        </Spin>
        <DyExamineBox visible={this.state.visible} ok={this.examine} not={this.notexamine}
          app={this}/>
        <DyFormModal visible={this.state.notexaminevisible} formData={formData} title="请填写不通过的原因"
          visibleName={'notexaminevisible'} app={this} action={this.setAction}/>
      </DyPage>
    );
  }
}

export default index;
