import React, { Component } from 'react';
import { Table, Form, Input, Select } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { DyPage, DySearch, DyAction, DyControl } from 'dy-components';
import {  brokePositionT } from 'src/utils/statusReturn';
import { brokePositionType } from 'src/utils/statusData';
@connect(({ water, loading }) => ({
  water,
  tableLoading: loading.effects['water/getList'],
}))
@Form.create()

class Index extends Component {

    state = {
      tableData: [],
      total: 0,
      searchfilter: null,
      searchItem: [
        {
          label: '融资编号',
          key: 'rentNo',
          render() {
            return <Input placeholder="请输入融资编号" />;
          },
        },
        {
          label: '经销商编号',
          key: 'dealerNo',
          render() {
            return <Input placeholder="请输入经销商编号" />;
          },
        },
        {
          label: '经销商名称',
          key: 'dealerName',
          render() {
            return <Input placeholder="请输入经销商名称" />;
          },
        },
        {
          label: '是否破仓',
          key: 'brokePosition',
          render() {
            return (
              <Select placeholder="请选择" >
                {brokePositionType.map((item) => {
                  return (<Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>);
                })}
              </Select>
            );
          },
        },
      ],
    }
    componentDidMount() {
      this.getTableData({
        currentPage: 1,
      });
    }
    // 搜索
  search = (data) => {
    // const formSearch = this.props.form.getFieldsValue();
    this.getTableData({
      currentPage: 1,
      ...data,
    });
    this.setState({
      searchfilter: data,
    });
  }
  // 重置
  reset = (data) => {
    this.props.form.resetFields();
    this.getTableData({ currentPage: 1 });
    this.setState({
      searchfilter: null,
    });
  }
    // 获取表格数据
    getTableData = async (payload) => {
      let res = await this.props.dispatch({
        type: 'water/getList',
        payload,
      });
      this.setState({
        tableData: res.list,
        total: res.pagination.total,
      });
    }
    // 分页改变
    onTableChange = (pagination) => {
      this.getTableData({
        currentPage: pagination.current,
        ...this.state.searchfilter,
      });
    }

    add = (record) => {
      localStorage.setItem(`waterDealerInfo${record.id}`, JSON.stringify(record));
      this.props.dispatch(
        routerRedux.push(`/risk/water/${record.id}/add`)
      );
    }
    detail= (record) => {
      localStorage.setItem(`waterDealerInfo${record.rentId}`, JSON.stringify(record));
      this.props.dispatch(
        routerRedux.push(`/risk/water/${record.rentId}/detail`)
      );
    }
    render() {
      const { tableData, total } = this.state;
      const { tableLoading } = this.props;
      const columns = [
        {
          title: '序号',
          dataIndex: 'index',
          width: 100,
        },
        {
          title: '融资编号',
          dataIndex: 'rentNo',
          width: 250,
        },
        {
          title: '经销商编号',
          dataIndex: 'dealerNo',
          width: 150,
        }, {
          title: '经销商名称',
          dataIndex: 'dealerName',
          width: 350,
        }, {
          title: '最近一次发生时间',
          dataIndex: 'occurredTime',
          width: 300,
        }, {
          title: '最近一次水位是否破仓',
          dataIndex: 'brokePosition',
          width: 300,
          render: (key)=>{
            return brokePositionT(key);
          },
        }, {
          title: '最近一次更新时间',
          dataIndex: 'updateTime',
          width: 200,
        }, {
          title: '操作',
          width: 130,
          fixed: 'right',
          dataIndex: 'dealerId',
          render: (id, record) => (
            <DyAction
              action={[{
                name: '更新',
                permission: '1007001001',
                onClick: ()=>this.add(record),
              }, {
                name: '详情',
                permission: '1007001004',
                onClick: ()=>this.detail(record),
              }]}
            />
          ),
        },
      ];
      // const extendBtn = [
      //   <DyControl permission="1007001001" key="control">
      //     <Button key="add" onClick={this.add} type="primary">新增</Button>
      //   </DyControl>,
      // ];
      return (
        <DyControl permission="1007001" key="control">
          <DyPage>
            <DySearch
              onSearch={this.search}
              onReset={this.reset}
              // extendBtn = {extendBtn}
              searchItem={this.state.searchItem}
            />
            <Table
              rowKey="id"
              scroll={{ x: '1500px' }}
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