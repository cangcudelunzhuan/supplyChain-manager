import React, { Component } from 'react';
import { DyPage, DyAction, DyControl, DySearch } from 'dy-components';
import { Table, Form, Button } from 'antd';
import { isContain } from 'src/utils/tools';
import { ticketAuditT } from 'src/utils/statusReturn';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
@connect(({ account_d, loading }) => ({
  account_d,
  tableLoading: loading.effects['account_d/getList'],
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
      current: 1,
    });
  }
  // 获取表格数据
  getTableData = (payload) => {
    this.props.dispatch({
      type: 'account_d/getList',
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
    });
  }

  // 查看详情
  detail = (id) => {
    this.props.dispatch(routerRedux.push(`/finances/account/distributor/${id}`));
  }
  // 新增账户
  addAccount = () => {
    this.props.dispatch(routerRedux.push('/finances/account/distributor/add'));
  }
  render() {
    const { tableData, total, current } = this.state;
    const { tableLoading } = this.props;
    const columns = [
      {
        title: '账户编号',
        dataIndex: 'dealerAccountNo',
      }, {
        title: '经销商名称',
        dataIndex: 'dealerName',
      },
      {
        title: '出资机构',
        dataIndex: 'fundingOrganizationName',
      },
      {
        title: '账户类型',
        dataIndex: 'accountType',
        render: (type) => {
          switch (type) {
          case 1:
            return '监管账户';
          case 2:
            return '收票人账户';
          default:
            break;
          }
        },
      },
      {
        title: '银行开户行',
        dataIndex: 'bankBranchName',
      }, {
        title: '账号',
        dataIndex: 'bankCardNo',
      }, {
        title: '审核状态',
        dataIndex: 'status',
        render: (status) => {
          return ticketAuditT(status);
        },
      },
      {
        title: '操作时间',
        dataIndex: 'updateTime',
      }, {
        title: '操作',
        width: 130,
        fixed: 'right',
        render: (data) => {
          switch (data.status) {
          case 1:
            return (
              <DyAction
                action={[{
                  name: '审核',
                  permission: 1005001001004,
                  onClick: () => this.detail(data.id),
                }, isContain(1005001001004) ? '' : {
                  name: '详情',
                  permission: 1005001001003,
                  onClick: () => this.detail(data.id),
                }]}
              />
            );
          case 3:
            return (
              <DyAction
                action={[{
                  name: '修改',
                  permission: 1005001001002,
                  onClick: () => this.detail(data.id),
                }, isContain(1005001001002) ? '' : {
                  name: '详情',
                  permission: 1005001001003,
                  onClick: () => this.detail(data.id),
                }]}
              />
            );
          default:
            return (
              <DyAction
                action={[{
                  name: '详情',
                  permission: 1005001001003,
                  onClick: () => this.detail(data.id),
                }]}
              />
            );
          }
        },
      },
    ];
    const extendBtn = [
      <DyControl permission="1005001001001" key="control">
        <Button type="primary" onClick={this.addAccount}>
          新增
        </Button>
      </DyControl>,
    ];
    return (
      <DyControl permission="1005001001" key="control">
        <DyPage>
          <DySearch
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
            scroll={{ x: 1500 }}
            onChange={this.onTableChange}
          />
        </DyPage>
      </DyControl>
    );
  }
}
export default index;