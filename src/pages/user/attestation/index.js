import React, { Component } from 'react';
import { DyPage, DySearch, DyControl } from 'dy-components';
import { Table, Form, Button, Tag } from 'antd';
import { routerRedux, Link } from 'dva/router';
import { connect } from 'dva';
import { getAction } from 'src/utils/actionReturn';
import { shenHeT, organizationT } from 'src/utils/statusReturn';
@connect(({ attestation, loading }) => ({
  attestation,
  tableLoading: loading.effects['attestation/list'],
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
      type: 'attestation/list',
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
    this.props.dispatch(routerRedux.push(`/user/attestation/${id}`));
  }
  // 新增
  add = () => {
    this.props.dispatch(routerRedux.push('/user/attestation/add'));
  }
  render() {
    const { tableData, selectedRowKeys, total, current } = this.state;
    const { tableLoading } = this.props;
    const columns = [
      {
        title: '出资机构名称',
        width: 250,
        dataIndex: 'organizationName',
      }, {
        title: '出资机构编号',
        width: 200,
        dataIndex: 'organizationNo',
      },
      // {
      //   title: '授信额度(元）',
      //   width: 250,
      //   dataIndex: 'creditAmount',
      // },
      // {
      //   title: '授信额度生效日',
      //   width: 200,
      //   dataIndex: 'effectiveDate',
      // },
      // {
      //   title: '授信额度到期日',
      //   dataIndex: 'expireDate',
      //   width: 200,
      //   render: (text, record) => {
      //     let s2 = new Date(text).getTime();
      //     let s1 = new Date().getTime();
      //     let total = (s2 - s1) / 1000;
      //     let day = parseInt(total / (24 * 60 * 60));// 计算整数天数
      //     if (day - 7 < 0) {
      //       return (
      //         <Fragment>
      //           <span style={{ color: '#f93232', marginRight: '1px' }}>{text}</span> <Icon type="clock-circle" style={{ color: '#f93232' }} />
      //         </Fragment>
      //       );
      //     } else if (record.isLimited === 2) {
      //       return '无限期';
      //     }
      //     return text || '--';
      //   },
      // },
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
        title: '机构类型',
        width: 250,
        dataIndex: 'organizationType',
        render: (text) => {
          return organizationT(text);
        },
      },
      {
        title: '银行名称',
        dataIndex: 'bankName',
        width: 250,
        render: (text, record) => (
          <div>
            <div className="table-line"><Tag color="rgba(39, 129, 239, 0.8)">{text}</Tag>{record.bankBranchName}</div>
            <div className="table-line">{record.bankCardNo}</div>
          </div>
        ),
      },
      {
        title: '审核状态',
        dataIndex: 'status',
        width: 100,
        render: (text) => {
          return shenHeT(text);
        },
      },
      {
        title: '操作时间',
        width: 200,
        dataIndex: 'updateTime',
      }, {
        title: '操作',
        dataIndex: 'xxxx',
        width: 130,
        fixed: 'right',
        render: (text, record) => {
          let res = getAction({ status: record.status, permission: '100100400', props: 'attestation' });
          return (
            <Link to={`/user/attestation/${record.id}`} target="">{res.name}</Link>
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
            scroll={{ x: '1600px' }}
            onChange={this.onTableChange}
          />
        </DyPage>
      </DyControl>
    );
  }
}
export default index;
