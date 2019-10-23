import React, { Component } from 'react';
import { Form, Input, Row, Button, Spin, Select, Table, Radio } from 'antd';
import { DyPage, DyControl } from 'dy-components';
import { connect } from 'dva';
import { payType, investmentType, limitUnitData, moneyType, propertyType, receiptPayType } from 'src/utils/statusData';
import Log from '../components/log';
import { timeFormat, goBack } from 'src/utils/tools';
import { formItemLayout, renderField, gutter } from 'src/utils/gridInit';

@connect(({ redeem, loading }) => ({
  redeem,
  detailLoading: loading.effects['redeem/getDetail'],
}))
@Form.create()
class Index extends Component {
  state = {
    status: null,
    type: null,
    payDateType: null,
    auditLogList: [],
    tableData: [],
    sourceType: 1,
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
        title: '赎回总费用（元）',
        dataIndex: 'amount',
      },
      {
        title: '付息日',
        dataIndex: 'payDate',
      },
      {
        title: '赎回状态',
        dataIndex: 'redeemStatus',
        render: (key) => {
          switch (key) {
          case 1:
            return '已赎回';
          case 2:
            return '未赎回';
          default:
            break;
          }
        },
      },
      {
        title: '赎回日期',
        dataIndex: 'redeemDate',
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
      type: 'redeem/getDetail',
      payload: { id },
    });
    let res = {
      ...response.orderInfoVo,
      ...response.rentInfoVo,
    };
    res.repaymentPlanList = response.repaymentPlanList;
    res.auditLogList = response.auditLogList;
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
      payDateType: res.payDateType,
      sourceType: res.sourceType,
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
    const { detailLoading } = this.props;
    let actionlist = [<Button key="back" onClick={(e)=>goBack(e, this)}>返回</Button>];
    const { getFieldDecorator } = this.props.form;
    return (
      <DyControl permission="1006002001" key="control">
        <DyPage
          className="user-manage-detail"
          breadcrumb={[{
            name: '租后管理',
          }, {
            name: '赎回管理',
            href: '/loanManage/redeem',
          }, {
            name: '赎回详情',
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
                <div className="block-title">融资信息</div>
                {renderField(getFieldDecorator, '融资编号', 'rentNo', <Input disabled />)}
                {renderField(getFieldDecorator, '出资方式', 'fundingType',
                  <Select placeholder="请选择出资方式" disabled>
                    {investmentType.map((item) => {
                      return (<Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>);
                    })}
                  </Select>
                )}
                {renderField(getFieldDecorator, '融资金额(元)', 'tradeAmount', <Input disabled />)}
                {renderField(getFieldDecorator, '计费方式', 'payType',
                  <Select placeholder="请选择计费方式" disabled>
                    {payType.map((item) => {
                      return (<Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>);
                    })}
                  </Select>
                )}
                {renderField(getFieldDecorator, '付费日期类型', 'payDateType',
                  <Radio.Group disabled>
                    <Radio value={1}>固定</Radio>
                    <Radio value={2}>非固定</Radio>
                  </Radio.Group>)}
                {this.state.payDateType === 1&&this.state.payWay!==2 && (renderField(getFieldDecorator, '固定付费日', 'payDay', <Input disabled />))}
                {renderField(getFieldDecorator, '融资期限', 'rentDays', <Input disabled />)}
                {renderField(getFieldDecorator, '期限单位', 'limitUnit', <Select placeholder="请选择资金类型" disabled>
                  {limitUnitData.map((item) => {
                    return (<Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>);
                  })}
                </Select>
                )}
                {this.state.payWay!==2&&(renderField(getFieldDecorator, '金融服务费率(%)', 'rentRate', <Input disabled />))}
                {renderField(getFieldDecorator, '融资意图', 'intention', <Input disabled />)}
                {renderField(getFieldDecorator, '融资起息日', 'xxxxxxx', <Input disabled />)}
                {renderField(getFieldDecorator, '融资到期日', 'expireDate', <Input disabled />)}
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
                {renderField(getFieldDecorator, this.state.payWay!==2?'融资起息日':'出票日', 'interestStartDay', <Input disabled />)}
                {renderField(getFieldDecorator, this.state.payWay!==2?'融资到期日':'银票到期日', 'interestEndDay', <Input disabled />)}
              </Row>
              <Row gutter={gutter}>
                <div className="block-title">赎回计划</div>
                <Table
                  rowKey="index"
                  size="small"
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