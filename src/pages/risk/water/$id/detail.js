import React, { Component } from 'react';
import { DyPage,  DyAction  } from 'dy-components';
import { Form, Input, Row, Modal, message, Spin, Button, Table, Upload } from 'antd';
import { connect } from 'dva';
import { brokePositionT } from 'src/utils/statusReturn';
import {  timeFormat, getFileList, goBack } from 'src/utils/tools';
import { formItemLayout, renderField, gutter } from 'src/utils/gridInit';
const confirm = Modal.confirm;
@connect(({ water, loading }) => ({
  water,
  tableLoading: loading.effects['water/getDetail'],
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
    let info = JSON.parse(localStorage.getItem(`waterDealerInfo${id}`));
    if (id) {
      this.props.form.setFieldsValue({
        dealerNo: info.dealerNo,
        dealerName: info.dealerName,
        rentNo: info.rentNo,
      });
      this.getDetail(id, info.rentNo);
    }
  }
  getDetail = async (id, rentNo) => {
    let res = await this.props.dispatch({
      type: 'water/getDetail',
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
          type: 'water/deletes',
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
        title: '发生时间',
        dataIndex: 'occurredTime',

      }, {
        title: '水位是否破仓',
        dataIndex: 'brokePosition',
        render: (key)=>{
          return brokePositionT(key);
        },
      }, {
        title: '更新时间',
        dataIndex: 'updateTime',

      }, {
        title: '操作',
        width: 200,
        // fixed: 'right',
        dataIndex: 'id',
        render: (id) => (
          <DyAction
            action={[{
              name: '查看附件',
              permission: '1007001003',
              onClick: ()=>this.openFile(id),
            }, {
              name: '删除',
              permission: '1007001002',
              onClick: (e)=>this.deletes(e, id),
            }]}
          />
        ),
      },
    ];
    let actionlist=[<Button key="back" onClick={(e)=>goBack(e, this)}>返回</Button> ];
    const { getFieldDecorator } = this.props.form;
    return (
      <DyPage className="user-manage-detail"
        breadcrumb={[{
          name: '风险管理',
        }, {
          name: '水位管理',
          href: '/risk/water',
        }, {
          name: '详情',
        }]}
        action={actionlist}
      >
        <Spin spinning={false}>
          <Form {...formItemLayout} >
            <Row gutter={gutter}>
              <div className="block-title">经销商信息</div>
              {renderField(getFieldDecorator, '融资编号', 'rentNo', <Input disabled />, )}
              {renderField(getFieldDecorator, '经销商名称', 'dealerName', <Input disabled />, )}
              {renderField(getFieldDecorator, '经销商编号', 'dealerNo', <Input disabled />, )}
            </Row>
            <Row gutter={gutter}>
              <div className="block-title">水位信息</div>
              <Table
                rowKey="index"
                size="small"
                loading={tableLoading}
                columns={columns}
                dataSource={tableData}
                pagination={{
                  total,
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