import React, { Component } from 'react';
import { Form, Input, Row, Button, Spin, Select, Table } from 'antd';
import { DyPage } from 'dy-components';
import { connect } from 'dva';
import { isContain, goBack } from 'src/utils/tools';
import {  receiptPayType } from 'src/utils/statusData';
import { formItemLayout, renderField, gutter } from 'src/utils/gridInit';
@connect(({ fee, loading }) => ({
  fee,
  detailLoading: loading.effects['fee/detail'],
}))
@Form.create()
class Index extends Component {
  state = {
    status: true,
    type: null,
    columns: [
      {
        title: '年度计划编号',
        dataIndex: 'yearPlanNo',
      },
      {
        title: '年度计划名称',
        dataIndex: 'yearPlanName',
      },
      {
        title: '年度计划金额（元）',
        dataIndex: 'amount',
      },
      {
        title: '服务费率',
        dataIndex: 'serviceRate',
      },
      {
        title: '文衍分成比例',
        dataIndex: 'wenyanRatio',
      },
      {
        title: '上月最大已用额度（元）',
        dataIndex: 'lastMonthAmount',
      },
      {
        title: '天猫收取金额（元）',
        dataIndex: 'platAmount',
      },
      {
        title: '文衍收取金额（元）',
        dataIndex: 'wenyanAmount',
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
    let res = await this.props.dispatch({
      type: 'fee/detail',
      payload: { id },
    });
    let formKey = this.props.form.getFieldsValue();
    for (let key in formKey) {
      formKey[key] = res.data[key];
    }
    this.props.form.setFieldsValue({
      ...formKey,
    });
    if (res.data.list) {
      this.setState({
        tableData: res.data.list,
      });
    }
  }

  render() {
    const { detailLoading } = this.props;
    const { getFieldDecorator } = this.props.form;
    let actionlist = [<Button key="back" onClick={(e)=>goBack(e, this)}>返回</Button>];
    switch (this.state.type) {
    case 1:
      {
        isContain('1005002001') &&
          actionlist.push(<Button key="audit" type="primary" onClick={this.openModal}>审核</Button>);
      }
      break;
    default:
      break;
    }
    return (
      <DyPage
        className="user-manage-detail"
        breadcrumb={[{
          name: '财务管理',
        }, {
          name: '服务费管理',
          href: '/finances/fee',
        }, {
          name: '服务费详情',
        }]}
        action={
          actionlist
        }
      >
        <Spin spinning={detailLoading}>
          <Form {...formItemLayout}>
            <Row gutter={gutter}>
              <div className="block-title">服务费信息</div>
              {renderField(getFieldDecorator, '收款编号', 'serviceFeeNo', <Input disabled />)}
              {renderField(getFieldDecorator, '付款公司名称', 'payCompany', <Input disabled />)}
              {renderField(getFieldDecorator, '收款公司名称', 'receiveCompany', <Input disabled />)}
              {renderField(getFieldDecorator, '资金类型', 'serviceType',
                <Select placeholder="请选择资金类型" disabled>
                  { receiptPayType.map((item) => {
                    return (<Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>);
                  })}
                </Select>)}
              {renderField(getFieldDecorator, '发生金额（元）', 'wenyanAmount', <Input disabled />)}
              {renderField(getFieldDecorator, '时间', 'time', <Input disabled />)}
            </Row >
            <Row gutter={gutter}>
              <div className="block-title">明细</div>
              <Table
                rowKey="id"
                size="small"
                columns={this.state.columns}
                dataSource={this.state.tableData}
                pagination={false}
              />
            </Row>
          </Form>
        </Spin>
      </DyPage>
    );
  }
}

export default Index;