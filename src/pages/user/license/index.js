import React, { Component } from 'react';
import { Table, Form, Button } from 'antd';
import { connect } from 'dva';
import { DyPage, DySearch, DyControl } from 'dy-components';
import { routerRedux, Link } from 'dva/router';
import { shenHeT } from 'src/utils/statusReturn';
import { getAction } from 'src/utils/actionReturn';
import '../index.less';

@connect(({ license, loading }) => ({
  license,
  tableLoading: loading.effects['license/getList'],
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
      type: 'license/getList',
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
    this.props.dispatch(routerRedux.push('/user/license/add'));
  }
  // 分页改变
  onTableChange = (pagination) => {
    this.getTableData({
      current: pagination.current,
      pageSize: 10,
    });
  }
  // 查看详情
  detail = (id, type) => {
    switch (type) {
    case 'detail':
      this.props.dispatch(
        routerRedux.push(`/user/license/${id}`)
      );
      break;
    case 'edit':
      this.props.dispatch(
        routerRedux.push(`/user/license/deal/${id}`)
      );
      break;
    case 'audit':
      this.props.dispatch(
        routerRedux.push(`/user/license/deal/${id}`)
      );
      break;

    default:
      break;
    }
  }
  render() {
    const { tableData, total, current } = this.state;
    const { tableLoading } = this.props;
    const columns = [{
      title: '持牌机构名称',
      dataIndex: 'licenseOrganizationName',
      width: 300,
    }, {
      title: '持牌机构编号',
      dataIndex: 'licenseOrganizationNo',
      width: 200,
    }, {
      title: '所属区域',
      dataIndex: 'detailAddress',
      width: 250,
    }, {
      title: '联系人信息',
      dataIndex: 'contactName',
      render: (text, record) => {
        return (
          <div>
            <div className="table-line">{text}</div>
            <div className="table-line">手机:{record.contactMobilePhone} <br />座机:{record.contactPhone}</div>
          </div>
        );
      },
      width: 300,
    }, {
      title: '审核状态',
      dataIndex: 'status',
      render: (text) => {
        return shenHeT(text);
      },
      width: 150,
    }, {
      title: '操作时间',
      dataIndex: 'updateTime',
      width: 200,
    }, {
      title: '备注',
      width: 150,
      dataIndex: 'remark',
    }, {
      title: '操作',
      width: 130,
      fixed: 'right',
      render: (text, record) => {
        let res = getAction({ status: record.status, permission: '100100100' });
        return (
          <Link
            to={res.name === '详情' ? `/user/license/${record.id}` : `/user/license/deal/${record.id}`}
          >{res.name}</Link>
        );
      },
    },
    ];
    const extendBtn = [
      <DyControl permission="1001001001" key="control">
        <Button key="add" onClick={this.add} type="primary">
          新增
        </Button>
      </DyControl>,
    ];
    return (
      <DyControl permission="1001001" key="control">
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
            scroll={{ x: 1300 }}
            onChange={this.onTableChange}
          />
        </DyPage>
      </DyControl>
    );
  }
}

export default Index;