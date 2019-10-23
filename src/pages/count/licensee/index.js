import React, { Component } from 'react';
import { Table, Form, Input, Select } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { DyPage, DySearch, DyAction, DyControl } from 'dy-components';
import {  fundingT } from 'src/utils/statusReturn';
@connect(({ licensee, loading }) => ({
  licensee,
  tableLoading: loading.effects['licensee/getList'],
}))
@Form.create()

class Index extends Component {

    state = {
      tableData: [],
      total: 0,
      searchfilter: null,
    }
    componentDidMount() {
      this.getTableData({
        currentPage: 1,
      });
    }

    dealerNameOnChange = (value)=> {
      console.log(`selected ${value}`);
    }

    dealerNameOnBlur=()=> {
      console.log('blur');
    }

    dealerNameOnFocus=()=> {
      console.log('focus');
    }

    dealerNameOnSearch=(val)=> {
      console.log('search:', val);
    }

    // 搜索
  search = (data) => {
    // const formSearch = this.props.form.getFieldsValue();
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
    this.getTableData({ currentPage: 1 });
    this.setState({
      searchfilter: null,
    });
  }
    // 获取表格数据
    getTableData = async (payload) => {
      let res = await this.props.dispatch({
        type: 'licensee/getList',
        payload,
      });
      console.log('>>res.pagination.current', res.pagination.current);
      this.setState({
        tableData: res.list,
        total: res.pagination.total,
      });
      console.log('>>current', this.state.current);
    }
    // 分页改变
    onTableChange = (pagination) => {
      this.getTableData({
        currentPage: pagination.current,
        ...this.state.searchfilter,
      });
    }
    detail= (record) => {
      this.props.dispatch(
        routerRedux.push(`/count/licensee/${record.rentId}/detail`)
      );
    }
    render() {
      const { tableData, total } = this.state;
      const { tableLoading } = this.props;
      const searchItem =  [
        {
          label: '出资机构名称',
          key: 'rentNo',
          render() {
            return (
              <Select
                showSearch
                onChange={this.dealerNameOnChange}
                onFocus={this.dealerNameOnFocus}
                onBlur={this.dealerNameOnBlur}
                onSearch={this.dealerNameOnSearch}
                placeholder="选择出资机构"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Select.Option value="jack">Jack</Select.Option>
                <Select.Option value="lucy">Lucy</Select.Option>
                <Select.Option value="tom">Tom</Select.Option>
              </Select>
            );
          },
        },
        {
          label: '社会统一信用代码',
          key: 'dealerNo',
          render() {
            return <Input  disabled/>;
          },
        },
        {
          label: '持牌机构名称',
          key: 'dealerName',
          render() {
            return (
              <Select
                showSearch
                onChange={this.dealerNameOnChange}
                onFocus={this.dealerNameOnFocus}
                onBlur={this.dealerNameOnBlur}
                onSearch={this.dealerNameOnSearch}
                placeholder="选择持牌机构"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Select.Option value="jack">Jack</Select.Option>
                <Select.Option value="lucy">Lucy</Select.Option>
                <Select.Option value="tom">Tom</Select.Option>
              </Select>
            );
          },
        },
        {
          label: '社会统一信用代码',
          key: 'dealerNoz',
          render() {
            return <Input  disabled/>;
          },
        },
      ];
      const columns = [
        {
          title: '序号',
          dataIndex: 'index',
          width: 70,
          fixed: 'left',
        },
        {
          title: '持牌机构名称',
          dataIndex: 'rentNo',
          width: 250,
        },
        {
          title: '社会统一信用代码',
          dataIndex: 'dealerNo',
          width: 150,
        }, {
          title: '出资机构名称',
          dataIndex: 'dealerName',
          width: 350,
        }, {
          title: '社会统一信用代码',
          dataIndex: 'occurredTime',
          width: 300,
        }, {
          title: '出资方式',
          dataIndex: 'brokePosition',
          width: 300,
          render: (key)=>{
            return fundingT(key);
          },
        }, {
          title: '授信额度（元）',
          dataIndex: 'updateTime',
          width: 200,
        }, {
          title: '可用额度（元）',
          dataIndex: 'updateTime',
          width: 200,
        }, {
          title: '冻结额度（元）',
          dataIndex: 'updateTime',
          width: 200,
        }, {
          title: '已用额度（元)',
          dataIndex: 'updateTime',
          width: 200,
        }, {
          title: '累计已用额度（元）',
          dataIndex: 'updateTime',
          width: 200,
        }, {
          title: '更新时间',
          dataIndex: 'updateTime',
          width: 200,
        }, {
          title: '操作',
          width: 130,
          fixed: 'right',
          render: (text, record) => {
            if (record.index === '合计'){
              return;
            }
            return (
              <DyAction
                action={[{
                  name: '明细',
                  permission: '1007001004',
                  onClick: ()=>this.detail(record),
                }]}
              />
            );
          },
        },
      ];
      return (
        <DyControl permission="1007001" key="control">
          <DyPage>
            <DySearch
              onSearch={this.search}
              onReset={this.reset}
              searchItem={searchItem}
              openSpan={10}
            />
            <Table
              rowKey="id"
              scroll={{ x: '1500px' }}
              loading={tableLoading}
              columns={columns}
              dataSource={tableData}
              pagination={{
                total,
                defaultPageSize: 11,
              }}
              onChange={this.onTableChange}
            />
          </DyPage>
        </DyControl>
      );
    }
}

export default Index;