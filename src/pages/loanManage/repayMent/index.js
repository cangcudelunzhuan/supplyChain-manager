import React, { Component } from 'react';
import { Table, Form, Tag } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { DyPage, DySearch, DyAction, DyControl } from 'dy-components';
import { repaymentS, organizationT, interestT, sourceT, moneyT } from 'src/utils/statusReturn';
import '../index.less';

@connect(({ repay, loading }) => ({
  repay,
  tableLoading: loading.effects['repay/getList'],
}))
@Form.create()

class Index extends Component {

  state = {
    tableData: [],
    total: 0,
  }
  componentDidMount() {
    this.getTableData({
      currentPage: 1,
    });
  }
  // 获取表格数据
  getTableData = (payload) => {
    this.props.dispatch({
      type: 'repay/getList',
      payload,
    }).then((res) => {
      this.setState({
        tableData: res.list,
        total: res.pagination.total,
      });
    });
  }
  // 分页改变
  onTableChange = (pagination) => {
    this.getTableData({
      currentPage: pagination.current,
    });
  }

  detail = (id) => {
    this.props.dispatch(
      routerRedux.push(`/loanManage/repayMent/${id}`)
    );
  }
  render() {
    const { tableData, total } = this.state;
    const { tableLoading } = this.props;
    const columns = [
      {
        title: '融资编号',
        dataIndex: 'rentNo',
        width: 250,
      }, {
        title: '出资机构名称',
        dataIndex: 'fundingOrganizationName',
        width: 350,
      }, {
        title: '持牌机构',
        dataIndex: 'licenseOrganizationName',
        width: 300,
      }, {
        title: '还款金额（元）',
        dataIndex: 'tradeAmount',
        width: 200,
      }, {
        title: '实际授信利率（%）',
        dataIndex: 'rentRate',
        width: 200,
        render: (text) => {
          return text===0?'/':text;
        },
      }, {
        title: '还款到期日',
        dataIndex: 'expireDate',
        width: 200,
      },
      {
        title: '资产类型',
        dataIndex: 'sourceType',
        width: 150,
        render: (text) => {
          return sourceT(text);
        },
      },
      {
        title: '支付方式',
        dataIndex: 'payWay',
        width: 150,
        render: (text) => {
          return moneyT(text);
        },
      },
      {
        title: '出资机构类型',
        dataIndex: 'organizationType',
        width: 150,
        render: (text) => {
          return organizationT(text);
        },
      }, {
        title: '计息方式',
        dataIndex: 'interestType',
        width: 250,
        render: (text) => {
          return interestT(text);
        },
      }, {
        title: '还款状态',
        dataIndex: 'status',
        width: 100,
        render: (data) => {
          return repaymentS(data);
        },
      }, {
        title: '操作时间',
        dataIndex: 'updateTime',
        width: 250,
      }, {
        title: '操作',
        width: 130,
        fixed: 'right',
        dataIndex: 'id',
        render: (id) => (
          <DyAction
            action={[{
              name: '详情',
              permission: '1006001001',
              onClick: () => this.detail(id),
            }]}
          />
        ),
      },
    ];
    return (
      <DyControl permission="1006001" key="control">
        <DyPage>
          <DySearch
            onSearch={this.search}
            onReset={this.reset}
          />
          <Table
            rowKey="id"
            scroll={{ x: '2350px' }}
            loading={tableLoading}
            columns={columns}
            dataSource={tableData}
            pagination={{
              total,
            }}
            onChange={this.onTableChange}
          />

        </DyPage>
      </DyControl>
    );
  }
}

export default Index;