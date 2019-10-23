import React, { Component } from 'react';
import { Form, Input, Row, Button, Table, message } from 'antd';
import { DyPage, DyControl } from 'dy-components';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { isContain, timeFormat, goBack } from 'src/utils/tools';
import { ticketS, ticketT } from 'src/utils/statusReturn';
import '../../../index.less';
import { formItemLayout, renderField, gutter } from 'src/utils/gridInit';

@connect(({ ticketTrade, loading }) => ({
  ticketTrade,
  tableLoading: loading.effects['ticketTrade/getOpenDetail'],
}))
@Form.create()
class Index extends Component {
  state = {
    tableData: [],
  }
  componentDidMount() {
    this.getDetail();
  }
  // 获取详情
  getDetail = async () => {
    let id = this.props.match.params.id;
    let res = await this.props.dispatch({
      type: 'ticketTrade/getOpenDetail',
      payload: { id },
    });
    let formKey = this.props.form.getFieldsValue();
    for (let key in formKey) {
      formKey[key] = res.data[key];
    }
    this.setState({ tableData: res.data.tradeBillRentListVoList });
    this.props.form.setFieldsValue({
      ...formKey,
    });
  }
  // 展示退票弹窗
  returnTicket = (id) => {
    this.setState({
      remarkShow: true,
      id,
    });
  }
  // 发送退票信息到后端
  dealResult = async (data) => {
    let values = {};
    values.id = this.state.id;
    values.remark = data.remark;
    let res = await this.props.dispatch({
      type: 'ticketTrade/putRefund',
      payload: values,
    });
    message.success('退票成功！');
    this.setState({ remarkShow: false });
    this.getDetail();
  }

  // 开票 审核 查看详情
  actions = (ids, actionType, ticketType, maxValue) => {
    let id = this.props.match.params.id;
    this.props.dispatch(
      routerRedux.push(`/finances/ticket/trade/${id}/${ids}?dealType=open&&ticketType=${ticketType}&&actionType=${actionType}&&maxValue=${maxValue}`)
    );
  }

  render() {
    const { tableData } = this.state;
    const { tableLoading } = this.props;
    let action = [<Button key="back" onClick={(e)=>goBack(e, this)}>返回</Button>];
    const columns = [{
      title: '租赁编号',
      dataIndex: 'rentNo',
    }, {
      title: '租赁日期',
      dataIndex: 'startDate',
    }, {
      title: '总货值（元）',
      dataIndex: 'totalGoodsValue',
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
      title: '开票金额（元）',
      dataIndex: 'goodsAmount',
    }, {
      title: '已收票金额元）',
      dataIndex: 'checkAmount',
    }, {
      title: '待开票金额（元）',
      dataIndex: 'toOpenAmount',
    }, {
      title: '已开票金额（元）',
      dataIndex: 'openAmount',
    }, {
      title: '税票类型',
      dataIndex: 'ticketType',
      render: (data) => {
        return ticketT(data);
      },
    }, {
      title: '状态',
      width: 80,
      dataIndex: 'status',
      render: (data) => {
        return ticketS(data);
      },
    }, {
      title: '操作',
      width: 160,
      fixed: 'right',
      render: (record) => {
        return (
          <div className="ticket-btn">
            {isContain(1005004001007) && record.openAmount !== '0' && <a size="small" onClick={() => this.actions(record.id, 'detail', record.ticketType)} type="primary">查看</a>}
            {isContain(1005004001009) && record.status === 4 && <a size="small" onClick={() => this.actions(record.id, 'check', record.ticketType)} type="primary">审核</a>}
            {isContain(1005004001008) && record.status === 3 && record.toOpenAmount !== '0' && <a size="small" onClick={() => this.actions(record.id, 'add', record.ticketType, record.toOpenAmount)} type="primary">上传发票</a>}
          </div>
        );
      },
    },
    ];
    const { getFieldDecorator } = this.props.form;
    return (
      <DyControl permission="1005004001006" key="control">
        <DyPage
          className="user-manage-detail"
          breadcrumb={[{
            name: '财务管理',
          }, {
            name: '票务管理',
          }, {
            name: '贸易票据',
            href: '/finances/ticket/trade',
          }, {
            name: '贸易票据详情',
          }]}
          action={action}
        >
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Row gutter={gutter}>
              <div className="block-title">开票录入</div>
              {renderField(getFieldDecorator, '经销商', 'dealerName', <Input disabled />)}
              {renderField(getFieldDecorator, '经销商编号', 'dealerNo', <Input disabled />)}
              {renderField(getFieldDecorator, '累计开票金额（元）', 'totalGoodsAmount', <Input disabled />)}
              {renderField(getFieldDecorator, '累计已收票金额（元）', 'totalCheckAmount', <Input disabled />)}
              {renderField(getFieldDecorator, '累计待开票金额（元）', 'totalToBeOpenAmount', <Input disabled />)}
              {renderField(getFieldDecorator, '累计已开票金额（元）', 'totalOpenAmount', <Input disabled />)}
            </Row>
            <Row gutter={gutter}>
              <div className="block-title">该笔授信对应的租赁年度计划</div>
              <Table
                rowKey="id"
                size="small"
                loading={tableLoading}
                columns={columns}
                dataSource={timeFormat(tableData)}
                onChange={this.onTableChange}
                scroll={{ x: 1300 }}
                pagination={false}
              />
            </Row>
          </Form>
        </DyPage>
      </DyControl>
    );
  }
}

export default Index;