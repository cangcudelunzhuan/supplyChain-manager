import React, { Component } from 'react';
import { DyPage, DySearch, DyAction, DyControl } from 'dy-components';
import { Table, Form, Button, Modal, message, Tag } from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
const confirm = Modal.confirm;
@connect(({ role, loading  }) => ({
  role,
  tableLoading: loading.effects['role/getRoleList'],
  cancelLoading: loading.effects['role/toCancel'],
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
        type: 'role/getRoleList',
        payload: payload,
      }).then((res) => {
        console.log(res);
        this.setState({
          tableData: res.list,
          total: res.pagination.total,
          current: res.pagination.current,
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
    detail = (id) => {
    //  console.log('>>', id);
      this.props.dispatch(routerRedux.push(`/auth/role/${id}`));
    }
    // 新增
    add = () => {
      this.props.dispatch(routerRedux.push('/auth/role/add'));
    }
    // 注销
    delete = (id) => {
      confirm({
        title: '确认删除此项？',
        onOk: async ()=> {
          this.deleAction(id);
        },
      });
    }
    deleAction = async (id) => {
      let res = await this.props.dispatch({
        type: 'role/putDelete',
        payload: { id },
      });
      message.success('删除成功');
      this.getTableData({
        currentPage: this.state.current,
      });
    }
    render() {
      const { tableData, selectedRowKeys, total, current } = this.state;
      const { tableLoading } = this.props;
      const columns = [
        {
          title: '角色',
          dataIndex: 'roleName',
          render: (data)=>{
            return <Tag color="geekblue">{data}</Tag>;
          },
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
        },
        {
          title: '角色描述',
          dataIndex: 'roleDes',
        },
        {
          title: '操作',
          width: 130,
          render: ( record) => {
            return (
              <DyAction
                action={[{
                  name: '修改',
                  permission: 1003002002,
                  onClick: ()=>{ this.detail(record.id) ; },
                }, {
                  name: '删除',
                  permission: 1003002003,
                  onClick: ()=>{ this.delete(record.id) ; },
                }]}
              />
            );
          },
        },
      ];
      const extendBtn = [
        <DyControl permission="1003002001" key="control">
          <Button icon={'plus'} key="add" onClick={this.add}
            type="primary">新增角色</Button>
        </DyControl>,
      ];
      return (
        <DyControl permission="1003002" key="control">
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
