import React, { Component, Fragment } from 'react';
import { Table, Form, Button, Modal, message } from 'antd';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { DyPage, DySearch, DyAction, DyControl } from 'dy-components';
import {  shenHeT, riskT, stateT } from 'src/utils/statusReturn';
import {  getAction, getRiskAction } from 'src/utils/actionReturn';
const confirm = Modal.confirm;
@connect(({ factor, loading }) => ({
  factor,
  tableLoading: loading.effects['factor/getList'],
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
    getTableData = async (payload) => {
      let res = await this.props.dispatch({
        type: 'factor/list',
        payload,
      });
      this.setState({
        tableData: res.data,
        // total: res.pagination.total,
      });
    }
    // 分页改变
    onTableChange = (pagination) => {
      this.getTableData({
        currentPage: pagination.current,
      });
    }
    // 启用废弃
    operate = (record, title) => {
      confirm({
        title: `确认${title}此项？`,
        onOk: async () => {
          let res = await this.props.dispatch({
            type: 'factor/toOperate',
            payload: {
              id: record.id,
              result: (record.state === 1 ||record.state === 3)?true:false,
              remark: '',
            },
          });
          message.success(res.message);
          this.getTableData({ currentPage: 1  });
        },
      });
    }

    add = () => {
      this.props.dispatch(
        routerRedux.push('/risk/price/factor/add')
      );
    }
    detail= (id) => {
      this.props.dispatch(
        routerRedux.push(`/risk/price/factor/${id}`)
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
          title: '因素名称',
          dataIndex: 'name',
          width: 250,
        },
        {
          title: '类型',
          dataIndex: 'type',
          width: 250,
          render: (key)=>{
            return riskT(key);
          },
        }, {
          title: '说明',
          dataIndex: 'explain',
          width: 250,
        }, {
          title: '状态',
          dataIndex: 'state',
          width: 200,
          render: (key)=>{
            return stateT(key);
          },
        }, {
          title: '审核状态',
          dataIndex: 'status',
          width: 200,
          render: (key)=>{
            return shenHeT(key);
          },
        }, {
          title: '操作时间',
          dataIndex: 'updateTime',
          width: 200,
        }, {
          title: '备注',
          dataIndex: 'remark',
          width: 200,
        },
        {
          title: '操作',
          width: 130,
          fixed: 'right',
          dataIndex: 'xxx',
          render: (id, record) => {
            let res = getAction({ status: record.status, permission: '100700200200' });
            let res2 = getRiskAction({ state: record.state, permission: '100700200200', status: record.status, isIndustrialPark: record.isIndustrialPark - 0 });
            return (
              <Fragment>
                <DyAction
                  action={[{
                    name: res2.name,
                    permission: `100700200200${res2.rightType}`,
                    onClick: ()=>this.operate(record, res2.name),
                  }]}
                />
                <Link to={`/risk/price/factor/${record.id}`}>{res.name}</Link>
              </Fragment>
            );
          },
          // <DyAction
          //   action={[{
          //     name: '更新',
          //     permission: '1007001001',
          //     onClick: ()=>this.add(id),
          //   }, {
          //     name: '详情',
          //     permission: '1007001004',
          //     onClick: ()=>this.detail(id),
          //   }]}
          // />
        },
      ];
      const extendBtn = [
        <DyControl permission="1007002002001" key="control">
          <Button key="add" onClick={this.add} type="primary">新增</Button>
        </DyControl>,
      ];
      return (
        <DyControl permission="1007002002" key="control">
          <DyPage>
            <DySearch
              onSearch={this.search}
              onReset={this.reset}
              extendBtn = {extendBtn}
            />
            <Table
              rowKey="id"
              scroll={{ x: '1600px' }}
              loading={tableLoading}
              columns={columns}
              dataSource={tableData}
              // pagination={{
              //   total,
              // }}
              pagination={false}
              onChange={this.onTableChange}
            />

          </DyPage>
        </DyControl>
      );
    }
}

export default Index;