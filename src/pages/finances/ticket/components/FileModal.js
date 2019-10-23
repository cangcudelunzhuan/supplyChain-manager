import React, { Component } from 'react';
import { Button, Modal, Form, Row, Col } from 'antd';
import { DyUpload } from 'dy-components';
import { fileChange } from 'src/utils/tools';
import { gutter } from 'src/utils/gridInit';
@Form.create()
class UploadModal extends Component {
  hideModal = () => {
    this.props.close();
  }
  render() {
    const { uploadShow, fileVoListProp } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title="发票信息"
        visible={uploadShow}
        destroyOnClose
        onCancel={() => this.hideModal()}
        footer={[
          <Button key="back" onClick={() => this.hideModal()}>
            返回
          </Button>,
        ]}
      >
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
          <Row gutter={gutter}>
            <Form.Item label="发票附件" >
              <Col span={12}>
                {getFieldDecorator('fileVoList', {})(
                  <DyUpload app={this}
                    onChange={(fileName, fileList) => { fileChange(fileName, fileList, this); }}
                    fileList={fileVoListProp}
                    action={'global/toUpload'}
                    fileListName={'fileVoList'}
                    status={true}
                  />,
                )}
              </Col>
            </Form.Item>
          </Row>
        </Form>
      </Modal>
    );
  }
}
export default UploadModal;