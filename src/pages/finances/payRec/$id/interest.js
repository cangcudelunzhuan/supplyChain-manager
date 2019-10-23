import React, { Component, Fragment } from 'react';
import { Form, Input, Row, Col,  message, Spin, Select, Radio, DatePicker, Modal } from 'antd';
import { DyPage, DyUpload, DyAuditLog } from 'dy-components';
import { connect } from 'dva';
import formats from 'src/utils/filter';
import { isContain, goBack } from 'src/utils/tools';
import { payRecAction  } from 'src/utils/actionReturn';
import { organizationType,  receiptPayType, propertyType, moneyType, accountType } from 'src/utils/statusData';
import { resFilter } from '../utils/index';
import moment from 'moment';
import { formItemLayout, formItemLayout_1, renderField, gutter } from 'src/utils/gridInit';
const confirm = Modal.confirm;
@connect(({ payRec, loading }) => ({
  payRec,
  detailLoading: loading.effects['payRec/InterestDetail'],
}))
@Form.create()
class Index extends Component {
  state = {
    status: null,
    type: null,
    organizationType: null,
    examineStatus: 2,
    initProps: {},
    sureStatus: 5,
    fileList: [],
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
      type: 'payRec/InterestDetail',
      payload: { id },
    });
    resFilter(response, this);
  }
  // 审核接口调用
  toex = async (data, key, e) => {
    e.persist();
    let date = data.date ? formats.formatDate(data.date) : '';
    let res = await this.props.dispatch({
      type: key === 1 ? 'payRec/InterestExamine' : 'payRec/InterestConfrim',
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
          name: `利息支出${breadcrumbName}`,
        }]}
        action={
          actionlist
        }
      >
        <Spin spinning={detailLoading}>
          <DyAuditLog
            id={this.props.match.params.id} type={22}
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
              <div className="block-title">付款方信息</div>
              {renderField(getFieldDecorator, '持牌机构', 'licenseOrganizationName', <Input disabled />)}
              {/* {renderField(getFieldDecorator,'出资方式', 'investmentType',
                <Select placeholder="请选择出资方式" disabled>
                  {investmentType.map((item)=>{
                    return (<Select.Option  value={item.id} key={item.id}>{item.name}</Select.Option>);
                  })}
                </Select>
              )} */}
              {renderField(getFieldDecorator, '账户类型', 'payAccountType', <Select placeholder="请选择" disabled>
                {accountType.map((item)=>{
                  return (<Select.Option  value={item.id} key={item.id}>{item.name}</Select.Option>);
                })}
              </Select>)}
              {renderField(getFieldDecorator, '银行名称', 'payBankName', <Input disabled />)}
              {renderField(getFieldDecorator, '银行开户支行', 'payBankBranchName', <Input disabled />)}
              {renderField(getFieldDecorator, '银行账户', 'payBankCardNo', <Input disabled />)}
            </Row>
            <Row gutter={gutter}>
              <div className="block-title">收款方信息</div>
              {renderField(getFieldDecorator, '出资机构编号', 'organizationNo', <Input disabled />)}
              {renderField(getFieldDecorator, '出资机构类型', 'organizationType',
                <Select placeholder="请选择机构类型" disabled>
                  {organizationType.map((item) => {
                    return (<Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>);
                  })}
                </Select>
              )}
              {renderField(getFieldDecorator, '出资机构名称', 'organizationName', <Input disabled />)}
              {renderField(getFieldDecorator, '银行名称', 'payeeBankName', <Input disabled />)}
              {renderField(getFieldDecorator, '银行开户支行', 'payeeBankBranchName', <Input disabled />)}
              {/* {this.state.organizationType !==1 && <Fragment>{renderField(getFieldDecorator,'银行卡号', 'payeeBankCardNo', <Input disabled/>)}</Fragment>} */}
              {/* {renderField(getFieldDecorator,'资金类型', 'receiptPayType',
                <Select placeholder="请选择资金类型" disabled>
                  { receiptPayType.map((item)=>{
                    return (<Select.Option  value={item.id} key={item.id}>{item.name}</Select.Option>);
                  })}
                </Select>)}
              {renderField(getFieldDecorator,'发生金额（元）', 'receiptPayAmount', <Input disabled/>)} */}
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
                  {renderField(getFieldDecorator, '还款日期', 'date', <DatePicker format="YYYY-MM-DD" disabled={edit}
                    disabledDate={(e) => { return e && e < moment().subtract(1, 'year'); }}
                  />, {
                    rules: [{ required: true, message: '请选择还款日期!' }],
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