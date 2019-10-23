import React, { Component } from 'react';
import { DyPage, DySearch, DyControl } from 'dy-components';
import { Table, Form, Button, Input, DatePicker } from 'antd';
import { routerRedux, Link } from 'dva/router';
import { connect } from 'dva';
import { getAction } from 'src/utils/actionReturn';
import { shenHeT } from 'src/utils/statusReturn';
import moment from 'moment';

const { RangePicker } = DatePicker;

const pagePermission = '1001005001';
// const addPermission = '1001005001001';
// const auditPermission = '1001005001002';
// const updatePermission = '1001005001003';
// const viewDetailPermission = '1001005001004';
const pageProps = 'goods';
const parentPath = 'cargoManage';

const searchItem =
  [
    {
      label: '商品名称',
      key: 'goodsName',
      render() {
        return <Input placeholder="请输入商品名称"/>;
      },
    },
    {
      label: '操作时间',
      key: 'date',
      render() {
        return (
          <RangePicker format="YYYY-MM-DD"
                       disabledDate={(e) => {
                         return e && e > moment().endOf('day');
                       }}/>
        );
      },
    },
  ];

@connect(({ attestation, loading }) => ({
  attestation,
  tableLoading: loading.effects[`${pageProps}/list`],
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
  };

  componentDidMount() {
    this.getTableData({
      current: 1,
    });
  }

  // 获取表格数据
  getTableData = async (payload) => {
    let res = await this.props.dispatch({
      type: `${pageProps}/list`,
      payload: payload,
    });
    console.log('getTableData res = ', res);

    this.setState({
      tableData: res.list,
      total: res.pagination.total,
      current: res.pagination.current,
    });
  };
  // 搜索
  search = () => {
    const formSearch = this.props.form.getFieldsValue();
    this.getTableData({
      current: 1,
      ...formSearch,
    });
  };
  // 重置
  reset = () => {
    this.props.form.resetFields();
    this.getTableData();
  };
  // 分页改变
  onTableChange = (pagination) => {
    this.getTableData({
      current: pagination.current,
    });
  };
  // table多行选择
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };
  // 详情
  detail = (id) => {
    //  console.log('>>', id);
    this.props.dispatch(routerRedux.push(`/${parentPath}/${pageProps}/${id}`));
  };
  // 新增
  add = () => {
    this.props.dispatch(routerRedux.push(`/${parentPath}/${pageProps}/add`));
  };

  render() {
    const { tableData, selectedRowKeys, total, current } = this.state;
    const { tableLoading } = this.props;
    const columns = [
      // {
      //   title: '序号',
      //   dataIndex: 'index',
      // },
      {
        title: '商品编号',
        width: 250,
        dataIndex: 'name',
      },
      {
        title: '商品名称',
        width: 250,
        dataIndex: 'no',
      },
      {
        title: '品牌商',
        width: 250,
        dataIndex: 'no',
      },
      {
        title: '型号',
        width: 250,
        dataIndex: 'no',
      },
      {
        title: '到仓期限（天）',
        width: 250,
        dataIndex: 'no',
      },
      {
        title: '生效状态',
        width: 250,
        dataIndex: 'no',
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
        width: 150,
        dataIndex: 'remark',
      },
      {
        title: '操作',
        width: 130,
        fixed: 'right',
        render: (text, record) => {
          let res = getAction({ status: record.status, permission: `${pagePermission}00`, props: pageProps });
          return (
            <Link to={`/${parentPath}/${pageProps}/${record.id}`} target="">{res.name}</Link>
          );
        },
      },
    ];
    const extendBtn = [
      <DyControl permission={`${pagePermission}001`} key="control">
        <Button key="add" onClick={this.add} type="primary">新增</Button>
      </DyControl>,

    ];
    return (
      <DyControl permission={pagePermission} key="control">
        <DyPage>
          <DySearch
            onSearch={this.search}
            onReset={this.reset}
            extendBtn={extendBtn}
            selectedRowKeys={selectedRowKeys}
            searchItem={searchItem}
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
            scroll={{ x: '1300px' }}
            onChange={this.onTableChange}
          />
        </DyPage>
      </DyControl>
    );
  }
}

export default index;
