import React, { Component } from 'react';
import { Table, Form } from 'antd';
import { connect } from 'dva';
import { DyPage, DySearch, DyAction, DyControl } from 'dy-components';
import { routerRedux } from 'dva/router';

@connect(({ ticketLease, loading }) => ({
  ticketLease,
  tableLoading: loading.effects['ticketLease/getList'],
}))
@Form.create()
class Index extends Component {
  state = {
    tableData: [],
    total: 0,
    current: 1,
  }
  componentDidMount() {
    this.getTableData({
      current: 1,
      pageSize: 10,
    });
  }
  // 获取表格数据
  getTableData = (payload) => {
    this.props.dispatch({
      type: 'ticketLease/getList',
      payload,
    }).then((res) => {
      this.setState({
        tableData: res.list,
        total: res.pagination.total,
        current: res.pagination.current,
      });
    });
  }
  // 分页改变
  onTableChange = (pagination) => {
    this.getTableData({
      current: pagination.current,
      pageSize: 10,
    });
  }
  // 查看详情
  detail = (id) => {
    this.props.dispatch(
      routerRedux.push(`/finances/ticket/lease/${id}/leaseDetail`)
    );
  }
  render() {
    const { tableData, total, current } = this.state;
    const { tableLoading } = this.props;
    const columns = [{
      title: '租赁编号',
      dataIndex: 'rentNo',
    }, {
      title: '经销商',
      dataIndex: 'dealerName',
    }, {
      title: '资产类型',
      dataIndex: 'sourceType',
      render: (t) => {
        switch (t) {
        case 1:
          return '采购订单';
        case 2:
          return '质/抵押物清单';
        default:
          break;
        }
      },
    }, {
      title: '累计金融服务费元）',
      dataIndex: 'totalRentFee',
    }, {
      title: '累计待开票金额（元）',
      dataIndex: 'totalToBeOpenAmount',
    }, {
      title: '累计已开票金额（元）',
      dataIndex: 'totalOpenedAmount',
    }, {
      title: '操作',
      width: 130,
      fixed: 'right',
      render: (text, record) => {
        return (
          <DyAction
            action={[
              {
                name: '开票录入',
                permission: 1005004002001,
                onClick: () => { this.detail(record.id); },
              },
            ]}
          />
        );
      },
    },
    ];
    const extendBtn = [];
    return (
      <DyControl permission="1005004002" key="control">
        <DyPage>
          <DySearch
            onSearch={this.search}
            onReset={this.reset}
            extendBtn={extendBtn}
          />
          <Table
            rowKey="id"
            loading={tableLoading}
            columns={columns}
            dataSource={tableData}
            pagination={{
              total,
              current,
            }}
            scroll={{ x: 1300 }}
            onChange={this.onTableChange}
          />
        </DyPage>
      </DyControl>
    );
  }
}

export default Index;