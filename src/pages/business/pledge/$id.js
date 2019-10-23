import React, { Component } from 'react';
import { DyPage, DyFormModal, DyUpload, DyAuditLog, DyExamineBox } from 'dy-components';
import { Form, Input, Col, Row, Select, Modal, message, Spin } from 'antd';
import { connect } from 'dva';
import RegExp from 'src/utils/regExp';
import '../../user/index.less';
import TableForm from '../components/companyTable';
import { detailAction } from 'src/utils/actionReturn';
import { moneyType } from 'src/utils/statusData';
import { formItemLayout, formItemLayout_1, renderField, gutter } from 'src/utils/gridInit';
import '../index.less';
import { goBack } from 'src/utils/tools';
const confirm = Modal.confirm;
@connect(({ pledge, loading }) => ({
  pledge,
  addloading: loading.effects['pledge/toAdd'],
  editloading: loading.effects['pledge/toEdit'],
  detailLoading: loading.effects['pledge/getDetail'] && loading.effects['pledge/getAgencyDetail'],
}))
@Form.create()
class index extends Component {
  state = {
    status: null,
    dealerId: null,
    brandId: null,
    orderFileParamList: [],
    baseFileParamList: [],
    fileVoList: [],
    visible: false,
    notexaminevisible: false,
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    let status = id === 'add' ? null : true;
    this.setState({
      status: status,
    });
    if (status) {
      this.getDetail(id);
    } else {
      this.setData();
    }
  }
  setData = async () => {
    await this.props.dispatch({
      type: 'pledge/updateState',
      payload: { goodList: [] },
    });
  }
  getDetail = async (pledgeId) => {
    let res = await this.props.dispatch({
      type: 'pledge/getDetail',
      payload: { pledgeId },
    });
    this.setState({
      status: res.data.status,
      brandId: res.data.brandId,
      dealerId: res.data.dealerId,
    });
    let formKey = this.props.form.getFieldsValue();
    for (let key in formKey) {
      if (key === 'goodsList') {
        formKey[key] = res.data[key]||[];
        await this.props.dispatch({
          type: 'pledge/updateState',
          payload: { goodList: res.data[key]||[] },
        });
      }
      else {
        formKey[key] = res.data[key];
      }
    }
    this.props.form.setFieldsValue({
      ...formKey,
    });
    this.setState({
      orderFileParamList: formKey.orderFileParamList,
      baseFileParamList: formKey.baseFileParamList,
    });

  }
  // 提交
  handleSubmit = (e, type) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let title;
        if (type === 'add') {
          title = '新增';
        } else if (type === 'edit') {
          title = '修改';
          values.orderId = this.props.match.params.id;
        } else if (type === 'zp') {
          title = '指派';
          values.id = this.props.match.params.id;
        } else if (type === 'examine') {
          this.openModal();
          return;
        }
        confirm({
          title: `确认${title}此项？`,
          onOk: () => {
            values.brandId = this.state.brandId;
            values.dealerId = this.state.dealerId;
            this.examineAction(values, type, e);
          },
        });
      }
    });
  }
  examineAction = async (values, type, e) => {
    e.persist();
    let res;
    if (type === 'add') {
      res = await this.props.dispatch({
        type: 'pledge/toAdd',
        payload: values,
      });
    } else if (type === 'edit') {
      res = await this.props.dispatch({
        type: 'pledge/toEdit',
        payload: values,
      });
    } else if (type === 'zp') {
      res = await this.props.dispatch({
        type: 'pledge/appoint',
        payload: values,
      });
    }
    message.success(res.message);
    goBack(e, this);
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
      type: 'pledge/toExamine',
      payload: {
        orderId: this.props.match.params.id,
        status: type,
        ...data,
      },
    });
    message.success(res.message);
    goBack(e, this);
  }
  codeChange = (val, type) => {
    let value = val.target.value;
    let reg = RegExp.SocialCode.pattern;
    if (reg.test(value)) {
      this.getPlanlist(value, type);
    }
  }
  codePress = (type) => {
    let name = type === 'brand' ? 'brandId' : 'dealerId';
    let Name = type === 'brand' ? 'brandName' : 'dealerName';
    this.setState({
      [name]: null,
    });
    this.props.form.setFieldsValue({
      [Name]: '',
    });
  }
  getPlanlist = async (value, type) => {
    let res = await this.props.dispatch({
      type: type === 'brand' ? 'pledge/brandInfo' : 'pledge/getSynthesizeInfo',
      payload: { code: value },
    });
    this.setState({
      dealerId: res.data.dealerId,
      brandId: res.data.brandId,
    });
    let formKey = this.props.form.getFieldsValue();
    for (let key in formKey) {
      if (res.data[key]) {
        formKey[key] = res.data[key];
      }
    }
    if (type === 'brand') {
      formKey.brandSocialCreditCode = res.data.socialCreditCode;
    } else if (type === 'dis') {
      formKey.dealerSocialCreditCode = res.data.socialCreditCode;
    }
    this.props.form.setFieldsValue({
      ...formKey,
    });
  }
  ontableChange = (data) => {
    this.props.form.setFieldsValue({
      goodsList: data,
    });
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
    const { getFieldDecorator } = this.props.form;
    const { detailLoading } = this.props;
    let { actionlist, breadcrumbName, edit } = detailAction({
      type: this.state.status,
      permission: '100200400',
      add: (e) => { this.handleSubmit(e, 'add'); },
      back: (e) => { goBack(e, this); },
      sh: (e) => { this.openModal(e); },
      ed: (e) => { this.handleSubmit(e, 'edit'); },
      zp: (e) => { this.handleSubmit(e, 'zp'); },
    });
    return (
      <DyPage className="user-manage-detail"
        breadcrumb={[{
          name: '业务管理',
        }, {
          name: '质/押物清单管理',
          href: '/business/pledge',
        }, {
          name: `质/押物清单${breadcrumbName}`,
        }]}
        action={actionlist}
      >
        <Spin spinning={this.state.status ? detailLoading : false}>
          <DyAuditLog
            id={this.props.match.params.id} type={27}
          />
          <Form {...formItemLayout} >
            <Row gutter={gutter}>
              <div className="block-title">基本信息</div>
              {renderField(getFieldDecorator, '经销商社会统一信用代码/编号', 'dealerSocialCreditCode', <Input disabled={this.props.match.params.id !== 'add'} onBlur={(e) => this.codeChange(e, 'dis')} onChange={(e) => this.codePress('dis')}
                maxLength={18} />,
              {
                rules: [
                  { required: true, ...RegExp.SocialCode },
                ],
              }
              )}
              {renderField(getFieldDecorator, '经销商名称（抵押人）', 'dealerName', <Input disabled />)}
              {renderField(getFieldDecorator, '品牌商社会统一信用代码/编号', 'brandSocialCreditCode', <Input disabled/>,)}
              {renderField(getFieldDecorator, '品牌商名称', 'brandName', <Input disabled />)}
              {renderField(getFieldDecorator, '原抵押权人社会统一信用代码', 'oldSocialCreditCode', <Input  disabled={edit} maxLength={18}/>,
                {
                  rules: [
                    { required: false, ...RegExp.SocialCode },
                  ],
                }
              )}
              {renderField(getFieldDecorator, '原抵押权人名称', 'oldPledgeName', <Input  disabled={edit}/>)}
              {renderField(getFieldDecorator, '联系人名称', 'contactName', <Input  disabled={edit}/>)}
              {renderField(getFieldDecorator, '联系人电话', 'contactPhone', <Input  disabled={edit}/>,
                {
                  rules: [
                    { required: false, ...RegExp.Phone },
                  ],
                }
              )}
              {renderField(getFieldDecorator, '附件', 'baseFileParamList',
                <DyUpload app={this}
                  fileList={this.state.baseFileParamList}
                  fileListName={'baseFileParamList'} status={edit}
                />)}
            </Row>
            <Row gutter={gutter}>
              <div className="block-title">质/抵押物信息</div>
              {renderField(getFieldDecorator, '质/抵押物合同编号', 'orderNo', <Input disabled={edit} maxLength={50} />,
                {
                  rules: [
                    { required: true, message: '请输入质/抵押物合同编号' },
                  ],
                }
              )}
              {renderField(getFieldDecorator, '质/抵押物合同数量', 'totalGoodsCount', <Input disabled={edit} maxLength={8} />,
                {
                  rules: [
                    { required: true, ...RegExp.number },
                  ],
                }
              )}
              {renderField(getFieldDecorator, '质/抵押物合同总货值（元）', 'totalGoodsValue', <Input disabled={edit} />,
                {
                  rules: [
                    { required: true, ...RegExp.Money },
                  ],
                }
              )}
              {renderField(getFieldDecorator, '支付方式', 'payWay', <Select placeholder="请选择" disabled={edit}>
                {moneyType.map((item)=>{
                  return (<Select.Option  value={item.id} key={item.id} disabled={item.id===2}>{item.name}</Select.Option>);
                })}
              </Select>,
              {
                rules: [
                  { required: true, ...RegExp.Money },
                ],
              }
              )}
              {renderField(getFieldDecorator, '采购订单', 'orderFileParamList',
                <DyUpload app={this}
                  fileList={this.state.orderFileParamList}
                  fileListName={'orderFileParamList'} status={edit}
                />)}
              <Col span={24} className="dynamic-table" >
                <Form.Item
                  label="质/抵押物清单"
                  {...formItemLayout_1}
                >
                  {getFieldDecorator('goodsList', {
                    rules: [
                      { required: true, message: '请添加质/抵押物清单' },
                    ],
                  })(
                    <TableForm tableChange={this.ontableChange}
                      disable={edit} type={2} />
                  )}
                </Form.Item>
              </Col>
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
export default index;