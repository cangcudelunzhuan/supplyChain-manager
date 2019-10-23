import React, { Component } from 'react';
import { DyPage, DySearch, DyControl } from 'dy-components';
import { Table, Form, Button, Modal, message } from 'antd';
import { routerRedux, Link } from 'dva/router';
import { connect } from 'dva';
import { shenHeT, stateT } from 'src/utils/statusReturn';
import { getAction } from 'src/utils/actionReturn';
const confirm = Modal.confirm;
@connect(({ distributorPrice, loading  }) => ({
  distributorPrice,
  tableLoading: loading.effects['distributorPrice/list'],
  cancelLoading: loading.effects['distributorPrice/toCancel'],
}))
@Form.create()
class index extends Component {
    state = {
      tableData: [],
      total: 0,
      current: 1,
      selectedRowKeys: [],
      visible: false,
      options: [],
    }
    componentDidMount() {
      this.getTableData({
        current: 1,
      });
    }
    // 获取表格数据
    getTableData = (payload) => {
      this.props.dispatch({
        type: 'distributorPrice/list',
        payload: payload,
      }).then((res) => {
        this.setState({
          tableData: res.data,
          // total: res.pagination.total,
          // current: res.pagination.current,
        });
      });
    }
    // 搜索
    search = () => {
      const formSearch = this.props.form.getFieldsValue();
      this.getTableData({
        currentPage: 1,
        ...formSearch,
      });
    }
    // 重置
    reset = () => {
      this.props.form.resetFields();
      this.getTableData();
    }
    // 分页改变
    onTableChange = (pagination) => {
      this.getTableData({
        currentPage: pagination.current,
      });
    }
    // table多行选择
    onSelectChange = (selectedRowKeys) => {
      this.setState({ selectedRowKeys });
    }
    // 详情
    detail = (id, type) => {
    //  console.log('>>', id);
      this.props.dispatch(routerRedux.push(`/risk/price/distributorPrice/${id}`));
    }
    // 新增
    add = () => {
      this.props.dispatch(routerRedux.push('/risk/price/distributorPrice/add?type=add'));
    }
    // 删除
    delete = (id) => {
      confirm({
        title: '确认删除此项？',
        onOk: async ()=> {
          this.deleAction(id);
        },
      });
    }
    deleAction = async (id) => {
      await this.props.dispatch({
        type: 'distributorPrice/toCancel',
        payload: { id },
      });
      message.success('删除成功！');
      this.getTableData({
        currentPage: this.state.current,
      });
    }
    render() {
      const { tableData, selectedRowKeys } = this.state;
      const { tableLoading } = this.props;
      const columns = [
        {
          title: '定价编号',
          dataIndex: 'priceNo',
          width: 150,
        },
        {
          title: '经销商名称',
          dataIndex: 'dealerName',
          width: 250,
        },
        {
          title: '风险溢价率',
          dataIndex: 'premiumRate',
          width: 250,
        },
        {
          title: '状态',
          dataIndex: 'state',
          width: 250,
          render: (key)=>{
            return stateT(key);
          },
        },
        {
          title: '操作时间',
          dataIndex: 'updateTime',
          width: 250,
        },
        {
          title: '审核状态',
          dataIndex: 'status',
          render: (text)=>{
            return shenHeT(text);
          },
        },
        {
          title: '备注',
          width: 150,
          dataIndex: 'remark',
        },
        {
          title: '操作',
          width: 80,
          dataIndex: 'x',
          fixed: 'right',
          render: (text, record) => {
            let res = getAction({ status: record.status, permission: '100700200100' });
            return (
              <Link to={`/risk/price/distributorPrice/${record.id}`}>{res.name}</Link>
            );
          },
        },
      ];
      const extendBtn = [
        <DyControl permission="1007002001001" key="control">
          <Button key="add" onClick={this.add} type="primary">新增</Button>
        </DyControl>,
      ];

      return (
        <DyControl permission="1007002001" key="control">
          <DyPage>
            <DySearch
              onSearch={this.search}
              onReset={this.reset}
              extendBtn={extendBtn}
              selectedRowKeys={selectedRowKeys}
            />
            <Table
              rowKey="id"
              loading={tableLoading}
              columns={columns}
              dataSource={tableData}
              scroll={{ x: '1480px' }}
              pagination={false}
              onChange={this.onTableChange}
            />
          </DyPage>
        </DyControl>
      );
    }
}
export default index;
