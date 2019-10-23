import React, { Component } from 'react';
import { DyPage } from 'dy-components';
import { Form, Input, Row, Modal, message, Spin, Button, Table, Upload } from 'antd';
import { connect } from 'dva';
import { cashT } from 'src/utils/statusReturn';
import {  timeFormat, getFileList, goBack } from 'src/utils/tools';
import { formItemLayout, renderField, gutter } from 'src/utils/gridInit';
const confirm = Modal.confirm;
@connect(({ cashLicensee, loading }) => ({
  cashLicensee,
  tableLoading: loading.effects['cashLicensee/getDetail'],
}))
@Form.create()
class index extends Component {
  state = {
    status: null,
    receivableList: [],
    payableList: [],
    receivableAmount: 0,
    payableAmount: 0,
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    if (id) {
      this.getDetail(id);
    }
  }
  getDetail = async (id) => {
    let res = await this.props.dispatch({
      type: 'cashLicensee/getDetail',
      payload: { id },
    });
    let formKey = this.props.form.getFieldsValue();
    for (let key in formKey) {
      formKey[key] = res.data[key];
    }
    this.props.form.setFieldsValue({
      ...formKey,
    });
    this.setState({
      receivableList: timeFormat(res.data.receivableList),
      payableList: timeFormat(res.data.payableList),
      payableAmount: res.data.payableAmount,
      receivableAmount: res.data.receivableAmount,
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
          type: 'cashLicensee/deletes',
          payload: { id },
        });
        message.success(res.message);
        this.getDetail(this.props.match.params.id);
      },
    });
  }
  render() {
    const { tableLoading } = this.props;
    const { receivableList, payableList } = this.state;
    const columns = [
      {
        title: '融资编号',
        dataIndex: 'rentNo',
        width: 200,
      },
      {
        title: '出资机构名称',
        dataIndex: 'fundingOrganizationName',
        width: 300,

      }, {
        title: '类型',
        dataIndex: 'cashType',
        render: (key)=>{
          return cashT(key);
        },
      }, {
        title: '应付金额(元)',
        dataIndex: 'amount',
      },
    ];
    const columns2 = [
      {
        title: '融资编号',
        dataIndex: 'rentNo',
        width: 200,
      },
      {
        title: '经销商名称',
        dataIndex: 'dealerName',
        width: 300,

      }, {
        title: '类型',
        dataIndex: 'cashType',
        render: (key)=>{
          return cashT(key);
        },
      }, {
        title: '应付金额(元)',
        dataIndex: 'amount',
      },
    ];
    let actionlist=[<Button key="back" onClick={(e)=>goBack(e, this)}>返回</Button> ];
    const { getFieldDecorator } = this.props.form;
    return (
      <DyPage className="user-manage-detail"
        breadcrumb={[{
          name: '统计管理',
        }, {
          name: '头寸管理',
          href: '/count/cash/licensee',
        }, {
          name: '详情',
        }]}
        action={actionlist}
      >
        <Spin spinning={false}>
          <Form {...formItemLayout} >
            <Row gutter={gutter}>
              <div className="block-title">经销商信息</div>
              {renderField(getFieldDecorator, '持牌机构编号', 'licenseOrganizationNo', <Input disabled />)}
              {renderField(getFieldDecorator, '持牌机构名称', 'licenseOrganizationName', <Input disabled />)}
              {renderField(getFieldDecorator, '日期', 'cDate', <Input disabled />)}
              {renderField(getFieldDecorator, '差额', 'differenceAmount', <Input disabled />)}
            </Row>
            <Row gutter={gutter}>
              <div className="block-title">应付明细列表
                <span className="rightbox">总计(元): {this.state.payableAmount}</span>
              </div>
              <Table
                rowKey="index"
                size="small"
                loading={tableLoading}
                columns={columns}
                dataSource={payableList}
                pagination={false}
              />
            </Row>
            <Row gutter={gutter} style={{ marginTop: '20px' }}>
              <div className="block-title">应收明细列表
                <span className="rightbox">总计(元): {this.state.receivableAmount}</span>
              </div>
              <Table
                rowKey="index"
                size="small"
                loading={tableLoading}
                columns={columns2}
                dataSource={receivableList}
                pagination={false}
              />
            </Row>
          </Form>
        </Spin>
      </DyPage>
    );
  }
}
export default index;