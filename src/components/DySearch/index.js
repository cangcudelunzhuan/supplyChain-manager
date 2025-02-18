import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Form, Row, Col, Button, Icon } from 'antd';
import './index.less';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 15 },
};

@Form.create()
class gySearch extends Component {
  static propTypes = {
    searchItem: PropTypes.array,
    onSearch: PropTypes.func,
    onReset: PropTypes.func,
    extendBtn: PropTypes.node,
    selectedRowKeys: PropTypes.array,
  };
  static defaultProps = {
    searchItem: [],
    selectedRowKeys: [],
  }

  state = {
    expand: false,
  }

  // 搜索
  handleSearch = (e) => {
    e.preventDefault();
    const { form, onSearch } = this.props;
    form.validateFields((err, values) => {
      if (err) return;
      if (onSearch) {
        onSearch(values);
      }
    });
  }

  // 重置
  handleFormReset = () => {
    const { form, onReset } = this.props;
    form.resetFields();
    const values = form.getFieldsValue();
    if (onReset) {
      onReset(values);
    }
  }

  // 切换显示状态
  toggleForm = () => {
    this.setState({
      expand: !this.state.expand,
    });
  };

  // 简单搜索，最多显示两个表单项
  renderSimpleForm = () => {
    const { getFieldDecorator } = this.props.form;
    const { className, searchItem } = this.props;

    return (
      <Form
        onSubmit={this.handleSearch}
        layout="inline"
        className={classnames('gy-search', className)}
      >
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          {
            searchItem.slice(0, 2).map((item) => (
              <Col md={8} sm={24} key={item.key}>
                <FormItem label={item.label} {...formItemLayout}>
                  {getFieldDecorator(item.key, item.options)(
                    item.render()
                  )}
                </FormItem>
              </Col>
            ))
          }
          <Col md={8} sm={24}>
            <span className={classnames({ 'gy-search-btn-right': searchItem.length > 2 })}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              {
                searchItem.length > 2 && (
                  <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                    展开 <Icon type="down" />
                  </a>
                )
              }
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  // 完全展示搜索表单项
  renderAdvancedForm = () => {
    const { getFieldDecorator } = this.props.form;
    const { searchItem } = this.props;

    return (
      <Form
        onSubmit={this.handleSearch}
        layout="inline"
        className="gy-search"
      >
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} type="flex" justify="start">
          {
            searchItem.map((item) => (
              <Col md={this.props.openSpan||8} sm={24} key={item.key}>
                <FormItem label={item.label} {...formItemLayout}>
                  {getFieldDecorator(item.key, item.options)(
                    item.render()
                  )}
                </FormItem>
              </Col>
            ))
          }
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </span>
        </div>
      </Form>
    );
  }

  render() {
    const { expand } = this.state;
    const { searchItem, extendBtn, selectedRowKeys } = this.props;

    return (
      <React.Fragment>
        {
          searchItem.length > 0 && (
            expand ? this.renderAdvancedForm() : this.renderSimpleForm()
          )
        }
        {extendBtn && (
          <div className="gy-search-extend-btn">
            {extendBtn.map((item) => item)}
            {selectedRowKeys.length>0 && <span className="selected-number">已选择 {selectedRowKeys.length} 项</span>}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default gySearch;