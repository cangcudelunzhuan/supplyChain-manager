import React, { Component } from 'react';
import { DyPage, DySearch, DyAction, DyControl } from 'dy-components';
import { Table, Form, Select, Input } from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { isContain } from 'src/utils/tools';
import { businessS, dealerT } from 'src/utils/statusReturn';
import { countValid, countAudit, countPlainType } from 'src/utils/statusData';
import moment from 'moment';

@connect(({ business, loading }) => ({
  business,
  tableLoading: loading.effects['business/getBusiList'],
}))
@Form.create()
class index extends Component {
  state = {
    tableData: [],
    total: 0,
    current: 1,
    searchItem: [
      {
        label: '经销商名称',
        key: 'payeeName',
        render() {
          return <Input placeholder="请输入" />;
        },
      },
      {
        label: '类型',
        key: 'plainType',
        render() {
          return (
            <Select placeholder="请选择" >
              {countPlainType.map((item) => {
                return (<Select.Option value={item.value} key={item.value}>{item.label}</Select.Option>);
              })}
            </Select>
          );
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
      type: 'business/getBusiList',
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

  // 到详情进行相关操作
  detail = (id) => {
    this.props.dispatch(routerRedux.push(`/creditManage/dealerManage/business/${id}`));
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
        title: '计划额度编号',
        dataIndex: 'financeCreditNo',
        render: (data) => {
          return data ? data : '/';
        },
      },
      {
        title: '计划编号',
        dataIndex: 'yearPlanNo',
      }, {
        title: '类型',
        dataIndex: 'types',
      }, {
        title: '经销商名称',
        dataIndex: 'dealerName',
      }, {
        title: '经销商编号',
        dataIndex: 'dealerNo',
        render: (id) => {
          return (
            <span>{id}</span>
          );
        },
      }, {
        title: '计划额度',
        dataIndex: 'financeCreditAmount',
        render: (data) => {
          return data ? data : '/';
        },
      },
      {
        title: '额度生效日',
        dataIndex: 'confirmDate',
      },
      {
        title: '额度到期日',
        render: (data) => {
          if (data.status === 4) {
            return '/';
          } else {
            if (data.expireDate) {
              return (
                <span
                  style={{ color: moment().isBefore(moment(data.expireDate).subtract(7, 'day')) ? '' : 'red' }}>{data.expireDate}</span>
              );
            } else {
              return '无限期';
            }
          }
        },
      }, {
        title: '业务状态',
        dataIndex: 'businessStatus',

        render: (type) => {
          return businessS(type);
        },
      }, {
        title: '审核状态',
        dataIndex: 'status',
        render: (type) => {
          return dealerT(type);
        },
      }, {
        title: '操作时间',
        dataIndex: 'updateTime',
      }, {
        title: '操作',
        fixed: 'right',
        width: 130,
        render: (data) => {
          switch (data.status) {
          case 4:
            return (
              <DyAction
                action={[{
                  name: '额度申请',
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
                  name: '额度审核',
                  permission: 1004002001002,
                  onClick: () => this.detail(data.id),
                }, isContain(1004002001002) ? '' : {
                  name: '详情',
                  permission: 1004002001005,
                  onClick: () => this.detail(data.id),
                }]}
              />
            );
          case 2:
            return (
              <DyAction
                action={[{
                  name: '额度确认',
                  permission: 1004002001003,
                  onClick: () => this.detail(data.id),
                }, isContain(1004002001003) ? '' : {
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
    const extendBtn = [];
    return (
      <DyControl permission="1004002001" key="control">
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
            scroll={{ x: 1800 }}
            onChange={this.onTableChange}
          />
        </DyPage>
      </DyControl>
    );
  }
}

export default index;
