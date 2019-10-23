import React, { Component } from 'react';
import { DyPage,  DyAction  } from 'dy-components';
import { Form, Input, Row, Modal, message, Spin, Button, Table, Upload, Select } from 'antd';
import { connect } from 'dva';
import { propertyType, moneyType, creditType } from 'src/utils/statusData';
import {  fundingT, sourceT, moneyT, creditT } from 'src/utils/statusReturn';
import {  timeFormat, getFileList, goBack } from 'src/utils/tools';
import { formItemLayout, renderField, gutter } from 'src/utils/gridInit';
const confirm = Modal.confirm;
@connect(({ distributor, loading }) => ({
  distributor,
  tableLoading: loading.effects['distributor/getDetail'],
}))
@Form.create()
class index extends Component {
  state = {
    status: null,
    total: 0,
    tableData: [],
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    if (id) {
      this.getDetail(id, 1212);
    }
  }
  getDetail = async (id, rentNo) => {
    let res = await this.props.dispatch({
      type: 'distributor/getDetail',
      payload: { id, rentNo },
    });
    this.setState({
      tableData: timeFormat(res.list),
      total: res.pagination.total,
    });
  }
  // 查看附件
  openFile = (id) => {
    let arr = this.state.tableData.filter((item)=>{
      return item.id === id;
    });
    Modal.success({
      title: '附件详情',
      centered: true,
      okText: '关闭',
      content: (
        <div>
          <Upload fileList={getFileList(arr[0].fileVoList)}/>
        </div>
      ),
    });
  }
  // 删除
  deletes = (e, id) => {
    confirm({
      title: '删除后记录不可恢复，是否确认删除？',
      centered: true,
      onOk: async ()=> {
        e.persist();
        let res = await this.props.dispatch({
          type: 'distributor/deletes',
          payload: { id },
        });
        message.success(res.message);
        this.getDetail(this.props.match.params.id);
      },
    });
  }
  render() {
    const { tableLoading } = this.props;
    const { tableData, total } = this.state;
    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
      },
      {
        title: '融资编号',
        dataIndex: 'occurredTime',

      }, {
        title: '出资方式',
        dataIndex: 'brokePosition',
        render: (key)=>{
          return fundingT(key);
        },
      }, {
        title: '资产类型',
        dataIndex: 'brokePosition',
        render: (key)=>{
          return sourceT(key);
        },
      }, {
        title: '支付方式',
        dataIndex: 'brokePosition',
        render: (key)=>{
          return moneyT(key);
        },
      }, {
        title: '总货值（元）',
        dataIndex: 'occurredTime',

      }, {
        title: '冻结额度（元）',
        dataIndex: 'occurredTime',

      }, {
        title: '用款金额（元）',
        dataIndex: 'occurredTime',

      }, {
        title: '赎回金额（元）',
        dataIndex: 'occurredTime',

      }, {
        title: '更新时间',
        dataIndex: 'updateTime',

      },
    ];
    let actionlist=[<Button key="back" onClick={(e)=>goBack(e, this)}>返回</Button> ];
    const { getFieldDecorator } = this.props.form;
    return (
      <DyPage className="user-manage-detail"
        breadcrumb={[{
          name: '数据统计',
        }, {
          name: '经销商额度统计',
          href: '/count/distributor',
        }, {
          name: '明细',
        }]}
        action={actionlist}
      >
        <Spin spinning={tableLoading}>
          <Form {...formItemLayout} >
            <Row gutter={gutter}>
              <div className="block-title">融资额度详情</div>
              {renderField(getFieldDecorator, '经销商名称', 'xxxxxx', <Input disabled />, )}
              {renderField(getFieldDecorator, '社会统一信用代码', 'xxxxxxx', <Input disabled />, )}
              {renderField(getFieldDecorator, '融资额度（元）', 'xxxxxxx', <Input disabled />, )}
              {renderField(getFieldDecorator, '可用额度（元）', 'xxxxxxx', <Input disabled />, )}
              {renderField(getFieldDecorator, '持牌机构名称', 'zzzzzz', <Select placeholder="请选择" >
                {propertyType.map((item)=>{
                  return (<Select.Option  value={item.id} key={item.id}>{item.name}</Select.Option>);
                })}
              </Select>)}
              {renderField(getFieldDecorator, '社会统一信用代码', 'xxxxxxx', <Input disabled />, )}
              {renderField(getFieldDecorator, '资产类型', 'sourceType', <Select placeholder="请选择" >
                {propertyType.map((item)=>{
                  return (<Select.Option  value={item.id} key={item.id}>{item.name}</Select.Option>);
                })}
              </Select>)}
              {renderField(getFieldDecorator, '支付方式', 'payWay', <Select placeholder="请选择" >
                {moneyType.map((item)=>{
                  return (<Select.Option  value={item.id} key={item.id}>{item.name}</Select.Option>);
                })}
              </Select>,
              )}
              {renderField(getFieldDecorator, '冻结额度（元）', 'xxxxxxx', <Input disabled />, )}
              {renderField(getFieldDecorator, '已用额度（元）', 'xxxxxxx', <Input disabled />, )}
              {renderField(getFieldDecorator, '累计已用额度（元）', 'xxxxxxx', <Input disabled />, )}
            </Row>
            <Row gutter={gutter}>
              <div className="block-title">额度使用明细</div>
              <Table
                rowKey="index"
                size="small"
                loading={tableLoading}
                columns={columns}
                dataSource={tableData}
                scroll={{ x: '1500px' }}
                pagination={{
                  total,
                  defaultPageSize: 11,
                }}
              />
            </Row>
          </Form>
        </Spin>
      </DyPage>
    );
  }
}
export default index;