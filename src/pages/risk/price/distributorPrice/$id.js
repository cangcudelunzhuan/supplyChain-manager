import React, { Component, Fragment } from 'react';
import { DyPage, DyFormModal, DyAuditLog, DyExamineBox, DySubtitle } from 'dy-components';
import { Form, Input, Col, Row, Select, Modal, message, Spin, Card, Checkbox } from 'antd';
import { connect } from 'dva';
import RegExp from 'src/utils/regExp';
import formats from 'src/utils/filter';
import {  detailAction } from 'src/utils/actionReturn';
import { ticketType } from 'src/utils/statusData';
import 'src/pages/index.less';
import { formItemLayout, renderField, gutter } from 'src/utils/gridInit';
import { goBack } from 'src/utils/tools';
const confirm = Modal.confirm;
@connect(({ distributorPrice, loading }) => ({
  distributorPrice,
  addloading: loading.effects['distributorPrice/toAdd'],
  editloading: loading.effects['distributorPrice/toEdit'],
  detailLoading: loading.effects['distributorPrice/getDetail'] && loading.effects['distributorPrice/getAgencyDetail'],
}))
@Form.create()
class index extends Component {
  state = {
    status: null,
    dealerId: null,
    brandId: null,
    fileParamList: [],
    fileVoList: [],
    radioEdit: true,
    visible: false,
    notexaminevisible: false,
    cyLIst: [],
    postList: [
      // 事后列表
      // {
      //   id: 2,
      //   name: 'sss2',
      //   premiumRate: 0.9,
      //   remark: '2222',
      //   extendInfo: {
      //     industrialParkId: 22,
      //     industrialParkName: 'cccc',
      //     receiveTicketType: [1, 2],
      //     sendTicketType: [1, 3],
      //   },
      // },
    ],
    preList: [], // 事前列表

  }
  renderField2 = (label, key, component, options = {}, title, span=12) => {
    const { getFieldDecorator } = this.props.form;
    return (
      <Col span={span} >
        {title?(<h4 className="title">{title}</h4>):''}
        <Form.Item
          label={label}
        >
          {key ? getFieldDecorator(key, options)(component) : component}
        </Form.Item>
      </Col>
    );
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    let status = id === 'add' ? null : true;
    this.setState({
      status: status,
    });
    if (status) {
      this.getDetail(id);
    } else{
      this.setFactor();
    }
    this.getIndustrialPark();
    // 获取因素值给表格;
    // let formKey = this.props.form.getFieldsValue();
    // let ex = {};
    // this.state.postList.map((item)=>{
    //   if(item.extendInfo){
    //     ex = { ...item.extendInfo };
    //   }
    //   console.log('ex', ex);
    //   formKey[item.name]=item.premiumRate;
    // });
    // this.state.preList.map((item)=>{
    //   formKey[item.name]=item.premiumRate;
    // });
    // this.props.form.setFieldsValue({
    //   ...formKey,
    //   ...ex,
    // });
  }
  // 获取产业园
  getIndustrialPark = async () => {
    let res = await this.props.dispatch({
      type: 'distributorPrice/getByCondition',
      payload: {},
    });
    res.data.push({
      id: 0,
      name: '未指定产业园',
    });
    this.setState({
      cyLIst: res.data,
    });
  }
  setFactor = async () => {
    let [res, res2] = await Promise.all([
      this.props.dispatch({
        type: 'distributorPrice/listValid',
        payload: { type: 1 },
      }),
      this.props.dispatch({
        type: 'distributorPrice/listValid',
        payload: { type: 2 },
      }),
    ]);
    this.setState({
      postList: res2.data,
      preList: res.data,
    });
  }
  getDetail = async (id) => {
    let res = await this.props.dispatch({
      type: 'distributorPrice/getDetail',
      payload: { id },
    });
    this.setState({
      status: res.data.status,
      postList: res.data.postFactor.premiumVoList,
      preList: res.data.preFactor.premiumVoList,
    });
    let formKey = this.props.form.getFieldsValue();
    let ex = {};
    let formAdd = {};
    this.state.postList.map((item) => {
      if(item.extendInfo){
        ex = { ...item.extendInfo };
      }
      formAdd[item.type]=item.premiumRate;
    });
    this.state.preList.map((item) => {
      formAdd[item.type]=item.premiumRate;
    });
    for (let key in formKey) {
      formKey[key] = res.data[key];
    }
    this.props.form.setFieldsValue({
      ...formKey,
      postTotalPremium: res.data.postFactor.totalPremium,
      preTotalPremium: res.data.preFactor.totalPremium,
      ...ex,
      ...formAdd,
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
          values.id = this.props.match.params.id;
        } else if (type === 'examine') {
          this.openModal();
          return;
        }
        confirm({
          title: `确认${title}此项？`,
          onOk: () => {
            values.preFactors=this.state.preList;
            values.postFactors= this.state.postList;
            console.log('va', JSON.stringify(values));
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
        type: 'distributorPrice/toAdd',
        payload: values,
      });
    } else if (type === 'edit') {
      res = await this.props.dispatch({
        type: 'distributorPrice/toEdit',
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
      type: 'distributorPrice/toExamine',
      payload: {
        id: this.props.match.params.id,
        result: type,
        ...data,
      },
    });
    ;
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
  codePress = () => {
    this.props.form.setFieldsValue({
      dealerName: '',
      brandNo: '',
      brandName: '',
      orgNo: '',
      orgName: '',
    });
  }
  getPlanlist = async (value, type) => {
    let res = await this.props.dispatch({
      type: 'distributorPrice/getSynthesizeInfo',
      payload: { dealerNo: value },
    });
    let formKey = this.props.form.getFieldsValue();
    for (let key in formKey) {
      if (res.data[key]) {
        formKey[key] = res.data[key];
      }
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
  ratechange = (e, type, name) => {
    let reg = RegExp.Rate.pattern;
    if (!(reg.test(e.target.value))){
      return;
    }
    if (type===1) {
      let preList = this.state.preList;
      let sum = 0;
      preList.map((item)=>{
        if(item.name ===name) {
          item.premiumRate = e.target.value;
        }
        sum = formats.formatPoint(sum+(item.premiumRate-0), 4);
      });
      this.setState({
        preList,
      });
      this.props.form.setFieldsValue({
        preTotalPremium: sum,
      });
    } else if (type === 2) {
      let postList = this.state.postList;
      let sum = 0;
      postList.map((item) => {
        if(item.name === name) {
          item.premiumRate = e.target.value;
        }
        sum = formats.formatPoint(sum+(item.premiumRate-0), 4);
      });
      this.setState({
        postList,
      });
      this.props.form.setFieldsValue({
        postTotalPremium: sum,
        totalPremium: this.preTotalPremium,
      });
    }
    let preTotalPremium = this.props.form.getFieldValue('preTotalPremium')?this.props.form.getFieldValue('preTotalPremium'):0;
    let postTotalPremium = this.props.form.getFieldValue('postTotalPremium')?this.props.form.getFieldValue('postTotalPremium'):0;
    this.props.form.setFieldsValue({
      totalPremium: formats.formatPoint(preTotalPremium+postTotalPremium, 4),
    });
  }
  // 票务类型选择
  radioChange = (e, type) => {
    let postList = this.state.postList;
    // let name = type===1?'receiveTicketType':'sendTicketType';
    postList.map((item) => {
      if (item.isIndustrialPark === 1||item.extendInfo) {
        // item.extendInfo[name]= e;
        item.extendInfo.receiveTicketType= e;
        item.extendInfo.sendTicketType= e;
      }
    });
    this.setState({
      postList,
    });
  }
  // 选择产业园
  cyChange = async (e)=>{
    this.props.form.setFieldsValue({
      sendTicketType: [],
      receiveTicketType: [],
    });
    this.setState({
      radioEdit: true,
    });
    let res;
    if (e===0) {
      this.setState({
        radioEdit: false,
      });
      res = {
        data: {
          acceptTax: [],
          outTax: [],
        },
      };
    } else {
      res = await this.props.dispatch({
        type: 'distributorPrice/cyDetail',
        payload: { id: e },
      });
    }
    let postList = this.state.postList;
    postList.map((items)=>{
      if (items.isIndustrialPark === 1||items.extendInfo) {
        items.extendInfo.receiveTicketType = res.data.acceptTax;
        items.extendInfo.sendTicketType = res.data.acceptTax;
        // items.extendInfo.sendTicketType = res.data.outTax;
        items.extendInfo.industrialParkId = e;
        let formKey = this.props.form.getFieldsValue();
        this.props.form.setFieldsValue({
          ...formKey,
          ...items.extendInfo,
        });

      }
    });
    this.setState({
      postList,
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
    const { detailLoading } = this.props;
    let { actionlist, breadcrumbName, edit } = detailAction({
      type: this.state.status,
      permission: '100700200100',
      add: (e) => { this.handleSubmit(e, 'add'); },
      back: (e) => { goBack(e, this); },
      sh: (e) => { this.openModal(e); },
      ed: (e) => { this.handleSubmit(e, 'edit'); },
    });
    const { getFieldDecorator } = this.props.form;
    return (
      <DyPage className="user-manage-detail"
        breadcrumb={[{
          name: '风险管理',
        }, {
          name: '经销商定价管理',
          href: '/risk/price/distributorPrice',
        }, {
          name: `经销商定价${breadcrumbName}`,
        }]}
        action={actionlist}
      >
        <Spin spinning={this.state.status ? detailLoading : false}>
          <DyAuditLog
            id={this.props.match.params.id} type={38}
          />
          <Form {...formItemLayout} >
            <Row gutter={gutter}>
              <div className="block-title">基本信息</div>
              {renderField(getFieldDecorator, '经销商编号', 'dealerNo', <Input disabled={this.props.match.params.id !== 'add'} onBlur={(e) => this.codeChange(e, 'dis')} onChange={this.codePress}
                maxLength={18} />,
              {
                rules: [
                  { required: true, ...RegExp.SocialCode },
                ],
              }
              )}
              {renderField(getFieldDecorator, '经销商名称', 'dealerName', <Input disabled />, {
                rules: [
                  { required: true, message: '必填' },
                ],
              })}
              {renderField(getFieldDecorator, '品牌商编号', 'brandNo', <Input disabled/>, {
                rules: [
                  { required: true, message: '必填' },
                ],
              }
              )}
              {renderField(getFieldDecorator, '品牌商名称', 'brandName', <Input disabled />, {
                rules: [
                  { required: true, message: '必填' },
                ],
              })}
              {renderField(getFieldDecorator, '持牌机构编号', 'orgNo', <Input disabled />, {
                rules: [
                  { required: true, message: '必填' },
                ],
              })}
              {renderField(getFieldDecorator, '持牌机构名称', 'orgName', <Input disabled />, {
                rules: [
                  { required: true, message: '必填' },
                ],
              })}
            </Row>
            <Row gutter={gutter}>
              <div className="block-title">风险溢价信息</div>
              <DySubtitle title="短期溢价" size={'small'}/>
              <Card title="事前因素" bordered={true} className="priceCardBox">
                {
                  this.state.preList.map((item)=>{
                    return (
                      <Fragment key={item.riskFactorId}>
                        <Col span={12}>
                          {this.renderField2('溢价率(%)', item.type, <Input onBlur={(e)=>{ this.ratechange(e, 1, item.name); }} disabled={edit} />, {
                            rules: [
                              { required: true, ...RegExp.RateZero },
                            ],
                          },
                          `${item.name}(${item.explain||'--'})`, 24)}
                        </Col>
                      </Fragment>
                    );
                  })
                }
                {this.renderField2('溢价率(%)', 'preTotalPremium', <Input disabled/>,
                  {
                    rules: [
                      { required: true, ...RegExp.RateZero },
                    ],
                  },
                  '事前风险溢价率总计', 12)}
              </Card>
              <Card title="事后因素" bordered={true} className="priceCardBox">
                <Row gutter={gutter}>
                  {
                    this.state.postList.map((item)=>{
                      if (item.extendInfo) { // 1 产业园 2非产业园  产品说产业园只有事后因素有
                        return (
                          <Fragment key={item.riskFactorId}>
                            <Col span={12}>
                              {this.renderField2('当前产业园', 'industrialParkId', <Select placeholder="请选择" disabled={edit} onChange={this.cyChange}>
                                {this.state.cyLIst.map((item)=>{
                                  return (<Select.Option  value={item.id} key={item.id}>{item.name}</Select.Option>);
                                })}
                              </Select>,
                              {
                                rules: [
                                  { required: true, message: '请选择' },
                                ],
                              },
                              `${item.name}(${item.explain||'--'})`, 24)}
                              {this.renderField2('接收票务类型', 'receiveTicketType', <Checkbox.Group options={ticketType} disabled={edit||this.state.radioEdit} onChange={(e)=>this.radioChange(e, 1)}/>,
                                {
                                  rules: [
                                    { required: true, message: '请选择票务类型！' },
                                  ],
                                }, '', 24
                              )}
                              {/* {this.renderField2('开出票务类型', 'sendTicketType', <Checkbox.Group options={ticketType} disabled={edit||this.state.radioEdit} onChange={(e)=>this.radioChange(e, 2)}/>,
                                {
                                  rules: [
                                    { required: true, message: '请选择票务类型！' },
                                  ],
                                }, '', 24
                              )} */}
                              {this.renderField2('溢价率(%)', item.type, <Input disabled={edit} onBlur={(e)=>{ this.ratechange(e, 2, item.name); }} />,
                                {
                                  rules: [
                                    { required: true, ...RegExp.RateZero },
                                  ],
                                }, '', 24)}
                            </Col>
                          </Fragment>
                        );
                      } else {
                        return (
                          <Fragment key={item.riskFactorId}>
                            <Col span={12}>
                              {this.renderField2('溢价率(%)', item.type, <Input  onBlur={(e)=>{ this.ratechange(e, 2, item.name); }} disabled={edit}/>, {
                                rules: [
                                  { required: true, ...RegExp.Rate },
                                ],
                              },
                              `${item.name}(${item.explain||'--'})`, 24)}
                            </Col>
                          </Fragment>
                        );
                      }
                    })
                  }
                  {this.renderField2('溢价率(%)', 'postTotalPremium', <Input disabled/>, {
                    rules: [
                      { required: true, ...RegExp.Rate },
                    ],
                  },
                  '事后风险溢价率总计', 12)}
                </Row>
              </Card>
              <DySubtitle title="长期溢价" size={'small'} />
              <Card title="长期溢价因素" bordered={true} className="priceCardBox">
                {
                  this.state.preList.map((item)=>{
                    return (
                      <Fragment key={item.riskFactorId}>
                        <Col span={12}>
                          {this.renderField2('溢价率(%)', item.type, <Input onBlur={(e)=>{ this.ratechange(e, 1, item.name); }} disabled={edit} />, {
                            rules: [
                              { required: true, ...RegExp.RateZero },
                            ],
                          },
                          `${item.name}(${item.explain||'--'})`, 24)}
                        </Col>
                      </Fragment>
                    );
                  })
                }
                {this.renderField2('溢价率(%)', 'preTotalPremium', <Input disabled/>,
                  {
                    rules: [
                      { required: true, ...RegExp.RateZero },
                    ],
                  },
                  '事前风险溢价率总计', 12)}
              </Card>
              <DySubtitle title="综合溢价" size={'small'}/>
              {renderField(getFieldDecorator, '综合风险溢价率总计', 'totalPremium', <Input disabled />, {
                rules: [
                  { required: true, ...RegExp.Rate },
                ],
              },
              )}

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
