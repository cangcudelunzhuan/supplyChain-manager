import React, { Component } from 'react';
import { Table, Form, Input, DatePicker  } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { DyPage, DyAction, DyControl, DySearch } from 'dy-components';
import formats from 'src/utils/filter';
import moment from 'moment';
const { RangePicker } = DatePicker;
@connect(({ cashLicensee, loading }) => ({
  cashLicensee,
  tableLoading: loading.effects['cashLicensee/getList'],
}))
@Form.create()

class Index extends Component {
    state = {
      tableData: [],
      total: 0,
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
    getTableData = async (payload) => {
      let res = await this.props.dispatch({
        type: 'cashLicensee/getList',
        payload,
      });
      this.setState({
        tableData: res.list,
        total: res.pagination.total,
      });
    }
    // 分页改变
    onTableChange = (pagination) => {
      this.getTableData({
        currentPage: pagination.current,
        ...this.state.searchfilter,
      });
    }
    detail= (id) => {
      this.props.dispatch(
        routerRedux.push(`/count/cash/licensee/${id}`)
      );
    }
    render() {
      const { tableData, total } = this.state;
      const { tableLoading } = this.props;
      const searchItem= [
        {
          label: '持牌机构名称',
          key: 'dealerNo',
          render() {
            return <Input placeholder="请输入经销商编号" />;
          },
        },
        {
          label: '日期',
          key: 'date',
          render() {
            return (
              <RangePicker format="YYYY-MM-DD"
                disabledDate={(e) => { return e && e > moment().endOf('day'); }} />
            );
          },
        },
      ];
      const columns = [
        {
          title: '日期',
          dataIndex: 'cDate',
          width: 200,
        },
        {
          title: '持牌机构编号',
          dataIndex: 'licenseOrganizationNo',
          width: 250,
        },
        {
          title: '持牌机构名称',
          dataIndex: 'licenseOrganizationName',
          width: 200,
        }, {
          title: '应收金额(元)',
          dataIndex: 'receivableAmount',
          width: 200,
        }, {
          title: '应付金额(元)',
          dataIndex: 'payableAmount',
          width: 200,
        }, {
          title: '差额(元)',
          dataIndex: 'differenceAmount',
        }, {
          title: '操作',
          width: 130,
          fixed: 'right',
          dataIndex: 'id',
          render: (id) => (
            <DyAction
              action={[{
                name: '详情',
                permission: '1007001004',
                onClick: ()=>this.detail(id),
              }]}
            />
          ),
        },
      ];
      return (
        <DyControl permission="1007001" key="control">
          <DyPage>
            <DySearch
              onSearch={this.search}
              onReset={this.reset}
              searchItem={searchItem}
            />
            <Table
              rowKey="id"
              scroll={{ x: '1100px' }}
              loading={tableLoading}
              columns={columns}
              dataSource={tableData}
              pagination={{
                total,
              }}
              onChange={this.onTableChange}
            />

          </DyPage>
        </DyControl>
      );
    }
}

export default Index;