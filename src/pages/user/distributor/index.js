import React, { Component } from 'react';
import { Table, Form, Modal, message } from 'antd';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { DyPage, DySearch, DyControl, DyImport } from 'dy-components';
import { shenHeT }from 'src/utils/statusReturn';
import { getAction } from 'src/utils/actionReturn';
import '../index.less';

const confirm = Modal.confirm;

@connect(({ distributor, loading  }) => ({
  distributor,
  tableLoading: loading.effects['distributor/list'] || loading.effects['distributor/auditMulti'],
  uploading: loading.effects['distributor/toimport'],
}))
@Form.create()
class Index extends Component {

  state = {
    list: [],
    total: 0,
    current: 1,
  }
  componentDidMount() {
    this.getTableData();
  }
  // 获取表格数据
  getTableData = async (payload) => {
    let res = await this.props.dispatch({
      type: 'distributor/list',
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
  detail = (id) => {
    this.props.dispatch(
      routerRedux.push(`/user/distributor/${id}`)
    );
  }
  // 删除
  delete = (id) => {
    confirm({
      title: '确认删除此项？',
      onOk: ()=> {
        this.deleteAction(id);
      },
    });
  }
  deleteAction = async (id) => {
    await this.props.dispatch({
      type: 'distributor/toCancel',
      payload: { id },
    });
    message.success('删除成功！');
    this.getTableData({
      current: 1,
    });
  }
  // 审批
  review = () => {
    const { selectedRowKeys } = this.state;
    confirm({
      title: '批量审批',
      content: `已选择${selectedRowKeys.length}项`,
      onOk: ()=> {
        this.props.dispatch({
          type: 'distributor/auditMulti',
          payload: {
            id: selectedRowKeys,
          },
        }).then((res) => {
          message.success('批量审批成功！');
          this.getTableData({
            current: 1,
          });
        });
      },
    });
  }
  render() {
    const { tableData, total, current } = this.state;
    const { tableLoading, uploading } = this.props;
    const columns = [{
      title: '公司名称',
      dataIndex: 'dealerName',
    }, {
      title: '客户编号',
      dataIndex: 'dealerNo',
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
      width: 200,
    }, {
      title: '操作',
      width: 130,
      fixed: 'right',
      render: (text, record) => {
        let res = getAction({ status: record.status, permission: '100100300' });
        return (
          <Link to={`/user/distributor/${record.id}?t=${res.target}`} target={res.target}>{res.name}</Link>
        );
      },
    } ];
    const extendBtn = [
      <DyControl permission="1001003001" key="control">
        <DyImport uploading={uploading} url={'distributor/toimport'} app={this}/>
      </DyControl>,
    ];
    return (
      <DyControl permission="1001003">
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
            pagination={{
              total,
              current,
            }}
            scroll={{ x: '110%' }}
            onChange={this.onTableChange}
          />
        </DyPage>
      </DyControl>

    );
  }
}

export default Index;