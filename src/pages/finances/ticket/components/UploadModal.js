import React, { Component } from 'react';
import { Button, Modal, Input, Form, Row, Col } from 'antd';
import {  DyUpload } from 'dy-components';
import{ fileChange } from 'src/utils/tools';
import { gutter } from 'src/utils/gridInit';
const { TextArea } = Input;
@Form.create()
class UploadModal extends Component {
  constructor(props){
    super(props);
    this.state={
      fileVoList: [],
      visible: this.props.visible,
    };
  }
  hideModal = () => {
    this.setState({
      fileVoList: [],
    });
    this.props.close();
  }
  submission = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.action({ ...values, fileParamList: this.state.fileVoList });
      }
    });
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.visible === prevState.visible) {
      return{ fileVoList: [] };
    } else return null;
  }
  render() {
    const { visible, type, fileVoListProp } = this.props;
    const { fileVoList }=this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title="发票信息"
        visible={visible}
        destroyOnClose
        onCancel={()=>this.hideModal()}
        footer={[
          <Button key="back" onClick={() => this.hideModal()}>
          返回
          </Button>,
          type==='deal'?(
            <Button key="submit" type="primary" disabled={fileVoList.length===0?true:false}
              onClick={this.submission}>
          提交
            </Button>
          ):'',
        ]}
      >
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} onSubmit={this.submission}>
          <Row gutter={gutter}>
            <Form.Item  label="发票附件" >
              <Col span={12}>
                {getFieldDecorator('fileVoList', {})(
                  <DyUpload app={this}
                    onChange={(fileName, fileList)=>{ fileChange(fileName, fileList, this) ; }}
                    fileList={type==='deal'?fileVoList:fileVoListProp}
                    action={'global/toUpload'}
                    filename= {'fileVoList'}
                    status={type==='deal'?false:true}
                  />,
                )}
              </Col>

            </Form.Item>
            {type==='deal'&& (
              <Form.Item label="备注信息"style={{ marginTop: '80px' }}>
                <Col span={18}>
                  {getFieldDecorator('remark', {})(
                    <TextArea maxLength={20}  placeholder="在此处填写备注信息"></TextArea>,
                  )}
                </Col>
              </Form.Item>
            )}
          </Row>
        </Form>
      </Modal>
    );
  }
}
export default UploadModal;