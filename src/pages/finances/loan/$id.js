import React, { Component } from 'react';
import { DyPage, DyFormModal  } from 'dy-components';
import { Form, Input, Button,  Modal, message } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {   goBack }from 'src/utils/tools';
import '../index.less';
import { formItemLayout, renderField } from 'src/utils/gridInit';
import { exChangeRepay } from 'src/utils/statusReturn';
const { TextArea } = Input;
@connect()
@Form.create()
class index extends Component {
  state = {
    visible: false,
    notexaminevisible: false,
    status: '',
  }
  componentDidMount(){
    this.getDetail();
  }
  examine=()=>{
    let id = this.props.match.params.id;
    this.props.dispatch({
      type: 'loan/audit',
      payload: {
        loanId: id,
        status: 2,
      },
    }).then((res) => {
      if (res.code === '000000') {
        message.success('审核成功');
        this.setState({ visible: false });
        this.props.dispatch(
          routerRedux.replace('/finances/loan')
        );
      }
    });
  }
  // 不通过审核
  cancelExamine = (remark) => {
    let id = this.props.match.params.id;
    this.props.dispatch({
      type: 'loan/audit',
      payload: {
        loanId: id,
        status: 3,
        remark: remark.f1,
      },
    }).then((res) => {
      if (res.code === '000000') {
        message.success('操作成功');
        this.setState({ visible: false });
        this.props.dispatch(
          routerRedux.replace('/finances/loan')
        );
      }
    });
  }
  getDetail=()=>{
    let { id } = this.props.match.params;
    this.props.dispatch({
      type: 'loan/detail',
      payload: { id },
    }).then((res)=>{
      this.props.form.setFieldsValue({
        ...res.data,
      });
      this.setState({ status: res.data.status });
      this.getSubDetail(res.data.finacingNo);
    });
  }
  getSubDetail=(id)=>{
    this.props.dispatch({
      type: 'loan/getNoDetail',
      payload: { id },
    }).then((res)=>{
      this.props.form.setFieldsValue({
        ...res.data, repaymentType: exChangeRepay(res.data.repaymentType),
      });
    });
  }

  // 提交审核
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({
          visible: true,
        });
      }
    });
  }
  // 关闭对话框
  hideModal = () => {
    this.setState({
      visible: false,
    });
  }
   // 审核不通过modal打开
   notexamine = () => {
     ;
     this.changeShow(true);
   }
  // 审核不通过的modal状态变更
  changeShow = (type) => {
    this.setState({
      notexaminevisible: type,
    });
  }
  render() {
    const formData = [
      {
        key: 'f1',
        render() {
          return <TextArea maxLength={40} placeholder="审核不通过原因"/>;
        },
        options: {
          rules: [{ required: true, message: '必填!' }],
        },
      },
    ];
    const { status }=this.state;
    let action = [<Button key="back" onClick={(e)=>goBack(e, this)}>返回</Button> ];
    if(status===1){
      action.push(<Button key="sure" type="primary" onClick={this.handleSubmit}>审核</Button>);
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <DyPage
        breadcrumb={[{
          name: '财务管理',
        }, {
          name: '用款管理',
          href: '/finances/loan',
        }, {
          name: '用款详情',
        }]}
        action={action}
      >
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          {renderField(getFieldDecorator, '客户编号', 'companyNo', <Input disabled />)}
          {renderField(getFieldDecorator, '公司名称', 'companyName', <Input disabled />)}
          {renderField(getFieldDecorator, '采购订单编号', 'orderNo', <Input disabled />)}
          {renderField(getFieldDecorator, '品牌商', 'brandName', <Input disabled />)}
          {renderField(getFieldDecorator, '采购订单商品数量', 'goodsCount', <Input disabled />)}
          {renderField(getFieldDecorator, '采购订单货值（元）', 'orderValue', <Input disabled />)}
          {renderField(getFieldDecorator, '交付时间', 'deliverTime', <Input disabled />)}
          {renderField(getFieldDecorator, '租赁编号', 'finacingNo', <Input disabled />)}
          {renderField(getFieldDecorator, '申请金额（元）', 'applyAmount', <Input disabled />)}
          {renderField(getFieldDecorator, '年租赁费率（%）', 'interestRate', <Input disabled />)}
          {renderField(getFieldDecorator, '赎回期限', 'applyDeadline', <Input disabled />)}
          {renderField(getFieldDecorator, '租赁方式', 'repaymentType', <Input disabled />)}
          {renderField(getFieldDecorator, '租赁意图', 'intention', <Input disabled  />)}
          {renderField(getFieldDecorator, '收款方客户名称', 'brandName', <Input disabled />)}
          {renderField(getFieldDecorator, '收款银行名称', 'bankName', <Input disabled  />)}
          {renderField(getFieldDecorator, '收款银行支行', 'bankBranchName', <Input disabled />)}
          {renderField(getFieldDecorator, '收款银行账号', 'bankCardNo', <Input disabled  />)}
          {renderField(getFieldDecorator, '发生金额（元）', 'fundsAmount', <Input disabled  />)}
          {renderField(getFieldDecorator, '资金标记', 'fundsMark', <Input disabled  />)}
        </Form>
        {/* 选择是否通过审核 */}
        <Modal
          title={null}
          width={'300px'}
          wrapClassName="bond-examine"
          visible={this.state.visible}
          onCancel={this.hideModal}
          footer={null}
          centered={true}
        >
          <p className="bond-examine-title">审核是否通过？</p>
          <div className="buttonbox">
            <Button  onClick={this.examine} type="primary">是</Button>
            <Button  onClick={this.notexamine} >否</Button>
          </div>
        </Modal>
        <DyFormModal visible={this.state.notexaminevisible} formData={formData} title="请填写不通过的原因"
          visibleName={'notexaminevisible'} app={this} action={this.cancelExamine}/>
      </DyPage>
    );
  }
}
export default index;