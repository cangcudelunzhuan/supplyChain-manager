import React, { Component } from 'react';
import { DyPage, DySearch, DyAction } from 'dy-components';
import { Table, Form, Input, Button, Upload, Icon,  DatePicker, message, Modal, Divider, Badge } from 'antd';
import { connect } from 'dva';
import './productStatistics.less';
import formats from 'src/utils/filter';
import moment from 'moment';
const confirm = Modal.confirm;
const { RangePicker } = DatePicker;
@connect(({ productStatistics, loading  }) => ({
  productStatistics,
  tableLoading: loading.effects['productStatistics/list'],
  uploading: loading.effects['productStatistics/toupload'],
  deleteloading: loading.effects['productStatistics/todelete'],
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
      searchfilter: null,
      searchItem: [
        {
          label: '公司名称',
          key: 'companyName',
          render() {
            return <Input placeholder="请输入公司名称" />;
          },
        },
        {
          label: '商品名称',
          key: 'goodsName',
          render() {
            return <Input placeholder="请输入商品名称" />;
          },
        },
        {
          label: '统计时间',
          key: 'date',
          render() {
            return (
              <RangePicker format="YYYY-MM-DD"
                disabledDate={(e)=>{ return e && e > moment().endOf('day') ; }}/>
            );
          },
        },
        {
          label: '菜鸟账号',
          key: 'rookieAccount',
          render() {
            return <Input placeholder="请输入菜鸟账号" />;
          },
        },
      ],
    }
    componentDidMount() {
      this.getTableData({
        currentPage: 1,
      });
    }
    // 获取表格数据
    getTableData = async (payload) => {
      let res = await this.props.dispatch({
        type: 'productStatistics/list',
        payload,
      });
      this.setState({
        tableData: res.list,
        total: res.pagination.total,
        current: res.pagination.current,
      });
    }
    // 搜索
    search = (datas) => {
      // const formSearch = this.props.form.getFieldsValue();
      let data = datas || {};
      if(data.date&&data.date[0]){
        data.startTime = formats.formatDate(data.date[0]);
        data.endTime = formats.formatDate(data.date[1]);
      }
      delete data.date;
      this.getTableData({
        currentPage: 1,
        ...data,
      });
      this.setState({
        searchfilter: data,
        selectedRowKeys: [],
      });
    }
    // 重置
    reset = (data) => {
      this.props.form.resetFields();
      this.getTableData({ current: 1  });
      this.setState({
        searchfilter: null,
        selectedRowKeys: [],
      });
    }
    // 日期选择
    dateonChange = (value) => {
    //  console.log('date', value);
    }
    // 分页改变
    onTableChange = (pagination) => {
    //  console.log('page', pagination);
      this.getTableData({
        currentPage: pagination.current,
      });
      this.setState({
        selectedRowKeys: [],
      });
    }
    // table多行选择
    onSelectChange = (selectedRowKeys) => {
      this.setState({ selectedRowKeys });
    }
    // 删除
    delete = () => {
      confirm({
        title: '确认删除吗？',
        content: `已选择${this.state.selectedRowKeys.length}项`,
        onOk: async ()=> {
          let res = await this.props.dispatch({
            type: 'productStatistics/todelete',
            payload: [...this.state.selectedRowKeys],
          });
          message.success('删除成功！');
          this.setState({ selectedRowKeys: [] });
          this.search(this.state.searchfilter);
        },
      });
    }
    // 导入
    beforeUpload = () => {
      return false;
    }
    onChange = (info) => {
      let formData = new FormData();
      formData.append('file', info.file);
      this.props.dispatch({
        type: 'productStatistics/toupload',
        payload: formData,
      }).then((res) => {
        message.success('导入成功');
        this.search(this.state.searchfilter);
      });
    }
    render() {
      const { tableData, selectedRowKeys, total, current } = this.state;
      const { tableLoading, uploading } = this.props;
      const columns = [{
        title: '公司名称',
        key: 'companyName',
        dataIndex: 'companyName',
      }, {
        title: '仓储公司',
        key: 'warehouseName',
        dataIndex: 'warehouseName',
      },
      {
        title: '菜鸟账号',
        dataIndex: 'rookieAccount',
        key: 'rookieAccount',
        render: (text, record) => {
          if (record.id!=='合计') {
            return (
              <div>
                <div className="table-line">{record.rookieName} {record.rookieAccount} </div>
              </div>
            );
          } else {
            return (
              <div>
                {record.rookieName}
              </div>
            );
          }
        },
      },
      // {
      //   title: '菜鸟账号',
      //   dataIndex: 'rookieAccount',
      //   key: 'rookieAccount',
      // },
      // {
      //   title: '菜鸟账号所有人',
      //   key: 'rookieName',
      //   dataIndex: 'rookieName',
      // },
      {
        title: '仓单编号',
        key: 'warehouseBillNo',
        dataIndex: 'warehouseBillNo',
      }, {
        title: '商品名称',
        dataIndex: 'goodsName',
        key: 'goodsName',
      },  {
        title: '库存数量',
        key: 'totalCount',
        dataIndex: 'totalCount',
      },
      {
        title: '总出库量（台）',
        key: 'totalCountOut',
        dataIndex: 'totalCountOut',
      }, {
        title: '总入库量（台）',
        key: 'totalCountIn',
        dataIndex: 'totalCountIn',
      },
      {
        title: '监管物价格（元）',
        key: 'goodsPrice',
        dataIndex: 'goodsPrice',
      }, {
        title: '在仓货值（元）',
        key: 'warehouseGoodsPrice',
        dataIndex: 'warehouseGoodsPrice',
      },
      {
        title: '操作时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
      },
      ];
      const extendBtn = [
        <Upload action="" accept=".xlsx" key="upload"
          beforeUpload={this.beforeUpload}
          onChange={this.onChange} showUploadList={false}>
          <Button type="primary" loading={uploading}  icon="upload">
            导入
          </Button>
        </Upload>,
        <Button key="delete" onClick={this.delete} disabled={selectedRowKeys.length === 0}>删除</Button>,
      ];
      return (
        <div className="tablebox">
          <DyPage>
            <DySearch
              onSearch={this.search}
              onReset={this.reset}
              extendBtn={extendBtn}
              selectedRowKeys={selectedRowKeys}
              searchItem={this.state.searchItem}
            />
            <Table
              rowKey="id"
              loading={tableLoading}
              columns={columns}
              dataSource={tableData}
              // scroll={{ x: '130%' }}
              rowSelection={{
                selectedRowKeys,
                onChange: this.onSelectChange,
                fixed: true,
                getCheckboxProps: (record) => ({
                  disabled: record.id === '合计',
                }),
              }}
              pagination={{
                total,
                // pageSize: 11,
                defaultPageSize: 11,
                current,
              }}
              scroll={{ x: 1800 }}
              onChange={this.onTableChange}
            />
            <span className="sumfont">合计</span>
          </DyPage>
        </div>
      );
    }
}
export default index;
