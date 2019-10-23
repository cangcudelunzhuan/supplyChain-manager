import React, { Component } from 'react';
import { Table, Form, Tag } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { DyPage, DySearch, DyAction, DyControl } from 'dy-components';
import { redeemS, payT, fundingT, sourceT, moneyT } from 'src/utils/statusReturn';
import '../index.less';

@connect(({ redeem, loading }) => ({
  redeem,
  tableLoading: loading.effects['redeem/getList'],
}))
@Form.create()

class Index extends Component {

  state = {
    tableData: [],
    total: 0,
  }
  componentDidMount() {
    this.getTableData({
      current: 1,
    });
  }
  // 获取表格数据
  getTableData = (payload) => {
    this.props.dispatch({
      type: 'redeem/getList',
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
      current: pagination.current,
    });
  }

  detail = (id) => {
    this.props.dispatch(
      routerRedux.push(`/loanManage/redeem/${id}`)
    );
  }
  render() {
    const { tableData, total } = this.state;
    const { tableLoading } = this.props;
    const columns = [
      {
        title: '融资编号',
        dataIndex: 'rentNo',
        width: 200,
      }, {
        title: '经销商名称',
        dataIndex: 'dealerName',
        width: 250,
      }, {
        title: '持牌机构',
        dataIndex: 'licenseOrganizationName',
        width: 250,
      }, {
        title: '融资金额（元）',
        dataIndex: 'tradeAmount',
        width: 200,
      }, {
        title: '金融服务费率（%）',
        dataIndex: 'rentRate',
        width: 200,
        render: (text) => {
          return text===0?'/':text;
        },
      }, {
        title: '融资到期日',
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
        title: '出资方式',
        dataIndex: 'fundingType',
        width: 200,
        render: (text) => {
          return fundingT(text);
        },
      }, {
        title: '计费方式',
        dataIndex: 'payType',
        width: 200,
        render: (text) => {
          return payT(text);
        },
      }, {
        title: '赎回状态',
        dataIndex: 'status',
        width: 150,
        render: (data) => {
          return redeemS(data);
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
              permission: '1006002001',
              onClick: () => this.detail(id),
            }]}
          />
        ),
      },
    ];
    return (
      <DyControl permission="1006002" key="control">
        <DyPage>
          <DySearch
            onSearch={this.search}
            onReset={this.reset}
          />
          <Table
            rowKey="id"
            scroll={{ x: '2200px' }}
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