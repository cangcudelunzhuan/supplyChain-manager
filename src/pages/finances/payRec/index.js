import React, { Component } from 'react';
import { DyPage, DySearch, DyControl } from 'dy-components';
import { Table, Form, Modal, message, Input, DatePicker, Select } from 'antd';
import { Link } from 'dva/router';
import { connect } from 'dva';
import { payRecListAction } from 'src/utils/actionReturn';
import { payStatusT, payRecT } from 'src/utils/statusReturn';
import {  receiptPayType, payAdvanceStatus } from 'src/utils/statusData';
import formats from 'src/utils/filter';
import moment from 'moment';
import './index.less';
const { RangePicker } = DatePicker;
const confirm = Modal.confirm;
@connect(({ payRec, loading }) => ({
  payRec,
  tableLoading: loading.effects['payRec/list'],
}))
@Form.create()
class index extends Component {
  state = {
    tableData: [],
    total: 0,
    current: 1,
    // payRecType: [
    //   'advance',
    //   'refinance',
    //   'trade',
    //   'redeem',
    //   'repayment',
    //   'serverFee',
    //   'interest',
    //   'riskAdvance',
    //   'ticketBond',
    //   'riskAdvance',
    //   'ticketBond',
    //   'advance',
    // ],
    searchfilter: null,
    searchItem: [
      {
        label: '收款方',
        key: 'payeeName',
        render() {
          return <Input placeholder="请输入公司名称" />;
        },
      },
      {
        label: '付款方',
        key: 'payName',
        render() {
          return <Input placeholder="请输入商品名称" />;
        },
      },
      {
        label: '资金类型',
        key: 'receiptPayType',
        render() {
          return (
            <Select placeholder="请选择资金类型" >
              { receiptPayType.map((item) => {
                return (<Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>);
              })}
            </Select>
          );
        },
      },
      {
        label: '审核状态',
        key: 'status',
        render() {
          return (
            <Select placeholder="请选择审核状态" >
              {payAdvanceStatus.map((item) => {
                return (<Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>);
              })}
            </Select>
          );
        },
      },
      {
        label: '到期日',
        key: 'expireDate',
        render() {
          return (
            <DatePicker format="YYYY-MM-DD" />
          );
        },
      },
      {
        label: '操作时间',
        key: 'date',
        render() {
          return (
            <RangePicker format="YYYY-MM-DD"
              disabledDate={(e) => { return e && e > moment().endOf('day'); }} />
          );
        },
      },
    ],
  }

  componentDidMount() {
    this.getTableData({
      currentPage: 1,
    });
  }
  // 搜索
  search = (datas) => {
    // const formSearch = this.props.form.getFieldsValue();
    console.log('>>Da', datas);
    let data = datas || {};
    if (data.date && data.date[0]) {
      data.startDate = formats.formatDate(data.date[0]);
      data.endDate = formats.formatDate(data.date[1]);
    }
    data.expireDate = data.expireDate ? formats.formatDate(data.expireDate) : '';
    delete data.date;
    this.getTableData({
      currentPage: 1,
      ...data,
    });
    this.setState({
      searchfilter: data,
    });
  }
  // 重置
  reset = (data) => {
    this.props.form.resetFields();
    this.getTableData({ current: 1 });
    this.setState({
      searchfilter: null,
    });
  }
  // 获取表格数据
  getTableData = (payload) => {
    this.props.dispatch({
      type: 'payRec/list',
      payload,
    }).then((res) => {
      this.setState({
        tableData: res.list,
        total: res.pagination.total,
        current: res.pagination.current,
      });
    });
  }
  // 分页改变
  onTableChange = (pagination) => {
    this.getTableData({
      currentPage: pagination.current,
      ...this.state.searchfilter,
    });
  }
  // 删除
  delete = () => {
    confirm({
      title: '确认删除此项？',
      onOk: () => {
        message.success('删除成功！');
      },
    });
  }
  render() {
    const { tableData, selectedRowKeys, total, current } = this.state;
    const { tableLoading } = this.props;
    const columns = [
      {
        title: '流水号',
        dataIndex: 'receiptPayNo',
        fixed: 'left',
        width: 250,
      }, {
        title: '收款方',
        dataIndex: 'receiptName',
        width: 250,
      }, {
        title: '付款方',
        dataIndex: 'payName',
        width: 250,
      }, {
        title: '资金类型',
        dataIndex: 'receiptPayType',
        width: 150,
        render: (text) => {
          return payRecT(text);
        },
      },
      {
        title: '发生金额（元）',
        dataIndex: 'receiptPayAmount',
        width: 200,
      },
      {
        title: '审核状态',
        dataIndex: 'status',
        width: 150,
        render: (text, record) => {
          return payStatusT(text, record.receiptPayType);
        },
      },
      {
        title: '到期日',
        dataIndex: 'expireDate',
        width: 200,
      },
      {
        title: '操作时间',
        dataIndex: 'updateTime',
        width: 200,
      }, {
        title: '备注',
        dataIndex: 'remark',
        width: 200,
      }, {
        title: '操作',
        width: 80,
        fixed: 'right',
        render: (text, record) => {
          let res = payRecListAction({ status: record.status, permission: '100500200' });
          return (
            // <Link to={`/finances/payRec/${record.id}/${this.state.payRecType[record.receiptPayType-1]}?actionType=${record.receiptPayType}`}>{res.name}</Link>
            <Link to={`/finances/payRec/${record.id}/common`}>{res.name}</Link>
          );
        },
      },
    ];
    return (
      <DyControl permission="1005002" key="control">
        <DyPage>
          <DySearch
            onSearch={this.search}
            onReset={this.reset}
            selectedRowKeys={selectedRowKeys}
            searchItem={this.state.searchItem}
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
            scroll={{ x: '1930px' }}
            onChange={this.onTableChange}
            rowClassName={(record, index) => record.isDelete === 1 ? 'deleterow' : ''}
          />
        </DyPage>
      </DyControl>
    );
  }
}
export default index;
