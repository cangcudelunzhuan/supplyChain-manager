import React, { Component } from 'react';
import { DyPage, DySearch, DyAction, DyControl } from 'dy-components';
import { Table, Form, Button, Input, Select } from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { isContain, formats } from 'src/utils/tools';
import { ticketAuditT, organizationT, fundingT } from 'src/utils/statusReturn';
import { countValid, countAudit } from 'src/utils/statusData';
import moment from 'moment';

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
    searchItem: [
      {
        label: '持牌机构',
        key: 'payeeName',
        render() {
          return <Input placeholder="请输入" />;
        },
      },
      {
        label: '出资机构',
        key: 'payName',
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

  // 分页改变
  onTableChange = (pagination) => {
    this.getTableData({
      current: pagination.current,
    });
  };

  // 到详情进行相关操作
  detail = (id) => {
    this.props.dispatch(routerRedux.push(`/creditManage/license/${id}`));
  };
  // 新增
  add = () => {
    this.props.dispatch(routerRedux.push('/creditManage/license/add'));
  }
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
        dataIndex: 'creditAmountNo',
        render: (data) => {
          return data ? data : '/';
        },
      },
      {
        title: '持牌机构名称',
        dataIndex: 'licenseOrganizationName',
      }, {
        title: '持牌机构编号',
        dataIndex: 'licenseOrganizationNo',
      }, {
        title: '出资机构名称',
        dataIndex: 'fundingOrganizationName',
      },
      isContain(1004001002) ? {} : {
        title: '出资机构类型',
        dataIndex: 'organizationType',
        render: (data) => {
          return organizationT(data);
        },
      },
      isContain(1004001002) ? {} : {
        title: '出资方式',
        dataIndex: 'type',
        render: (data) => {
          return fundingT(data);
        },
      }, {
        title: '授信额度（元）',
        dataIndex: 'creditAmount',
      },
      {
        title: '额度生效日',
        dataIndex: 'effectiveDate',
        render: (date) => {
          return date ? date : '/';
        },
      },
      {
        title: '额度到期日',
        render: (data) => {
          if (data.status === 1) {
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
      },
      isContain(1004001002) ? {
        title: '审核状态',
        dataIndex: 'status',
        /**
        * 状态：1.待审核 2.审核成功 3.审核不通过
        */
        render: (type) => {
          return ticketAuditT(type);
        },
      } : {},
      isContain(1004001002) ? {} : {
        title: '创建时间',
        dataIndex: 'createTime',
      },
      isContain(1004001002) ? {
        title: '操作时间',
        dataIndex: 'updateTime',
      } : {},
      isContain(1004001002) ? {
        title: '备注',
        dataIndex: 'remark',
      } : {}, {
        title: '操作',
        fixed: 'right',
        width: 130,
        render: (data) => {
          switch (data.status) {
          case 1:
            return (
              <DyAction
                action={[{
                  name: '额度审核',
                  permission: 1004001003,
                  onClick: () => this.detail(data.id),
                }, isContain(1004001003) ? '' : {
                  name: '详情',
                  permission: 1004001004,
                  onClick: () => this.detail(data.id),
                }]}
              />
            );
          case 3:
            return (
              <DyAction
                action={[{
                  name: '修改',
                  permission: 1004001002,
                  onClick: () => this.detail(data.id),
                }, isContain(1004001002) ? '' : {
                  name: '详情',
                  permission: 1004001004,
                  onClick: () => this.detail(data.id),
                }]}
              />
            );
          default:
            return (
              <DyAction
                action={[{
                  name: '详情',
                  permission: 1004001004,
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
      <DyControl permission="1004001" key="control">
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
