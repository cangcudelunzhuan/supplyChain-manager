import React, { Component } from 'react';
import { Table, Form } from 'antd';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { DyPage, DySearch,  DyControl, DyImport } from 'dy-components';
import '../index.less';
import { shenHeT } from 'src/utils/statusReturn';
import { getAction } from 'src/utils/actionReturn';
@connect(({ brans, loading  }) => ({
  brans,
  tableLoading: loading.effects['brans/list'] || loading.effects['brans/auditMulti'],
  uploading: loading.effects['brans/toupload'],
}))
@Form.create()
class Index extends Component {

  state = {
    tableData: [],
    total: 0,
    current: 1,
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
      type: 'brans/list',
      payload,
    });
    this.setState({
      tableData: res.list,
      total: res.pagination.total,
      current: res.pagination.current,
    });
  }
  // 分页改变
  onTableChange = (pagination) => {
    this.getTableData({
      current: pagination.current,
    });
  }


  detail = (id, type) => {
    this.props.dispatch(
      routerRedux.push(`/user/brans/${id}`)
    );
  }
  render() {
    const { tableData, total,  current } = this.state;
    const { tableLoading, uploading } = this.props;
    const columns = [{
      title: '公司名称',
      dataIndex: 'brandName',
    }, {
      title: '客户编号',
      dataIndex: 'brandNo',
    }, {
      title: '联系人信息',
      dataIndex: 'contactName',
      render: (text, record) =>{
        return(
          <div>
            <div className="table-line">{text}</div>
            <div className="table-line">手机:{record.contactMobilePhone} <br/>座机:{record.contactPhone}</div>
          </div>
        );
      },
    }, {
      title: '审核状态',
      dataIndex: 'status',
      render: (text)=>{
        return shenHeT(text);
      },
    }, {
      title: '操作时间',
      dataIndex: 'updateTime',
    }, {
      title: '操作',
      width: 130,
      fixed: 'right',
      render: (text, record) => {
        let res = getAction({ status: record.status, permission: '100100200' });
        return (
          <Link to={`/user/brans/${record.id}?t=${res.target}`} target={res.target}>{res.name}</Link>
        );
      },
    } ];

    const extendBtn = [
      <DyControl permission="1001002001" key="control">
        <DyImport uploading={uploading} app={this}/>
      </DyControl>,
    ];
    return (
      <DyControl permission="1001002">
        <DyPage
          className="user-manage"
        >
          <DySearch
            extendBtn={extendBtn}
          />
          <Table
            rowKey="id"
            loading={tableLoading}
            columns={columns}
            dataSource={tableData}
            scroll={{ x: '110%' }}
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