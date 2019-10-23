import React, { Component } from 'react';
import { DyPage, DySearch, DyAction,  DyControl } from 'dy-components';
import { Table, Form } from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
@connect(({ fee, loading  }) => ({
  fee,
  tableLoading: loading.effects['fee/list'],
}))
@Form.create()
class index extends Component {
    state = {
      tableData: [],
      total: 0,
      current: 1,
    }
    componentDidMount() {
      this.getTableData({
        currentPage: 1,
      });
    }
    // 获取表格数据
    getTableData = (payload) => {
      this.props.dispatch({
        type: 'fee/list',
        payload,
      }).then((res) => {
        this.setState({
          tableData: res.data,
        //   total: res.pagination.total,
        //   current: res.pagination.current,
        });
      });
    }
    // 分页改变
    onTableChange = (pagination) => {
      this.getTableData({
        currentPage: pagination.current,
      });
    }
    // 审核
    detail = (id) => {
      this.props.dispatch(routerRedux.push(`/finances/fee/${id}`));
    }
    render() {
      const { tableData, selectedRowKeys  } = this.state;
      const { tableLoading } = this.props;
      const columns = [
        {
          title: '收款编号',
          dataIndex: 'serviceFeeNo',
        }, {
          title: '收款方',
          dataIndex: 'receiveCompany',
        }, {
          title: '付款方',
          dataIndex: 'payCompany',
        }, {
          title: '发生金额（元）',
          dataIndex: 'wenyanAmount',
        }, {
          title: '时间',
          dataIndex: 'time',
        }, {
          title: '操作',
          width: 150,
          fixed: 'right',
          render: (text, record) => {
            return (
              <DyAction
                action={[
                  {
                    name: '详情',
                    permission: '1005003001',
                    onClick: ()=>{ this.detail(record.id) ; },
                  }]}
              />
            );
          },
        },
      ];
      return (
        <DyControl permission="1005003" key="control">
          <DyPage>
            <DySearch
              onSearch={this.search}
              onReset={this.reset}
              selectedRowKeys={selectedRowKeys}
            />
            <Table
              rowKey="id"
              loading={tableLoading}
              columns={columns}
              dataSource={tableData}
              pagination = {false}
              //   pagination={{
              //     total,
              //     current,
              //   }}
            //   scroll={{ x: '110%' }}
            //   onChange={this.onTableChange}
            />
          </DyPage>
        </DyControl>
      );
    }
}
export default index;