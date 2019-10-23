import React, { Component, Fragment } from 'react';
import { Form, Input, Row, Col,  message, Spin, Select, Radio, Modal } from 'antd';
import { DyPage } from 'dy-components';
import { connect } from 'dva';
import { isContain, goBack }from 'src/utils/tools';
import { payRecAction } from 'src/utils/actionReturn';
import {  receiptPayType,  moneyType, propertyType } from 'src/utils/statusData';
import { resFilter } from '../utils/index';
import { formItemLayout, formItemLayout_1, renderField, gutter } from 'src/utils/gridInit';
const confirm = Modal.confirm;
@connect(({ payRec, loading }) => ({
  payRec,
  detailLoading: loading.effects['payRec/AdvanceDetail'],
  returnLoading: loading.effects['payRec/advanceRefundDetail'],
}))
@Form.create()
class Index extends Component {
  state = {
    // status: true,
    type: null,
    fileVoList: [],
    examineStatus: 2,
    sureStatus: 5,
    initProps: {},
    actionType: 1,
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    this.setState({
      actionType: this.props.location.query.actionType,
    });
    if (id) {
      this.getDetail(id);
    }
  }
  getDetail = async (id) => {
    let response = await this.props.dispatch({
      type: this.props.location.query.actionType==='12'?'payRec/advanceRefundDetail':'payRec/AdvanceDetail',
      payload: { id },
    });
    resFilter(response, this);
  }
  // 审核接口调用
  toex = async (data, key, e) => {
    e.persist();
    let res = await this.props.dispatch({
      type: this.state.actionType==='12'?'payRec/advanceRefundExamine':'payRec/AdvanceExamine',
      payload: {
        receiptPayId: this.props.match.params.id,
        ...data,
      },
    });
    message.success(res.message);
    goBack(e, this);
  }
  // 审核状态变动
  onChangeExamineStatus = (e, name) => {
    this.setState({
      [name]: e.target.value,
    });
  }
  // 提交
  handleSubmit = (e, key) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        confirm({
          title: '确认提交此项？',
          onOk: async () => {
            this.toex(values, key, e);
          },
        });
      }
    });
  }
  render() {
    const { detailLoading, returnLoading } = this.props;
    const { getFieldDecorator } = this.props.form;
    let { actionlist, breadcrumbName, edit, sureEdit } = payRecAction({
      type: this.state.type,
      permission: '100500200',
      back: (e) => { goBack(e, this); },
      sh: (e) => { this.handleSubmit(e, 1); },
      su: (e) => { this.handleSubmit(e, 2); },
    });
    return (
      <DyPage
        className="user-manage-detail"
        breadcrumb={[{
          name: '财务管理',
        }, {
          name: '收付款管理',
          href: '/finances/payRec',
        }, {
          name: `业务保证金${this.state.initProps.receiptPayType===12?'(期末退款)':''}${breadcrumbName}`,
        }]}
        action={
          actionlist
        }
      >
        <Spin spinning={this.state.initProps.receiptPayType===12?returnLoading:detailLoading}>
          <Form {...formItemLayout}>
            <Row gutter={gutter}>
              <div className="block-title">基本信息</div>
              {renderField(getFieldDecorator, '流水号', 'receiptPayNo', <Input disabled/>)}
              {renderField(getFieldDecorator, `${this.state.initProps.rentName}编号`, 'rentNo', <Input disabled/>)}
              {renderField(getFieldDecorator, '资产类型', 'sourceType', <Select placeholder="请选择" disabled>
                {propertyType.map((item)=>{
                  return (<Select.Option  value={item.id} key={item.id}>{item.name}</Select.Option>);
                })}
              </Select>)}
              {renderField(getFieldDecorator, '订单编号', 'orderNo', <Input disabled/>)}
              {renderField(getFieldDecorator, '订单总货值（元）', 'totalGoodsValue', <Input disabled/>)}
              {renderField(getFieldDecorator, '业务保证金比例（%）', 'businessDepositRate', <Input disabled/>)}
              {renderField(getFieldDecorator, '支付方式', 'payWay', <Select placeholder="请选择" disabled>
                {moneyType.map((item)=>{
                  return (<Select.Option  value={item.id} key={item.id}>{item.name}</Select.Option>);
                })}
              </Select>)}
              {this.state.initProps.payWay===2&&renderField(getFieldDecorator, '票据保证金比例（%）', 'billDepositRate', <Input disabled/>)}
            </Row>
            <Row gutter={gutter}>
              <div className="block-title">{this.state.initProps.receiptPayType===12?'收':'付'}款方信息</div>
              {renderField(getFieldDecorator, '经销商编号', 'dealerNo', <Input disabled/>)}
              {renderField(getFieldDecorator, '经销商名称', 'dealerName', <Input disabled/>)}
            </Row>
            <Row gutter={gutter}>
              <div className="block-title">{this.state.initProps.receiptPayType===12?'付':'收'}款方信息</div>
              {renderField(getFieldDecorator, '持牌机构', 'licenseOrganizationName', <Input disabled/>)}
              {renderField(getFieldDecorator, '银行名称', this.state.initProps.receiptPayType===12?'payBankName':'payeeBankName', <Input disabled/>)}
              {renderField(getFieldDecorator, '银行开户支行', this.state.initProps.receiptPayType===12?'payBankBranchName':'payeeBankBranchName', <Input disabled/>)}
              {renderField(getFieldDecorator, '托管账号', this.state.initProps.receiptPayType===12?'payBankCardNo':'payeeBankCardNo', <Input disabled/>)}
              {renderField(getFieldDecorator, '资金类型', 'receiptPayType',
                <Select placeholder="请选择资金类型" disabled>
                  { receiptPayType.map((item)=>{
                    return (<Select.Option  value={item.id} key={item.id}>{item.name}</Select.Option>);
                  })}
                </Select>)}
              {renderField(getFieldDecorator, '发生金额（元）', 'receiptPayAmount', <Input disabled/>)}
            </Row>
            {((this.state.type === 1 && isContain('1005002001')) || this.state.type === 3) && (
              <Fragment>
                {renderField(getFieldDecorator, '操作', 'status',
                  <Radio.Group onChange={(e) => { this.onChangeExamineStatus(e, 'examineStatus'); }} disabled={edit}>
                    <Radio value={2}>通过审核</Radio>
                    <Radio value={3}  disabled={this.state.initProps.receiptPayType===12}>不通过审核</Radio>
                  </Radio.Group>)}
              </Fragment>
            )}
            {(this.state.type === 2 || this.state.type === 5 || this.state.type === 4) && (
              <Fragment>
                {renderField(getFieldDecorator, '操作', 'status',
                  <Radio.Group onChange={(e) => { this.onChangeExamineStatus(e, 'sureStatus'); }} disabled={sureEdit}>
                    <Radio value={5}>确认通过</Radio>
                    <Radio value={4}>确认不通过</Radio>
                  </Radio.Group>)}
              </Fragment>
            )}
            {((this.state.sureStatus === 4 && sureEdit === false) || (this.state.examineStatus === 3 && edit === false)) && (
              <Fragment>
                <Col span={24}>
                  <Form.Item
                    label="审核不通过原因"
                    {...formItemLayout_1}
                  >
                    {getFieldDecorator('remark', {
                      rules: [{ required: true, message: '请输入原因!' }],
                    })(<Input.TextArea rows={3} />)}
                  </Form.Item>
                </Col>
              </Fragment>
            )}
          </Form>
        </Spin>
      </DyPage>
    );
  }
}

export default Index;