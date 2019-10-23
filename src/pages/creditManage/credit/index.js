import React, { Component } from 'react';
import { DyPage, DySearch, DyAction, DyControl } from 'dy-components';
import { Table, Form } from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { isContain, formats } from 'src/utils/tools';
import { ticketAuditT, organizationT, fundingT } from 'src/utils/statusReturn';
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
    this.props.dispatch(routerRedux.push(`/creditManage/credit/${id}`));
  };

  render() {
    const { tableData, total, current } = this.state;
    const { tableLoading } = this.props;
    const columns = [
      {
        title: '出资机构名称',
        dataIndex: 'fundingOrganizationName',
      }, {
        title: '出资机构编号',
        dataIndex: 'creditAmountNo',
      }, {
        title: '持牌机构名称',
        dataIndex: 'licenseOrganizationName',
      }, {
        title: '持牌机构编号',
        dataIndex: 'licenseOrganizationNo',
      }, {
        title: '出资机构类型',
        dataIndex: 'organizationType',
        render: (data) => {
          return organizationT(data);
        },
      }, {
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
      }, {
        title: '创建时间',
        dataIndex: 'createTime',
      }, {
        title: '操作',
        fixed: 'right',
        width: 80,
        render: (data) => {
          return (
            <DyAction
              action={[{
                name: '详情',
                permission: 1004001004,
                onClick: () => this.detail(data.id),
              }]}
            />
          );
        },
      },
    ];
    const extendBtn = [];
    return (
      <DyControl permission="1004001" key="control">
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
            scroll={{ x: 1800 }}
            onChange={this.onTableChange}
          />
        </DyPage>
      </DyControl>
    );
  }
}

export default index;
