import React, { Component } from 'react';
import { Table, Form } from 'antd';
import { Link } from 'dva/router';
import { connect } from 'dva';

@connect(({ business_l, loading }) => ({
  business_l,
  tableLoading: loading.effects['business_l/getBusiList'],
}))
@Form.create()
class index extends Component {
  state = {
    tableData: [],
    total: 0,
    current: 1,
  };
  componentDidMount() {
    this.getTableData({
      current: 1,
    });
  }
  getTableData = (payload) => {
    this.props.dispatch({
      type: 'business_l/getBusiList',
      payload,
    }).then((res) => {
      this.setState({
        tableData: res.list,
        total: res.pagination.total,
        current: res.pagination.current,
      });
    });
  };
  onTableChange = (pagination) => {
    this.getTableData({
      current: pagination.current,
    });
  };
  render() {
    const { tableData, total, current } = this.state;
    const { tableLoading } = this.props;
    const columns = [
      {
        title: '额度编号',
        dataIndex: 'licenseOrganizationNo',
      }, {
        title: '授信额度(元)',
        dataIndex: 'creditAmount',
      }, {
        title: '额度生效日',
        dataIndex: 'effectiveDate',
      }, {
        title: '额度到期日',
        dataIndex: 'expireDate',
      }, {
        title: '失效时间',
        dataIndex: 'g',
      }, {
        title: '操作',
        render: (data) => {
          return (
            <Link to={`/creditManage/credit/${data.id}`}>详情</Link>
          );
        },
      },
    ];
    return (
      <div>
        <div className="block-title">历史纪录</div>
        <Table
          rowKey="id"
          loading={tableLoading}
          columns={columns}
          dataSource={tableData}
          pagination={{
            total,
            current,
          }}
          size={'small'}
          onChange={this.onTableChange}
        />
      </div>

    );
  }
}

export default index;
