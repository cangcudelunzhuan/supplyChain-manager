import React, { Component } from 'react';
import { DyPage, DySearch, DyAction, DyControl } from 'dy-components';
import { Table, Form } from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { fundingT } from 'src/utils/statusReturn';

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

  // 到详情进行相关操作
  detail = (id) => {
    this.props.dispatch(routerRedux.push(`/creditManage/dealerManage/dealerLimit/${id}`));
  };

  render() {
    const { tableData, total, current } = this.state;
    const { tableLoading } = this.props;
    // dealerId
    // 经销商名称 dealerName
    // 经销商编号 dealerNo
    // 持牌机构 licenseOrganizationName
    // 出资方式 type
    // 融资额度（元）dealerCreditAmount
    // 融资额度生效日 confirmDate
    // 融资额度到期日 expireDate
    // 创建时间 confirmDate
    // 操作
    const columns = [
      {
        title: '经销商名称',
        dataIndex: 'dealerName',
        render: (data) => {
          return data ? data : '/';
        },
      },
      {
        title: '经销商编号',
        dataIndex: 'dealerNo',
        render: (data) => {
          return data ? data : '/';
        },
      },
      {
        title: '持牌机构',
        dataIndex: 'licenseOrganizationName',
        render: (data) => {
          return data ? data : '/';
        },
      },
      {
        title: '出资方式',
        dataIndex: 'type',
        render: (type) => {
          return fundingT(type);
        },
      },
      {
        title: '固定额度（元）',
        dataIndex: 'fixCount14',
        render: (data) => {
          return data ? data : '/';
        },
      },
      {
        title: '固定额度期限',
        dataIndex: 'fixCountDate14',
        render: (data) => {
          return data ? data : '/';
        },
      },
      {
        title: '临时额度（元）',
        dataIndex: 'someCount14',
        render: (data) => {
          return data ? data : '/';
        },
      },
      {
        title: '临时额度期限',
        dataIndex: 'some14',
        render: (data) => {
          return data ? data : '/';
        },
      },
      {
        title: '创建时间',
        dataIndex: 'confirmDate',
      },
      {
        title: '生效状态',
        dataIndex: 'valueStatus14',
      },
      {
        title: '操作时间',
        dataIndex: 'dealTime14',
      },
      {
        title: '操作',
        fixed: 'right',
        width: 130,
        render: (data) => {
          return (
            <DyAction
              action={[{
                name: '详情',
                permission: 1004002002001,
                onClick: () => this.detail(data.id),
              }, data.status === 5 && !data.licenseOrganizationId ? {
                name: '关联',
                permission: 1004002002002,
                onClick: () => this.detail(data.id),
              } : '']}
            />
          );
        },
      },
    ];
    const extendBtn = [];
    return (
      <DyControl permission="1004002002" key="control">
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
            scroll={{ x: 1700 }}
            onChange={this.onTableChange}
          />
        </DyPage>
      </DyControl>
    );
  }
}

export default index;
