import React, { Component, Fragment } from 'react';
import { Form, Input, Row, Col, message, Spin, Select, Radio, DatePicker, Modal } from 'antd';
import { DyPage, DyUpload, DyAuditLog } from 'dy-components';
import { connect } from 'dva';
import formats from 'src/utils/filter';
import { isContain, goBack } from 'src/utils/tools';
import {  payRecAction } from 'src/utils/actionReturn';
import {  receiptPayType, propertyType, moneyType, dealerAccountT } from 'src/utils/statusData';
import { resFilter } from '../utils/index';
import moment from 'moment';
import { formItemLayout, formItemLayout_1, renderField, gutter } from 'src/utils/gridInit';
const confirm = Modal.confirm;

@connect(({ payRec, loading }) => ({
  payRec,
  detailLoading: loading.effects['payRec/RedeemDetail'],
}))
@Form.create()
class Index extends Component {
  state = {
    status: null,
    type: null,
    fileList: [],
    examineStatus: 2,
    sureStatus: 5,
    initProps: {},
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    if (id) {
      this.getDetail(id);
    }
  }
  getDetail = async (id) => {
    let response = await this.props.dispatch({
      type: 'payRec/RedeemDetail',
      payload: { id },
    });
    resFilter(response, this);
  }
  // 审核接口调用
  toex = async (data, key, e) => {
    e.persist();
    let date = data.date ? formats.formatDate(data.date) : '';
    let res = await this.props.dispatch({
      type: key === 1 ? 'payRec/RedeemExamine' : 'payRec/RedeemConfrim',
      payload: {
        receiptPayId: this.props.match.params.id,
        ...data,
        date,
      },
    });
    // ;
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
    const { detailLoading } = this.props;
    const { getFieldDecorator } = this.props.form;
    let { actionlist, edit, sureEdit, breadcrumbName } = payRecAction({
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
          name: `${breadcrumbName}`,
        }]}
        action={
          actionlist
        }
      >
        <Spin spinning={detailLoading}>
          <DyAuditLog
            id={this.props.match.params.id} type={20}
          />
          <Form {...formItemLayout}>
            <Row gutter={gutter}>
              <div className="block-title">基本信息</div>
              {renderField(getFieldDecorator, '流水号', 'receiptPayNo', <Input disabled />)}
              {renderField(getFieldDecorator, '融资编号', 'rentNo', <Input disabled />)}
              {renderField(getFieldDecorator, '资产类型', 'sourceType', <Select placeholder="请选择" disabled>
                {propertyType.map((item)=>{
                  return (<Select.Option  value={item.id} key={item.id}>{item.name}</Select.Option>);
                })}
              </Select>)}
              {renderField(getFieldDecorator, `${this.state.initProps.name}编号`, 'orderNo', <Input disabled/>)}
              {renderField(getFieldDecorator, `${this.state.initProps.name}总货值(元)`, 'totalGoodsValue', <Input disabled/>)}
              {renderField(getFieldDecorator, '支付方式', 'payWay', <Select placeholder="请选择" disabled>
                {moneyType.map((item)=>{
                  return (<Select.Option  value={item.id} key={item.id}>{item.name}</Select.Option>);
                })}
              </Select>)}
              {renderField(getFieldDecorator, '付息日', 'xxxxxxxxx', <Input disabled />)}
            </Row>
            <Row gutter={gutter}>
              <div className="block-title">{this.state.initProps.receiptPayType==='货款银票'?'出票':'付款'}方信息</div>
              {renderField(getFieldDecorator, '公司名称', 'xxxxxxx', <Input disabled />)}
              {renderField(getFieldDecorator, '账户类型', 'payAccountType', <Select placeholder="请选择" disabled>
                {dealerAccountT.map((item)=>{
                  return (<Select.Option  value={item.id} key={item.id}>{item.name}</Select.Option>);
                })}
              </Select>)}
              {renderField(getFieldDecorator, '银行名称', 'payBankName', <Input disabled />)}
              {renderField(getFieldDecorator, '开户行', 'payBankBranchName', <Input disabled />)}
              {renderField(getFieldDecorator, '银行账号', 'payBankCardNo', <Input disabled />)}
            </Row>
            <Row gutter={gutter}>
              <div className="block-title">{this.state.initProps.receiptPayType==='货款银票'?'收票':'收款'}方信息</div>
              {renderField(getFieldDecorator, '公司名称', 'sssssss', <Input disabled />)}
              {renderField(getFieldDecorator, '账户类型', 'payeeAccountType', <Select placeholder="请选择" disabled>
                {dealerAccountT.map((item)=>{
                  return (<Select.Option  value={item.id} key={item.id}>{item.name}</Select.Option>);
                })}
              </Select>)}
              {renderField(getFieldDecorator, '银行名称', 'payeeBankName', <Input disabled />)}
              {renderField(getFieldDecorator, '开户行', 'payeeBankBranchName', <Input disabled />)}
              {renderField(getFieldDecorator, '银行账号', 'payeeBankCardNo', <Input disabled />)}
            </Row>
            <Row gutter={gutter}>
              <div className="block-title">财务信息信息</div>
              {renderField(getFieldDecorator, '资金类型', 'receiptPayType',
                <Select placeholder="请选择资金类型" disabled>
                  { receiptPayType.map((item) => {
                    return (<Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>);
                  })}
                </Select>)}
              {renderField(getFieldDecorator, '发生金额（元）', 'receiptPayAmount', <Input disabled />)}
              {((this.state.type === 1 && isContain('1005002001')) || this.state.type === 3) && (
                <Fragment>
                  {renderField(getFieldDecorator, '操作', 'status',
                    <Radio.Group onChange={(e) => { this.onChangeExamineStatus(e, 'examineStatus'); }} disabled={edit}>
                      <Radio value={2}>通过审核</Radio>
                      <Radio value={3}>不通过审核</Radio>
                    </Radio.Group>)}
                </Fragment>
              )}
              {this.state.examineStatus === 2 && (
                <Fragment>
                  {renderField(getFieldDecorator, '赎回日期', 'date', <DatePicker format="YYYY-MM-DD" disabled={edit}
                    disabledDate={(e) => { return e && e < moment().subtract(1, 'year'); }}
                  />, {
                    rules: [{ required: true, message: '请选择起息日!' }],
                  })}
                  {renderField(getFieldDecorator, '附件', 'fileList',
                    <DyUpload app={this}
                      fileList={this.state.fileList}
                      action={'global/toUpload'}
                      fileListName={'fileList'} status={edit}
                    />, {
                      rules: [
                        { required: true, message: '请上传附件' },
                      ],
                    })}
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
            </Row>
          </Form>
        </Spin>
      </DyPage>
    );
  }
}

export default Index;