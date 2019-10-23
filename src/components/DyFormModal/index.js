import React, { Component } from 'react';
import { Form, Button, Modal } from 'antd';
import './index.less';
import { connect } from 'dva';
import { formItemLayout } from 'src/utils/gridInit';
@connect(({ global, loading }) => ({
  global,
}))
@Form.create({
  // 给表单赋值
  mapPropsToFields(props) {
    if (!props.global) {
      return;
    }
    let data = props.global.recordData;
    let res = Object.assign({}, data);
    for (let k in res) {
      let r = Form.createFormField({
        value: res[k],
      });
      res[k] = r;
    }
    return  {
      ...res,
    };
  },
})
class Modalform extends Component {
  componentDidMount(){
    if (this.props.onRef) {
      this.props.onRef(this);
    }
  }
  hideModal = (type) => {
    this.props.app.setState({
      [this.props.visibleName||'notexaminevisible']: false,
    });
  }
  handlenotexamine = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // confirm({
        //   title: '确认提交吗？',
        //   onOk: ()=> {

        //   },
        // });
        if (this.props.action) {
          this.props.action(values, e);
        }
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { formData } = this.props;
    return (
      <Modal
        title={null}
        width={this.props.width||'400px'}
        wrapClassName="bond-examine"
        visible={this.props.visible}
        onCancel={() => this.hideModal()}
        destroyOnClose
        footer={null}
        centered={true}
        closable={this.props.closable===false?false:true}
      >
        <p className="bond-examine-title">{this.props.title}</p>
        <Form onSubmit={this.handlenotexamine}>
          {formData.map((item) => (
            item.label?(
              <Form.Item  label={item.label} key={item.key} {...formItemLayout}>
                {getFieldDecorator(item.key, item.options||{ rules: [{ required: true, message: '必填!' }] })(
                  item.render()
                )}
              </Form.Item >
            ):(
              <Form.Item  label={item.label} key={item.key}>
                {getFieldDecorator(item.key, item.options||{ rules: [{ required: true, message: '必填!' }] })(
                  item.render()
                )}
              </Form.Item >
            )
          ))}
          <div className="formModal-buttonbox">
            <Button type="primary" htmlType="submit">
              确认
            </Button>
            {this.props.closable!==false?
              (
                <Button onClick={() => this.hideModal()}>
              取消
                </Button>
              ):''}
          </div>
        </Form>
      </Modal>
    );
  }
}
export default Modalform;