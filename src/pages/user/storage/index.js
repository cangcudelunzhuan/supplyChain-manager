import React, { Component } from 'react';
import { DyPage, DySearch, DyControl } from 'dy-components';
import { Table, Form, Button, Tag } from 'antd';
import { routerRedux, Link } from 'dva/router';
import { connect } from 'dva';
import { getAction } from 'src/utils/actionReturn';
import { shenHeT, organizationT } from 'src/utils/statusReturn';
@connect(({ storage, loading }) => ({
  storage,
  tableLoading: loading.effects['storage/list'],
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
  getTableData = async (payload) => {
    let res = await this.props.dispatch({
      type: 'storage/list',
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
      current: 1,
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
      current: pagination.current,
    });
  }
  // table多行选择
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }
  // 详情
  detail = (id) => {
    //  console.log('>>', id);
    this.props.dispatch(routerRedux.push(`/user/storage/${id}`));
  }
  // 新增
  add = () => {
    this.props.dispatch(routerRedux.push('/user/storage/add'));
  }
  render() {
    const { tableData, selectedRowKeys, total, current } = this.state;
    const { tableLoading } = this.props;
    const columns = [
      {
        title: '公司名称',
        width: 250,
        dataIndex: 'organizationName',
      }, {
        title: '客户编号',
        width: 200,
        dataIndex: 'organizationNo',
      },
      {
        title: '联系人信息',
        dataIndex: 'contactName',
        width: 250,
        render: (text, record) => {
          return (
            <div>
              <div className="table-line">{text}</div>
              <div className="table-line">手机:{record.contactMobilePhone}<br /> 座机:{record.contactPhone}</div>
            </div>
          );
        },
      },
      {
        title: '审核状态',
        dataIndex: 'status',
        width: 150,
        render: (text) => {
          return shenHeT(text);
        },
      },
      {
        title: '操作时间',
        width: 200,
        dataIndex: 'updateTime',
      },
      {
        title: '备注',
        dataIndex: 'remark',
      },
      {
        title: '操作',
        dataIndex: 'xxxx',
        width: 130,
        fixed: 'right',
        render: (text, record) => {
          let res = getAction({ status: record.status, permission: '100100400', props: 'storage' });
          return (
            <Link to={`/user/storage/${record.id}`} target="">{res.name}</Link>
          );
        },
      },
    ];
    const extendBtn = [
      <DyControl permission="1001004001" key="control">
        <Button key="add" onClick={this.add} type="primary">新增</Button>
      </DyControl>,

    ];
    return (
      <DyControl permission="1001004" key="control">
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
            scroll={{ x: '1280px' }}
            onChange={this.onTableChange}
          />
        </DyPage>
      </DyControl>
    );
  }
}
export default index;
