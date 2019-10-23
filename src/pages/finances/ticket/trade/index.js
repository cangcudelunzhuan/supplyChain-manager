import React, { Component } from 'react';
import { Table, Form } from 'antd';
import { connect } from 'dva';
import { DyPage, DySearch, DyAction, DyControl } from 'dy-components';
import { routerRedux } from 'dva/router';

@connect(({ ticketTrade, loading }) => ({
  ticketTrade,
  tableLoading: loading.effects['ticketTrade/getList'],
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
      type: 'ticketTrade/getList',
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
  detail = (id, type) => {
    this.props.dispatch(
      routerRedux.push(`/finances/ticket/trade/${id}/${type}`)
    );
  }
  render() {
    const { tableData, total, current } = this.state;
    const { tableLoading } = this.props;
    const columns = [{
      title: '经销商',
      dataIndex: 'dealerName',
    }, {
      title: '经销商编号',
      dataIndex: 'dealerNo',
    }, {
      title: '累计收票金额（元）',
      dataIndex: 'totalGoodsAmount',
    }, {
      title: '累计已收票金额（元）',
      dataIndex: 'totalCheckAmount',
    }, {
      title: '累计待开票金额（元）',
      dataIndex: 'totalToBeOpenAmount',
    }, {
      title: '累计已开票金额（元）',
      dataIndex: 'totalOpenAmount',
    }, {
      title: '操作',
      width: 170,
      fixed: 'right',
      render: (record) => {
        return (
          <DyAction
            action={[
              {
                name: '收票录入',
                permission: 1005004001001,
                onClick: () => { this.detail(record.id, 'receive'); },
              }, {
                name: '开票录入',
                permission: 1005004001006,
                onClick: () => { this.detail(record.id, 'open'); },
              },
            ]}
          />
        );
      },
    },
    ];
    const extendBtn = [];
    return (
      <DyControl permission="1005004001" key="control">
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