import React, { Component, Fragment } from 'react';
import { Form, Input, Row, Col,  message, Spin, Select, DatePicker, Radio, Modal } from 'antd';
import { DyPage, DyUpload, DyAuditLog } from 'dy-components';
import { connect } from 'dva';
import formats from 'src/utils/filter';
import {  payRecAction } from 'src/utils/actionReturn';
import {  receiptPayType,  propertyType, moneyType, accountType, dealerAccountT } from 'src/utils/statusData';
import { resFilter } from '../utils/index';
import moment from 'moment';
import { goBack } from 'src/utils/tools';
import { formItemLayout, formItemLayout_1, renderField, gutter } from 'src/utils/gridInit';
const confirm = Modal.confirm;
@connect(({ payRec, loading }) => ({
  payRec,
  detailLoading: loading.effects['payRec/TradeDetail'],
}))
@Form.create()
class Index extends Component {
  state = {
    // status: null,
    type: null,
    initProps: {},
    sureStatus: 5,
    fileList: [],
    examineStatus: 2,
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    // this.setState({
    //   status: (this.props.location.query.type === 'edit') ? false :true,
    // });
    if (id) {
      this.getDetail(id);
    }
  }
  getDetail = async (id) => {
    let response = await this.props.dispatch({
      type: 'payRec/TradeDetail',
      payload: { id },
    });
    resFilter(response, this);
  }

  // 提交修改
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

  // 审核接口调用
  toex = async (data, key, e) => {
    let date = data.date ? formats.formatDate(data.date) : '';
    data.endDate = data.endDate?formats.formatDate(data.endDate):'';
    let res = await this.props.dispatch({
      type: key === 1 ? 'payRec/TradeExamine' : 'payRec/TradeConfrim',
      payload: {
        receiptPayId: this.props.match.params.id,
        ...data,
        date,
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

  render() {
    const { getFieldDecorator } = this.props.form;
    const { detailLoading } = this.props;
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
          name: `货款${breadcrumbName}`,
        }]}
        action={
          actionlist
        }
      >
        <Spin spinning={detailLoading}>
          <DyAuditLog
            id={this.props.match.params.id} type={19}
          />
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
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
              {renderField(getFieldDecorator, '风险保证金比例(%)', 'riskDepositRate', <Input disabled/>)}
              {renderField(getFieldDecorator, `${this.state.initProps.rateName}(%)`, 'businessDepositRate', <Input disabled/>)}
              {renderField(getFieldDecorator, '支付方式', 'payWay', <Select placeholder="请选择" disabled>
                {moneyType.map((item)=>{
                  return (<Select.Option  value={item.id} key={item.id}>{item.name}</Select.Option>);
                })}
              </Select>)}
              {this.state.initProps.payWay===2&&renderField(getFieldDecorator, '票据保证金比例（%）', 'billDepositRate', <Input disabled/>)}
            </Row>
            <Row gutter={gutter}>
              <div className="block-title">收{this.state.initProps.payWay===2?'票':'款'}方信息</div>
              {renderField(getFieldDecorator, '经销商编号', 'dealerNo', <Input disabled />)}
              {renderField(getFieldDecorator, '经销商名称', 'dealerName', <Input disabled />)}
              {this.state.initProps.payWay===2&&renderField(getFieldDecorator, '账户类型', 'payeeAccountType', <Select placeholder="请选择" disabled>
                {dealerAccountT.map((item)=>{
                  return (<Select.Option  value={item.id} key={item.id}>{item.name}</Select.Option>);
                })}
              </Select>)}
              {renderField(getFieldDecorator, '银行名称', 'payeeBankName', <Input disabled />)}
              {renderField(getFieldDecorator, '银行开户支行', 'payeeBankBranchName', <Input disabled />)}
              {renderField(getFieldDecorator, '银行账号', 'payeeBankCardNo', <Input disabled />)}
            </Row>
            <Row gutter={gutter}>
              <div className="block-title">付{this.state.initProps.payWay===2?'票':'款'}方信息</div>
              {renderField(getFieldDecorator, '持牌机构', 'licenseOrganizationName', <Input disabled />)}
              {renderField(getFieldDecorator, '银行名称', 'payBankName', <Input disabled />)}
              {this.state.initProps.payWay===2&&renderField(getFieldDecorator, '账户类型', 'payAccountType', <Select placeholder="请选择" disabled>
                {accountType.map((item)=>{
                  return (<Select.Option  value={item.id} key={item.id}>{item.name}</Select.Option>);
                })}
              </Select>)}
              {renderField(getFieldDecorator, '银行开户支行', 'payBankBranchName', <Input disabled />)}
              {renderField(getFieldDecorator, '银行账号', 'payBankCardNo', <Input disabled />)}
            </Row>

            <Row gutter={gutter}>
              <div className="block-title">财务信息信息</div>
              {renderField(getFieldDecorator, '资金类型', 'receiptPayType',
                <Select placeholder="请选择资金类型" disabled>
                  { receiptPayType.map((item) => {
                    return (<Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>);
                  })}
                </Select>)}
              {this.state.initProps.payWay===1 && (
                renderField(getFieldDecorator, '用款起息日', 'date', <DatePicker format="YYYY-MM-DD" disabled
                  disabledDate={(e) => { return e && e < moment().subtract(1, 'year'); }}
                />, )
              )
              }
              {renderField(getFieldDecorator, '发生金额（元）', 'receiptPayAmount', <Input disabled />)}
              {(this.state.type === 1 || this.state.type === 3) && (
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
                  {this.state.initProps.payWay===2&&(
                    <Fragment>
                      {renderField(getFieldDecorator, '出票日期', 'date', <DatePicker format="YYYY-MM-DD" disabled={edit}
                        disabledDate={(e) => { return e && e < moment().subtract(1, 'year'); }}
                      />, {
                        rules: [{ required: true, message: '请选择出票日期!' }],
                      })}
                      {renderField(getFieldDecorator, '银票到期日', 'endDate', <DatePicker format="YYYY-MM-DD" disabled={edit}
                        disabledDate={(e) => { return e && e < moment().subtract(1, 'year'); }}
                      />, {
                        rules: [{ required: true, message: '请选择银票到期日!' }],
                      })}
                    </Fragment>
                  )}
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