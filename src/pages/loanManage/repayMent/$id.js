import React, { Component, Fragment } from 'react';
import { Form, Input, Row, Button, Spin, Select, Table } from 'antd';
import { DyPage, DyControl } from 'dy-components';
import { connect } from 'dva';
import {
  investmentType,  receiptPayType,
  creditType,
  limitUnitData, moneyType, propertyType,
  organizationType,
} from 'src/utils/statusData';
import { timeFormat, goBack } from 'src/utils/tools';
import Log from '../components/repaymentLog';
import { formItemLayout, renderField, gutter } from 'src/utils/gridInit';

@connect(({ repay, loading }) => ({
  repay,
  detailLoading: loading.effects['repay/getDetail'],
}))
@Form.create()
class Index extends Component {
  state = {
    status: null,
    type: null,
    payDateType: null,
    tableData: [],
    auditLogList: [],
    interestType: 1,
    payWay: '',
    columns: [
      {
        title: '总期数',
        dataIndex: 'totalNumber',
      },
      {
        title: '当前期数',
        dataIndex: 'currentNumber',
        render: (key, record) => {
          if (record.totalNumber - 0 > 1) {
            return `${key}/${record.totalNumber}`;
          } else {
            return key;
          }
        },
      },
      {
        title: '还款金额（元）',
        dataIndex: 'amount',
      },
      {
        title: '付息日',
        dataIndex: 'payDate',
      },
      {
        title: '还款状态',
        dataIndex: 'repaymentStatus',
        render: (key) => {
          switch (key) {
          case 1:
            return '已还款';
          case 2:
            return '未还款';
          default:
            break;
          }
        },
      },
      {
        title: '还款日期',
        dataIndex: 'repaymentDate',
      },
    ],
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    if (id) {
      this.getDetail(id);
    }
  }
  getDetail = async (id) => {
    let response = await this.props.dispatch({
      type: 'repay/getDetail',
      payload: { id },
    });
    let payday = response.rentInfoVo.payDay;
    delete response.rentInfoVo.payDay;
    let res = {
      ...response.orderInfoVo,
      ...response.rentInfoVo,
      ...response.financeInfoVo,
    };
    res.repaymentPlanList = response.repaymentRepaymentPlanList;
    res.auditLogList = response.auditLogList;
    res.payday = payday;
    res = timeFormat(res);
    switch (res.status) {
    case 1:
      this.setState({
        type: 1,
      });
      break;
    case 3:
      this.setState({
        type: 3,
      });
      break;
    default:
      this.setState({
        type: 2,
      });
      break;
    }
    this.setState({
      auditLogList: res.auditLogList || [],
      tableData: res.repaymentPlanList || [],
      interestType: res.interestType||'',
      payDateType: res.payDateType||'',
      payWay: res.payWay,
    });
    let formKey = this.props.form.getFieldsValue();
    for (let key in formKey) {
      formKey[key] = res[key];
    }
    this.props.form.setFieldsValue({
      ...formKey,
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { detailLoading } = this.props;
    let actionlist = [<Button key="back" onClick={(e)=>goBack(e, this)}>返回</Button>];
    return (
      <DyControl permission="1006001001" key="control">
        <DyPage
          className="user-manage-detail"
          breadcrumb={[{
            name: '租后管理',
          }, {
            name: '还款管理',
            href: '/loanManage/repayMent',
          }, {
            name: '还款详情',
          }]}
          action={
            actionlist
          }
        >
          <Spin spinning={detailLoading}>
            <Log
              dataSource={this.state.auditLogList}
            />
            <Form {...formItemLayout}>
              <Row gutter={gutter}>
                <div className="block-title">合同信息</div>
                {renderField(getFieldDecorator, '持牌机构名称', 'licenseOrganizationName', <Input disabled />)}
                {renderField(getFieldDecorator, '经销商名称', 'dealerName', <Input disabled />)}
                {renderField(getFieldDecorator, '经销商社会统一信用代码', 'xxxxxxxx', <Input disabled />)}
                {renderField(getFieldDecorator, '品牌商名称', 'brandName', <Input disabled />)}
                {renderField(getFieldDecorator, '品牌商社会统一信用代码', 'xxxxxxxx', <Input disabled />)}
                {renderField(getFieldDecorator, '资产类型', 'sourceType', <Select placeholder="请选择" disabled>
                  {propertyType.map((item)=>{
                    return (<Select.Option  value={item.id} key={item.id}>{item.name}</Select.Option>);
                  })}
                </Select>)}
                {renderField(getFieldDecorator, '合同编号', 'orderNo', <Input disabled />)}
                {renderField(getFieldDecorator, '合同总货值（元）', 'totalGoodsValue', <Input disabled />)}
                {renderField(getFieldDecorator, '支付方式', 'payWay', <Select placeholder="请选择" disabled>
                  {moneyType.map((item)=>{
                    return (<Select.Option  value={item.id} key={item.id}>{item.name}</Select.Option>);
                  })}
                </Select>)}
              </Row>
              <Row gutter={gutter}>
                <div className="block-title">授信信息</div>
                {renderField(getFieldDecorator, '融资编号', 'rentNo', <Input disabled />)}
                {renderField(getFieldDecorator, '出资机构名称', 'xxxxxx', <Input disabled />)}
                {renderField(getFieldDecorator, '出资机构类型', 'xxxxxxxxx',
                  <Select placeholder="请选择出资方式" disabled>
                    {organizationType.map((item) => {
                      return (<Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>);
                    })}
                  </Select>
                )}
                {renderField(getFieldDecorator, '出资机构统一信用代码', 'xxxxxx', <Input disabled />)}
                {renderField(getFieldDecorator, '出资方式', 'fundingType',
                  <Select placeholder="请选择出资方式" disabled>
                    {investmentType.map((item) => {
                      return (<Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>);
                    })}
                  </Select>
                )}
                {renderField(getFieldDecorator, '授信期限（天）', 'financeLimit', <Input disabled />)}
                {this.state.payWay!==2&&
                (
                  <Fragment>
                    { renderField(getFieldDecorator, '授信类型', 'xxxxxxxxx', <Select placeholder="请选择授信类型" disabled>
                      {creditType.map((item) => {
                        return (<Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>);
                      })}
                    </Select>
                    )}
                    {renderField(getFieldDecorator, '期限单位', 'limitUnit', <Select placeholder="请选择资金类型" disabled>
                      {limitUnitData.map((item) => {
                        return (<Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>);
                      })}
                    </Select>
                    )}
                    {renderField(getFieldDecorator, '授信利率(%)', 'xxxxxxxxx', <Input disabled />)}
                  </Fragment>
                )
                }
              </Row>
              <Row gutter={gutter}>
                <div className="block-title">财务信息</div>
                {renderField(getFieldDecorator, '资金类型', 'receiptPayType',
                  <Select placeholder="请选择资金类型" disabled>
                    { receiptPayType.map((item) => {
                      return (<Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>);
                    })}
                  </Select>)}
                {renderField(getFieldDecorator, '发生金额（元）', 'receiptPayAmount', <Input disabled />)}
                {renderField(getFieldDecorator, this.state.payWay!==2?'授信起息日':'出票日', 'interestStartDay', <Input disabled />)}
                {renderField(getFieldDecorator, this.state.payWay!==2?'授信到期日':'银票到期日', 'interestEndDay', <Input disabled />)}
              </Row>
              <Row gutter={gutter}>
                <div className="block-title">还款计划</div>
                <Table
                  rowKey="index"
                  size="small"
                  // columns={this.state.interestType === 1 ? this.state.columns : this.state.columns2}
                  columns={this.state.columns}
                  dataSource={timeFormat(this.state.tableData)}
                  pagination={false}
                />
              </Row>
            </Form>
          </Spin>
        </DyPage>
      </DyControl>
    );
  }
}

export default Index;