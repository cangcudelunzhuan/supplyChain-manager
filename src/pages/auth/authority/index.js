import React, { Component } from 'react';
import { DyPage, DySearch, DyAction, DyControl, DyFormModal } from 'dy-components';
import { Table, Form, Button, Modal, message, Input } from 'antd';
import { routerRedux } from 'dva/router';
import RegExp from 'src/utils/regExp';
import { connect } from 'dva';
import { passMd5 } from 'src/utils/tools';
const confirm = Modal.confirm;
@connect(({ global, authority, loading  }) => ({
  global,
  authority,
  tableLoading: loading.effects['authority/list'],
  cancelLoading: loading.effects['authority/toCancel'],
}))
@Form.create()
class index extends Component {
    state = {
      tableData: [],
      total: 0,
      current: 1,
      adminId: null,
      selectedRowKeys: [],
      visible: false,
      options: [],
      passVisible: false,
    }
    componentDidMount() {
      this.getTableData({
        current: 1,
      });
    }
    openPass = async (record) => {
      record.passWord = '';
      this.setState({
        passVisible: true,
        adminId: record.adminId,
      });
      await this.props.dispatch({
        type: 'global/updateState',
        payload: { recordData: record },
      });
    }
    // 获取表格数据
    getTableData = async (payload) => {
      let res = await this.props.dispatch({
        type: 'authority/list',
        payload: payload,
      });
      this.setState({
        tableData: res.list,
        total: res.pagination.total,
        current: res.pagination.current,
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
      console.log('>>', id);
      this.props.dispatch(routerRedux.push(`/auth/authority/${id}`));
    }
    // 新增
    add = () => {
      this.props.dispatch(routerRedux.push('/auth/authority/add'));
    }
    // 注销
    delete = (id) => {
      confirm({
        title: '确认注销此项？',
        onOk: async ()=> {
          this.deleAction(id);
        },
      });
    }
    deleAction = async (id) => {
      let res = await this.props.dispatch({
        type: 'authority/toCancel',
        payload: { id },
      });
      message.success(res.message);
      this.getTableData({
        currentPage: this.state.current,
      });
    }
    setAction = async (data, e) => {
      passMd5(data);
      data.adminId = this.state.adminId;
      let res = await this.props.dispatch({
        type: 'authority/resetPassword',
        payload: data,
      });
      message.success(res.message);
      this.setState({
        passVisible: false,
      });
    }
    check = (rule, value, callback) => {
      let newpass = document.getElementById('newPassword').value;
      if (newpass === value) {
        callback();
        return;
      }
      callback('两次密码不一致');
    }
    render() {
      const { tableData, selectedRowKeys, total, current } = this.state;
      const { tableLoading } = this.props;
      const columns = [
        {
          title: '用户名',
          dataIndex: 'username',
        },
        {
          title: '姓名',
          dataIndex: 'name',
        }, {
          title: '所属机构',
          dataIndex: 'organizationName',
        },
        {
          title: '手机号',
          dataIndex: 'mobilePhone',
        },
        {
          title: '角色',
          dataIndex: 'roleName',
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
        }, {
          title: '操作',
          width: 200,
          dataIndex: 'isLogout',
          render: (text, record) => {
            switch (text) {
            case 1:
              return '已注销';
            default:
              return (
                <DyAction
                  action={[{
                    name: '修改',
                    permission: 1003001002,
                    onClick: ()=>{ this.detail(record.id) ; },
                  }, {
                    name: '重置密码',
                    permission: 1003001004,
                    onClick: ()=>{ this.openPass(record) ; },
                  }, {
                    name: '注销',
                    permission: 1003001003,
                    onClick: ()=>{ this.delete(record.id) ; },
                  }]}
                />
              );
            }
          },
        },
      ];
      const formData = [
        {
          key: 'username',
          label: '用户名',
          render() {
            return <Input placeholder="请输入原密码" disabled/>;
          },
        },
        {
          key: 'newPassword',
          label: '重置密码',
          render() {
            return <Input.Password  placeholder="不少于6位的数字、字母及特殊字符组成" />;
          },
          options: {
            rules: [{ required: true, ...RegExp.passWord }],
          },
        },
        {
          key: 'newPasswordConfirm',
          label: '确认密码',
          render() {
            return <Input.Password  placeholder="不少于6位的数字、字母及特殊字符组成"/>;
          },
          options: {
            rules: [{ required: true, ...RegExp.passWord }, { validator: (rule, value, callback)=>{ this.check(rule, value, callback); } }],
            validateFirst: true,
          },
        }];
      const extendBtn = [
        <DyControl permission="1003001001" key="control">
          <Button key="add" onClick={this.add} type="primary">新增</Button>
        </DyControl>,
      ];
      return (
        <DyControl permission="1003001" key="control">
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
          <DyFormModal visible={this.state.passVisible} formData={formData} title="重置密码"
            visibleName={'passVisible'} app={this} action={this.setAction} />
        </DyControl>

      );
    }
}
export default index;
