import React, { Component } from 'react';
import { Table, Form } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { DyPage, DySearch, DyAction, DyControl } from 'dy-components';
import { isContain } from 'src/utils/tools';
import moment from 'moment';
import './index.less';

@connect(({ lease, loading }) => ({
  lease,
  tableLoading: loading.effects['lease/getList'],
}))
@Form.create()
class Index extends Component {

  state = {
    tableData: [],
    total: 0,
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
  getTableData = (payload) => {
    this.props.dispatch({
      type: 'lease/getList',
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
      current: pagination.current,
    });
    this.setState({
      selectedRowKeys: [],
    });
  }
  // table多行选择
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }
  // 详情
  detail = async (id, payType, sourceType) => {
    if (payType === 2) {
      this.props.dispatch(
        routerRedux.push(`/business/lease/${id}/bill`)
      );
    } else if (sourceType === 1) {
      this.props.dispatch(
        routerRedux.push(`/business/lease/${id}/cash`)
      );
    } else {
      this.props.dispatch(
        routerRedux.push(`/business/lease/${id}/collateral`)
      );
    }
  }
  render() {
    const { tableData, selectedRowKeys, total, current } = this.state;
    const { tableLoading } = this.props;
    const columns = [{
      title: '融资编号',
      dataIndex: 'rentNo',
      render: (data) => {
        return data ? data : '/';
      },
    }, {
      title: '合同编号',
      dataIndex: 'orderNo',
    }, {
      title: '资产类型',
      dataIndex: 'sourceType',
      render: (t) => {
        switch (t) {
        case 1:
          return '采购订单';
        case 2:
          return '质/抵押物清单';
        default:
          break;
        }
      },
    }, {
      title: '经销商名称',
      dataIndex: 'dealerName',
    }, {
      title: '经销商编号',
      dataIndex: 'dealerNo',
    }, {
      title: '融资金额（元）',
      dataIndex: 'tradeAmount',
      render: (data) => {
        return data ? data : '/';
      },
    }, {
      title: '支付方式',
      dataIndex: 'payWay',
      render: (t) => {
        switch (t) {
        case 1:
          return '现金';
        case 2:
          return '银票';
        default:
          break;
        }
      },
    }, {
      title: '金融服务费率（%）',
      dataIndex: 'rentRate',
      render: (data) => {
        return data ? data : '/';
      },
    }, {
      title: '融资到期日',
      dataIndex: 'expireDate',
      render: (data) => {
        if (data) {
          return <span style={{ color: moment().isBefore(moment(data).subtract(7, 'day')) ? '' : 'red' }}>{data}</span>;
        }
        else {
          return '/';
        }
      },
    }, {
      title: '业务状态',
      dataIndex: 'businessType',
    }, {
      title: '审核状态',
      dataIndex: 'auditStatus',
    }, {
      title: '操作时间',
      dataIndex: 'updateTime',
    }, {
      title: '操作',
      fixed: 'right',
      width: 140,
      render: (data) => {
        switch (data.businessStatus) {
        case 1:
          return (
            <div className="a-action-btn">
              {isContain(1002003002) && <a onClick={() => this.detail(data.id, data.payWay, data.sourceType)}>租赁申请</a>}
              {isContain(1002003002) ? '' : isContain(1002003001) && <a onClick={() => this.detail(data.id, data.payWay, data.sourceType)}>详情</a>}
            </div>
          );
        case 2:
          return (
            <DyAction
              action={[{
                name: '融资审核',
                permission: 1002003005,
                onClick: () => this.detail(data.id, data.payWay, data.sourceType),
              }, isContain(1002003005) ? '' : {
                name: '详情',
                permission: 1002003001,
                onClick: () => this.detail(data.id, data.payWay, data.sourceType),
              },
              ]}
            />
          );
        case 3:
          return (
            <DyAction
              action={[{
                name: '风控审核',
                permission: 1002003006,
                onClick: () => this.detail(data.id, data.payWay, data.sourceType),
              }, isContain(1002003006) ? '' : {
                name: '详情',
                permission: 1002003001,
                onClick: () => this.detail(data.id, data.payWay, data.sourceType),
              },
              ]}
            />
          );
        case 4:
          return (
            <DyAction
              action={[{
                name: '确认', // 转融资待 项目经理确认
                permission: 1002003008,
                onClick: () => this.detail(data.id, data.payWay, data.sourceType),
              }, isContain(1002003008) ? '' : {
                name: '详情',
                permission: 1002003001,
                onClick: () => this.detail(data.id, data.payWay, data.sourceType),
              },
              ]}
            />
          );

        case 13:
          return (
            <DyAction
              action={[{
                name: '银行确认', // 用款风控审核---》银行确认
                permission: 1002003007,
                onClick: () => this.detail(data.id, data.payWay, data.sourceType),
              }, isContain(1002003007) ? '' : {
                name: '详情',
                permission: 1002003001,
                onClick: () => this.detail(data.id, data.payWay, data.sourceType),
              },
              ]}
            />
          );
        case 8:
          return (
            <DyAction
              action={[{
                name: '确认', // 用款 项目经理确认
                permission: 1002003009,
                onClick: () => this.detail(data.id, data.payWay, data.sourceType),
              }, isContain(1002003009) ? '' : {
                name: '详情',
                permission: 1002003001,
                onClick: () => this.detail(data.id, data.payWay, data.sourceType),
              },
              ]}
            />
          );
        case 11:
          return (
            <DyAction
              action={[{
                name: '确认', // 待收票
                permission: 1002003004,
                onClick: () => this.detail(data.id, data.payWay, data.sourceType),
              }, isContain(1002003004) ? '' : {
                name: '详情',
                permission: 1002003001,
                onClick: () => this.detail(data.id, data.payWay, data.sourceType),
              },
              ]}
            />
          );
        case 99:
          return (
            <div className="a-action-btn">
              {isContain(1002003003) && (data.isReapply === 1) && <a onClick={() => this.detail(data.id, data.payWay, data.sourceType)}>重新申请</a>}
              {isContain(1002003003) ? '' : <a onClick={() => this.detail(data.id, data.payWay, data.sourceType)}>详情</a>}
              {isContain(1002003003) && (data.isReapply === 2) ? <a onClick={() => this.detail(data.id, data.payWay, data.sourceType)}>详情</a> : ''}
            </div>
          );
        default:
          return (
            <DyAction
              action={[{
                name: '详情',
                permission: 1002003001,
                onClick: () => this.detail(data.id, data.payWay, data.sourceType),
              },
              ]}
            />
          );
        }

      },
    }];
    const extendBtn = [];
    return (
      <DyControl permission="1002003" key="control">
        <DyPage
          className="business-lease"
        >
          <DySearch
            extendBtn={extendBtn}
            selectedRowKeys={selectedRowKeys}
          />
          <Table
            rowKey="id"
            loading={tableLoading}
            columns={columns}
            dataSource={tableData}
            scroll={{ x: 1800 }}
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