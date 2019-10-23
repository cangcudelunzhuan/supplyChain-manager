import React, { Component } from 'react';
import { Table, Form, Button } from 'antd';
import { connect } from 'dva';
import { DyPage, DySearch, DyAction, DyControl } from 'dy-components';
import { routerRedux } from 'dva/router';
import { isContain } from 'src/utils/tools';
import { shenHeT } from 'src/utils/statusReturn';
import '../index.less';

@connect(({ businesIn, loading }) => ({
  businesIn,
  tableLoading: loading.effects['businesIn/getList'],
}))
@Form.create()
class Index extends Component {
  state = {
    tableData: [],
    total: 0,
    current: 1,
  }
  componentDidMount() {
    this.getTableData({
      current: 1,
      pageSize: 10,
    });
  }
  // 获取表格数据
  getTableData = (payload) => {
    this.props.dispatch({
      type: 'businesIn/getList',
      payload,
    }).then((res) => {
      this.setState({
        tableData: res.list,
        total: res.pagination.total,
        current: res.pagination.current,
      });
    });
  }
  // 新增
  add = () => {
    this.props.dispatch(routerRedux.push('/business/businessIn/add'));
  }
  // 分页改变
  onTableChange = (pagination) => {
    this.getTableData({
      current: pagination.current,
      pageSize: 10,
    });
  }
  detail = (id) => {
    this.props.dispatch(
      routerRedux.push(`/business/businessIn/${id}`)
    );
  }

  render() {
    const { tableData, total, current } = this.state;
    const { tableLoading } = this.props;
    const columns = [{
      title: '年度计划编号',
      dataIndex: 'yearPlanNo',
    }, {
      title: '经销商名称',
      dataIndex: 'dealerName',
    }, {
      title: '审核状态',
      dataIndex: 'status',
      render: (text) => {
        return shenHeT(text);
      },
    }, {
      title: '操作时间',
      dataIndex: 'updateTime',
    }, {
      title: '备注',
      width: 150,
      dataIndex: 'remark',
    }, {
      title: '操作',
      width: 130,
      fixed: 'right',
      render: (text, record) => {
        switch (record.status) {
        case 1:
          return (
            <DyAction
              action={[
                (isContain(1002001004) || isContain(1002001005)) ? '' : {
                  name: '详情',
                  permission: '1002001003',
                  onClick: () => { this.detail(record.id); },
                }, {
                  name: '审核',
                  permission: '1002001004',
                  onClick: () => { this.detail(record.id); },
                }, {
                  name: '修改',
                  permission: '1002001002',
                  onClick: () => { this.detail(record.id); },
                },
              ]}
            />
          );
        case 2:
          return (
            <DyAction
              action={[
                {
                  name: '详情',
                  permission: '1002001003',
                  onClick: () => { this.detail(record.id); },
                },
              ]}
            />
          );
        default:
          return (
            <DyAction
              action={[
                {
                  name: '详情',
                  permission: '1002001003',
                  onClick: () => { this.detail(record.id); },
                },
              ]}
            />
          );
        }
      },
    },
    ];
    const extendBtn = [
      <DyControl permission="1002001001" key="control">
        <Button key="add" onClick={this.add} type="primary">
          新增
        </Button>
      </DyControl>,
    ];
    return (
      <DyControl permission="1002001" key="control">
        <DyPage>
          <DySearch
            onSearch={this.search}
            onReset={this.reset}
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
            onChange={this.onTableChange}
          />
        </DyPage>
      </DyControl>
    );
  }
}

export default Index;