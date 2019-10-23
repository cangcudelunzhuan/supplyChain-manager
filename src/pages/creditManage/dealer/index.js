import React, { Component } from 'react';
import { DyPage, DySearch, DyAction, DyControl } from 'dy-components';
import { Table, Form, Input, Select, Button } from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { isContain } from 'src/utils/tools';
import { shenHeT, stateT } from 'src/utils/statusReturn';
import { countValid, countAudit } from 'src/utils/statusData';
@connect(({ dealerLimit, loading }) => ({
  dealerLimit,
  tableLoading: loading.effects['dealerLimit/getDealerLimitList'],
}))
@Form.create()
class index extends Component {
  state = {
    tableData: [],
    total: 0,
    current: 1,
    searchItem: [
      {
        label: '持牌机构',
        key: 'payeeName',
        render() {
          return <Input placeholder="请输入" />;
        },
      },
      {
        label: '生效状态',
        key: 'receiptPayType',
        render() {
          return (
            <Select placeholder="请选择" >
              {countValid.map((item) => {
                return (<Select.Option value={item.value} key={item.value}>{item.label}</Select.Option>);
              })}
            </Select>
          );
        },
      },
      {
        label: '审核状态',
        key: 'status',
        render() {
          return (
            <Select placeholder="请选择" >
              {countAudit.map((item) => {
                return (<Select.Option value={item.value} key={item.value}>{item.label}</Select.Option>);
              })}
            </Select>
          );
        },
      },
    ],
  };

  componentDidMount() {
    this.getTableData({
      current: 1,
    });
  }

  // 获取表格数据
  getTableData = (payload) => {
    this.props.dispatch({
      type: 'dealerLimit/getDealerLimitList',
      payload,
    }).then((res) => {
      this.setState({
        tableData: res.list,
        total: res.pagination.total,
        current: res.pagination.current,
      });
    });
  };

  // 分页改变
  onTableChange = (pagination) => {
    this.getTableData({
      current: pagination.current,
    });
  };
  // 新增
  add = () => {
    this.props.dispatch(routerRedux.push('/creditManage/dealer/add'));
  }
  // 到详情进行相关操作
  detail = (id) => {
    this.props.dispatch(routerRedux.push(`/creditManage/dealer/${id}`));
  };
  search = (data) => {
    this.getTableData({
      currentPage: 1,
      ...data,
    });
  }
  // 重置
  reset = () => {
    this.props.form.resetFields();
    this.getTableData({ current: 1 });
  }
  render() {
    const { tableData, total, current } = this.state;
    const { tableLoading } = this.props;
    const columns = [
      {
        title: '额度编号',
        dataIndex: 'dealerName',
        render: (data) => {
          return data ? data : '/';
        },
      },
      {
        title: '持牌机构编号',
        dataIndex: 'dealerNo',
        render: (data) => {
          return data ? data : '/';
        },
      },
      {
        title: '持牌机构名称',
        dataIndex: 'licenseOrganizationName',
        render: (data) => {
          return data ? data : '/';
        },
      },
      {
        title: '额度（元）',
        dataIndex: 'fixCount14',
        render: (data) => {
          return data ? data : '/';
        },
      },
      {
        title: '生效状态',
        dataIndex: 'type',
        render: (type) => {
          return stateT(type);
        },
      },

      {
        title: '审核状态',
        dataIndex: 'fixCountDate14',
        render: (data) => {
          return shenHeT(data);
        },
      },
      {
        title: '操作时间',
        dataIndex: 'dealTime14',
      },
      {
        title: '备注',
        dataIndex: 'remarks',
      },
      {
        title: '操作',
        fixed: 'right',
        width: 130,
        render: (data) => {
          switch (data.status) {
          case 4:
            return (
              <DyAction
                action={[{
                  name: '调整',
                  permission: 1004002001001,
                  onClick: () => this.detail(data.id),
                }, isContain(1004002001001) ? '' : {
                  name: '详情',
                  permission: 1004002001005,
                  onClick: () => this.detail(data.id),
                }]}
              />
            );
          case 1:
            return (
              <DyAction
                action={[{
                  name: '审核',
                  permission: 1004002001002,
                  onClick: () => this.detail(data.id),
                }, isContain(1004002001002) ? '' : {
                  name: '详情',
                  permission: 1004002001005,
                  onClick: () => this.detail(data.id),
                }]}
              />
            );
          case 3:
            return (
              <DyAction
                action={[{
                  name: '修改',
                  permission: 1004002001004,
                  onClick: () => this.detail(data.id),
                }, isContain(1004002001004) ? '' : {
                  name: '详情',
                  permission: 1004002001005,
                  onClick: () => this.detail(data.id),
                }]}
              />
            );
          default:
            return (
              <DyAction
                action={[{
                  name: '详情',
                  permission: 1004002001005,
                  onClick: () => this.detail(data.id),
                }]}
              />
            );
          }
        },
      },
    ];
    const extendBtn = [
      <DyControl permission="1004001001" key="control">
        <Button key="add" onClick={this.add} type="primary">新增</Button>
      </DyControl>,
    ];
    return (
      <DyControl permission="1004002002" key="control">
        <DyPage>
          <DySearch
            extendBtn={extendBtn}
            onSearch={this.search}
            onReset={this.reset}
            searchItem={this.state.searchItem}
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
            onChange={this.onTableChange}
          />
        </DyPage>
      </DyControl>
    );
  }
}

export default index;
