import React, { Component } from 'react';
import { Form, Row, Input, Modal, Button, Select } from 'antd';
import { renderFieldAllLine, gutter } from 'src/utils/gridInit';
import { connect } from 'dva';
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: { span: 12 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};
@connect()
@Form.create()
class Dy extends Component {
    hideModal = () => {
      this.props.app.setState({
        [this.props.visibleName || 'visible']: false,
      });
    }
    ok = () => {
      const value = this.props.form.getFieldsValue();
      this.props.ok(value);
    }
    not = () => {
      this.props.app.setState({
        visible: false,
      });
      if (this.props.not) {
        this.props.not();
      }
    }
    // 数值改变清空指派相关信息
    cleartOrder = () => {
      this.props.form.setFieldsValue({
        licenseOrganizationName: '',
        licenseOrganizationAddress: '',
        contactName: '',
        contactMobilePhone: '',
      });
    }
    // 通过编号获取相关信息
    getRelaInfo = (licenseName) => {
      if (licenseName && licenseName.length === 10) {
        this.props.dispatch({
          type: 'dealerLimit/getLicense',
          payload: { id: licenseName },
        }).then((res) => {
          const data = res.data;
          let licenseOrganizationName = data.licenseOrganizationName;
          let licenseOrganizationAddress = data.licenseOrganizationAddress;
          let contactName = data.contactName;
          let contactMobilePhone = data.contactMobilePhone;
          this.props.form.setFieldsValue({
            licenseOrganizationName,
            licenseOrganizationAddress,
            contactName,
            contactMobilePhone,
          });
          this.setState({
            licenseId: data.id,
          });
        });
      } else {
        this.cleartOrder();
      }
    }
    onChange = (value) => {
      this.cleartOrder();
      console.log(value);
    }
    onBlur = () => {
      console.log('blur');
    }
    onFocus = () => {
      console.log('focus');
    }
    onSearch = (value) => {
      console.log(value);
    }
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <Modal
          title={null}
          width={'500px'}
          wrapClassName="bond-examine"
          visible={this.props.visible}
          onCancel={this.hideModal}
          destroyOnClose
          footer={[
            <Button key="confirm" type="primary" onClick={this.ok}>确认</Button>,
            <Button key="cancel" onClick={this.hideModal}>取消</Button>]}
          centered={true}
        >
          <div className="buttonbox">
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Row gutter={gutter}>
                {renderFieldAllLine(getFieldDecorator, '持牌机构名称', 'licenseOrganizationNo',
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="输入持牌机构名称"
                    optionFilterProp="children"
                    onChange={this.getRelaInfo}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    onSearch={this.onSearch}
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="2000022203">2000022203</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                  </Select>,
                )}
                {renderFieldAllLine(getFieldDecorator, '持牌机构名称', 'licenseOrganizationName', <Input disabled />)}
                {renderFieldAllLine(getFieldDecorator, '持牌机构地址', 'licenseOrganizationAddress', <Input disabled />)}
                {renderFieldAllLine(getFieldDecorator, '联系人姓名', 'contactName', <Input disabled />)}
                {renderFieldAllLine(getFieldDecorator, '联系人手机号', 'contactMobilePhone', <Input disabled />)}

              </Row>
            </Form>

          </div>
        </Modal>
      );
    }
}

export default Dy;