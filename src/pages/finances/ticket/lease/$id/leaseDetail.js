import React, { Component } from 'react';
import { Form, Input, Row, Button, Table } from 'antd';
import { DyPage, DyControl } from 'dy-components';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { isContain, timeFormat, goBack } from 'src/utils/tools';
import { financeTicketT } from 'src/utils/statusReturn';
import '../../../index.less';
import { formItemLayout, renderField, gutter } from 'src/utils/gridInit';

@connect(({ ticketLease, loading }) => ({
  ticketLease,
  tableLoading: loading.effects['ticketLease/getDetail'],
}))
@Form.create()
class Index extends Component {
  state = {
    tableData: [],
  }
  componentDidMount() {
    this.getDetail();
  }
  // 获取详情
  getDetail = async () => {
    let id = this.props.match.params.id;
    let res = await this.props.dispatch({
      type: 'ticketLease/getDetail',
      payload: { id },
    });
    let formKey = this.props.form.getFieldsValue();
    for (let key in formKey) {
      formKey[key] = res.data[key];
    }
    this.props.form.setFieldsValue({
      ...formKey, sourceType: res.data.sourceType === 1 ? '采购订单' : '质/抵押物清单',
    });
    this.setState({
      tableData: timeFormat(res.data.rentBillStageListVoList),
    });
  }
  // 开票 审核 查看详情
  actions = (ids, actionType, maxValue) => {
    let id = this.props.match.params.id;
    this.props.dispatch(
      routerRedux.push(`/finances/ticket/lease/${id}/${ids}?actionType=${actionType}&&maxValue=${maxValue}`)
    );
  }

  render() {
    const { tableData } = this.state;
    const { tableLoading } = this.props;
    let action = [<Button key="back" onClick={(e)=>goBack(e, this)}>返回</Button>];
    const columns = [{
      title: '付费日',
      dataIndex: 'payDate',
    }, {
      title: '金融服务费（元）',
      dataIndex: 'rentFee',
    }, {
      title: '待开票金额（元）',
      dataIndex: 'toBeOpenAmount',
    }, {
      title: '已开票金额（元）',
      dataIndex: 'openedAmount',
    }, {
      title: '状态',
      dataIndex: 'status',
      render: (data) => {
        return financeTicketT(data);
      },
    }, {
      title: '操作',
      width: 160,
      render: (record) => {
        return (
          <div className="ticket-btn">
            {isContain(1005004002002) && record.openedAmount !== '0' && <a size="small" onClick={() => this.actions(record.id, 'detail')} type="primary">查看</a>}
            {isContain(1005004002004) && record.status === 3 && <a size="small" onClick={() => this.actions(record.id, 'check')} type="primary">审核</a>}
            {isContain(1005004002003) && record.status === 1 && record.toBeOpenAmount !== '0' && <a size="small" onClick={() => this.actions(record.id, 'add', record.toBeOpenAmount)} type="primary">上传发票</a>}
          </div>
        );
      },
    },
    ];
    const { getFieldDecorator } = this.props.form;
    return (
      <DyControl permission="1005004002001" key="control">
        <DyPage
          className="user-manage-detail"
          breadcrumb={[{
            name: '财务管理',
          }, {
            name: '票务管理',
          }, {
            name: '金融服务费票据',
            href: '/finances/ticket/lease',
          }, {
            name: '金融服务费票据详情',
          }]}
          action={action}
        >
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Row gutter={gutter}>
              <div className="block-title">开票录入</div>
              {renderField(getFieldDecorator, '租赁编号', 'rentNo', <Input disabled />)}
              {renderField(getFieldDecorator, '经销商', 'dealerName', <Input disabled />)}
              {renderField(getFieldDecorator, '资产类型', 'sourceType', <Input disabled />)}
              {renderField(getFieldDecorator, '订单总货值（元）', 'totalGoodsValue', <Input disabled />)}
              {renderField(getFieldDecorator, '累计金融服务费（元）', 'totalRentFee', <Input disabled />)}
              {renderField(getFieldDecorator, '累计待开票金额（元）', 'totalToBeOpenAmount', <Input disabled />)}
              {renderField(getFieldDecorator, '累计已开票金额（元）', 'totalOpenedAmount', <Input disabled />)}
            </Row>
            <Row gutter={gutter}>
              <div className="block-title">该笔租赁对应的票据</div>
              <Table
                rowKey="id"
                size="small"
                loading={tableLoading}
                columns={columns}
                dataSource={tableData}
                onChange={this.onTableChange}
                pagination={false}
              />
            </Row>
          </Form>
        </DyPage>
      </DyControl>
    );
  }
}

export default Index;