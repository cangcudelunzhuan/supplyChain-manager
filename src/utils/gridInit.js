import { Form, Col } from 'antd';

/**
 * gutter 通用删格间距 （8-16-24-32-40-48）
 */
const gutter = 8;


/**
 * @object formItemLayout 通用form中的label与wraper比例
 */
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

/**
 * @object formItemLayout_1 form中的label与wraper一列布局 确保与formItemLayout比例对其
 */
const formItemLayout_1 = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 },
};


/**
 * @method renderField form表单渲染 2列布局
 */
const renderField = (getFieldDecorator, label, key, component, options = {}) => {
  return (
    <Col span={12}>
      <Form.Item
        label={label}
      >
        {key ? getFieldDecorator(key, options)(component) : component}
      </Form.Item>
    </Col>
  );
};

/**
 * @method renderField form表单渲染 1列布局
 */

const renderFieldAllLine = (getFieldDecorator, label, key, component, options = {}) => {
  return (
    <Col span={24}>
      <Form.Item
        label={label}
      >
        {key ? getFieldDecorator(key, options)(component) : component}
      </Form.Item>
    </Col>
  );
};

module.exports = {
  formItemLayout_1,
  formItemLayout,
  renderField,
  renderFieldAllLine,
  gutter,
};