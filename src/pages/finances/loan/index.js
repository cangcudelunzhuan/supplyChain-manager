import React, { Component } from 'react';
import { DyPage, DyAction } from 'dy-components';
import { Table, Form, Tag } from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
@connect(({ loan, loading  }) => ({
  loan,
  tableLoading: loading.effects['loan/getList'],
}))
@Form.create()
class index extends Component {
    state = {
      tableData: [],
      total: 0,
      current: 1,
      selectedRowKeys: [],
      visible: false,
    }
    componentDidMount() {
      this.getTableData({
        current: 1,
      });
    }
    // 获取表格数据
    getTableData = (payload) => {
      this.props.dispatch({
        type: 'loan/getList',
        payload,
      }).then((res) => {
        this.setState({
          tableData: res.list,
          total: res.pagination.total,
          current: res.pagination.current,
        });
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
    // 审核
    detail = (id) => {
      this.props.dispatch(routerRedux.push(`/finances/loan/${id}`));
    }

    render() {
      const { tableData, total, current } = this.state;
      const { tableLoading } = this.props;
      const columns = [
        {
          title: '序号',
          dataIndex: 'index',
        },
        {
          title: '租赁编号',
          dataIndex: 'finacingNo',
        }, {
          title: '公司名称',
          dataIndex: 'companyName',
        }, {
          title: '客户编号',
          dataIndex: 'companyNo',
        }, {
          title: '采购订单货值（元）',
          dataIndex: 'orderValue',
        }, {
          title: '资金标记',
          dataIndex: 'fundsMark',
          render: (status, record) => {
            switch (status) {
            case '出金':
              return <Tag color="red">出金</Tag>;
            case '入金':
              return <Tag color="green">入金</Tag>;
            default:
              break;
            }
          },
        }, {
          title: '发生金额（元）',
          dataIndex: 'fundsAmount',
        }, {
          title: '银行名称',
          dataIndex: 'bankName',
        }, {
          title: '审核状态',
          dataIndex: 'status',
          render: (status) => {
            switch (status) {
            case 1:
              return <Tag color="#40a9ff">待审核</Tag>;
            case 2:
              return <Tag color="#87d068">审核通过</Tag>;
            case 3:
              return <Tag color="#f50">审核不通过</Tag>;
            default:
              break;
            }
          },
        },
        {
          title: '操作时间',
          dataIndex: 'updateTime',
        }, {
          title: '操作',
          width: 130,
          render: (data) => (
            <DyAction
              action={[{
                name: data.status===1? '审核':'详情',
                onClick: ()=>this.detail(data.id),
              }]}
            />
          ),
        }, {
          title: '备注',
          dataIndex: 'remark',
          width: 150,
        },
      ];
      return (
        <DyPage>
          <Table
            rowKey="id"
            loading={tableLoading}
            columns={columns}
            dataSource={tableData}
            // rowSelection={{
            //   selectedRowKeys,
            //   onChange: this.onSelectChange,
            //   fixed: true,
            //   getCheckboxProps: (record) => ({
            //     disabled: record.id === '',
            //   }),
            // }}
            pagination={{
              total,
              current,
            }}
            scroll={{ x: 1700 }}
            onChange={this.onTableChange}
          />
        </DyPage>
      );
    }
}
export default index;