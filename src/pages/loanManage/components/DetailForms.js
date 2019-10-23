import React, { Component } from 'react';
import {  Form, Input, Row } from 'antd';
import { connect } from 'dva';
import { formItemLayout, renderField, gutter } from 'src/utils/gridInit';
import { exChangeRepay, exChange } from 'src/utils/statusReturn';
@connect(({ repay }) => ({
  repay,
}))
@Form.create({
  mapPropsToFields(props) {
    let data = props.repay.formData;
    let res = Object.assign({}, data);
    for (let k in res) {
      let r = Form.createFormField({
        value: res[k],
      });
      res[k] = r;
    }
    return  {
      ...res, applyDeadline: Form.createFormField({
        value: exChange(props.repay.formData.applyDeadline),
      }), repaymentType: Form.createFormField({
        value: exChangeRepay(props.repay.formData.repaymentType),
      }),
    };
  },
})

class Index extends Component {
  state = {
  }
  constructor(props) {
    super(props);
    this.props.onRef(this);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Row gutter={gutter}>
          {renderField(getFieldDecorator, '客户编号', 'finacingNo', <Input disabled/>)}
          {renderField(getFieldDecorator, '公司名称', 'companyName', <Input disabled/>)}
          {renderField(getFieldDecorator, '租赁编号', 'finacingNo', <Input disabled/>)}
          {renderField(getFieldDecorator, '申请金额(元)', 'applyAmount', <Input disabled/>)}
          {renderField(getFieldDecorator, '年租赁费率(%)', 'interestRate', <Input disabled/>)}
          {renderField(getFieldDecorator, '赎回期限', 'applyDeadline', <Input disabled/>)}
          {renderField(getFieldDecorator, '租赁方式', 'repaymentType', <Input disabled/>)}
          {renderField(getFieldDecorator, '租赁意图', 'intention', <Input disabled/>)}
          {renderField(getFieldDecorator, '用款时间', 'createTime', <Input disabled/>)}
          {renderField(getFieldDecorator, '当前费用（元）', 'interest', <Input disabled/>)}
          {renderField(getFieldDecorator, '赎回总费用（元）', 'amountAndInterest', <Input disabled/>)}
        </Row>
      </Form>
    );
  }
}

export default Index;