import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, message } from 'antd';
import { DyIcon } from 'dy-components';
import md5 from 'md5';
import './index.less';
import img_logo from 'src/assets/login-logo.png';
const FormItem = Form.Item;

@connect(({ login }) => ({
  login,
}))
@Form.create()
class Index extends Component {
  state = {
    password: '',
    name: '',
  }
  // 提交用户信息
  handleSubmit = (e) => {
    e.preventDefault();
    const { password, name } = this.state;
    if (name.length === 0) {
      message.error('请输入用户名');
      return;
    }
    if (password.length === 0) {
      message.error('请输入密码');
      return;
    }
    if (password && name) {
      this.props.dispatch({
        type: 'login/userLogin',
        payload: {
          name,
          password: md5(password),
        },
      });
    }
  }

  render() {
    const { password, name } = this.state;
    return (
      <div className="login">
        <div className="login-block">
          <div className="login-block-left">
            <div className="login-block-left-logo">
              <img src={img_logo} alt="logo" />
            </div>
            <div className="login-block-left-title">大鱼供应链后台管理系统</div>
            <div className="login-block-left-subtitle">BF Supply Chain Finance Background Management System</div>
            <div className="login-block-left-bottom-logo">
              <div className="login-block-left-bottom-logo-big">从产业中来  到金融中去</div>
              <div className="login-block-left-bottom-logo-small">From the industry  to the Finance</div>
            </div>
          </div>
          <div className="login-block-right">
            <div className="login-block-right-title">
              用户登录
            </div>
            <Form
              onSubmit={this.handleSubmit}
              className="login-block-right-form"
            >
              <FormItem>
                <Input
                  size="large"
                  prefix={<DyIcon type="iconuser" />}
                  placeholder="请输入用户名"
                  onChange={
                    (e) => this.setState({
                      name: e.target.value.trim() !== '' ? e.target.value : '',
                    })
                  }
                  value={name}
                />
              </FormItem>
              <FormItem>
                <Input
                  size="large"
                  maxLength={15}
                  prefix={<DyIcon type="iconmima" />}
                  type="password"
                  placeholder="请输入密码"
                  onChange={
                    (e) => this.setState({
                      password: e.target.value.trim() !== '' ? e.target.value : '',
                    })
                  }
                  value={password}
                />
                {/* )} */}
              </FormItem>
              <FormItem>
                <Button size="large" type="primary" htmlType="submit"
                  className="login-block-right-form-button">
                  登录
                </Button>
              </FormItem>
            </Form>

          </div>
        </div>
      </div>
    );
  }
}

export default Index;