import React, { Component } from 'react';
import { DyPage, DyUpload } from 'dy-components';
import { Form, Input, Row,  Modal, message, Spin, DatePicker, Button, Radio } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import formats from 'src/utils/filter';
import { isContain, goBack } from 'src/utils/tools';
import { formItemLayout_1, renderFieldAllLine, gutter } from 'src/utils/gridInit';
const confirm = Modal.confirm;
@connect(({ water, loading }) => ({
  water,
}))
@Form.create()
class index extends Component {
  state = {
    status: null,
    licenseList: [],
    fileParamList: [],
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    let info = JSON.parse(localStorage.getItem(`waterDealerInfo${id}`));
    this.props.form.setFieldsValue({
      brokePosition: 1,
      dealerName: info.dealerName,
      rentNo: info.rentNo,
    });
  }

  // 提交
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.id = this.props.match.params.id;
        values.occurredTime = formats.formatDate(values.occurredTime);
        confirm({
          title: '确认新增此项？',
          onOk: async () => {
            e.persist();
            let res = await this.props.dispatch({
              type: 'water/add',
              payload: values,
            });
            message.success(res.message);
            goBack(e, this);
          },
        });
      }
    });
  }
  render() {
    let actionlist = [<Button key="back" onClick={(e) => goBack(e, this)}>返回</Button>];
    if (isContain('1007001001')) {
      actionlist.push(<Button key="audit" type="primary" onClick={this.handleSubmit}>新增</Button>);
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <DyPage className="user-manage-detail"
        breadcrumb={[{
          name: '风险管理',
        }, {
          name: '水位管理',
          href: '/risk/water',
        }, {
          name: '新增',
        }]}
        action={actionlist}
      >
        <Spin spinning={false}>
          <Form {...formItemLayout_1} >
            <Row gutter={gutter}>
              <div className="block-title">基本信息</div>
              {renderFieldAllLine(getFieldDecorator, '融资编号', 'rentNo', <Input disabled />,)}
              {renderFieldAllLine(getFieldDecorator, '经销商名称', 'dealerName', <Input disabled />)}
              {/* {renderFieldAllLine(getFieldDecorator,'经销商编号', 'dealerId',
                <Select placeholder="请选择经销商编号" onChange={this.changechp}>
                  {
                    this.state.licenseList.map((item, i) => {
                      return (<Select.Option key={i} value={item.id}>{item.dealerNo}</Select.Option>);
                    })
                  }
                </Select>, {
                  rules: [{ required: true, message: '请选择经销商编号!' }],
                })} */}
              {renderFieldAllLine(getFieldDecorator, '发生时间', 'occurredTime',
                <DatePicker format="YYYY-MM-DD"
                  disabledDate={(e) => { return e && e < moment().endOf('day'); }} />,
                {
                  rules: [
                    { required: true, message: '请选择发生时间！' },
                  ],
                }
              )}
              {renderFieldAllLine(getFieldDecorator, '水位是否破仓', 'brokePosition',
                <Radio.Group >
                  <Radio value={1}>否</Radio>
                  <Radio value={2}>是</Radio>
                </Radio.Group>)}
              {renderFieldAllLine(getFieldDecorator, '上传附件', 'fileParamList',
                <DyUpload app={this}
                  fileList={this.state.fileParamList}
                  fileListName={'fileParamList'}
                />)}
            </Row>
          </Form>
        </Spin>
      </DyPage>
    );
  }
}
export default index;