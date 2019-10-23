import React, { Component } from 'react';
import { DyPage, DySearch, DyControl } from 'dy-components';
import { Table, Form, Button } from 'antd';
import { routerRedux, Link } from 'dva/router';
import { connect } from 'dva';
import { getAction } from 'src/utils/actionReturn';
import { shenHeT } from 'src/utils/statusReturn';

const pagePermission = '1001005001';
// const addPermission = '1001005001001';
// const auditPermission = '1001005001002';
// const updatePermission = '1001005001003';
// const viewDetailPermission = '1001005001004';
const pageProps = 'industrialPark';

@connect(({ attestation, loading }) => ({
  attestation,
  tableLoading: loading.effects['industrialPark/industrialParkList'],
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
      type: 'industrialPark/industrialParkList',
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
    this.props.dispatch(routerRedux.push(`/user/industrialPark/industrialPark/${id}`));
  };
  // 新增
  add = () => {
    this.props.dispatch(routerRedux.push('/user/industrialPark/industrialPark/add'));
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
        title: '合同编号',
        width: 250,
        dataIndex: 'name',
      },
      {
        title: '资产类型',
        width: 250,
        dataIndex: 'name',
      },
      {
        title: '仓储类型',
        width: 250,
        dataIndex: 'name',
      },
      {
        title: '仓储公司',
        width: 250,
        dataIndex: 'name',
      },
      {
        title: '持牌机构名称',
        width: 250,
        dataIndex: 'name',
      },
      {
        title: '经销商名称',
        width: 250,
        dataIndex: 'name',
      },
      {
        title: '仓储公司',
        width: 250,
        dataIndex: 'name',
      },
      {
        title: '库存总量',
        width: 250,
        dataIndex: 'name',
      },
      {
        title: '总出库量',
        width: 250,
        dataIndex: 'name',
      },
      {
        title: '总入库量',
        width: 250,
        dataIndex: 'name',
      },
      {
        title: '在仓货值（元）',
        width: 250,
        dataIndex: 'name',
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
        title: '操作',
        width: 130,
        fixed: 'right',
        render: (text, record) => {
          let res = getAction({ status: record.status, permission: `${pagePermission}00`, props: pageProps });
          return (
            <Link to={`/user/industrialPark/industrialPark/${record.id}`} target="">{res.name}</Link>
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
