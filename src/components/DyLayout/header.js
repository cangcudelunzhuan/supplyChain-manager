import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Layout, Menu, Dropdown, Icon, Input, Form, message } from 'antd';
import   DyFormModal  from 'src/components/DyFormModal';
import RegExp from 'src/utils/regExp';
import { passMd5 } from 'src/utils/tools';
const { Header } = Layout;
const DyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1190650_9cidfqyb3hh.js',
});
@connect(({ global }) => ({
  global,
}))
@Form.create()
class Top extends Component {
  state = {
    passVisible: false,
    visible: false,
  }
  componentDidMount(){
    let isChanged = window.localStorage.getItem('isChanged');
    switch (isChanged-0) {
    case 2:
      this.setState({
        visible: true,
      });
      break;
    default:
      break;
    }
  }
  check = (rule, value, callback) => {
    let newpass = document.getElementById('newPassword').value;
    if (newpass === value) {
      callback();
      return;
    }
    callback('两次密码不一致');
  }
  logout=()=>{
    this.props.dispatch({
      type: 'global/logout',
    });
  }
  editpassword = () => {
    this.setState({
      passVisible: true,
    });
  }
  setAction = (data, e) => {
    this.setNew(data, e);
  }
  setNew = async (data, e)=>{
    passMd5(data);
    let res = await this.props.dispatch({
      type: 'global/changePassword',
      payload: data,
    });
    message.success(res.message);
    this.setState({
      visible: false,
      passVisible: false,
    });
    this.logout();
  }
  // 切换菜单
  changeMenu=(menu)=>{
    this.props.dispatch({
      type: 'global/switchMenu',
      payload: {
        menu,
      },
    });
  }
  renderMenus=()=>{
    const { global: { menus, mainMenu } } = this.props;
    // 最大展示数量
    const MAX_SHOW = 6;
    const menuExpend = menus.slice(0, MAX_SHOW);
    const menuHide = menus.slice(MAX_SHOW);
    return (
      <Menu
        mode="horizontal"
        selectedKeys={[mainMenu.path]}
      >
        {
          menuExpend.map((item)=>(
            <Menu.Item key={item.path} onClick={this.changeMenu.bind(this, item)}>
              <DyIcon type={item.icon} /> {item.name}
            </Menu.Item>
          ))
        }
        {
          menuHide.length > 0 && (
            <Menu.SubMenu title={<span className="submenu-title-wrapper"><Icon type="bars" /> 更多功能</span>}>
              {
                menuHide.map((item)=>(
                  <Menu.Item key={item.path} onClick={this.changeMenu.bind(this, item)}>
                    <DyIcon type={item.icon} />{item.name}
                  </Menu.Item>
                ))
              }
            </Menu.SubMenu>
          )
        }
      </Menu>
    );
  }

  render() {
    // const { collapsed, toggle } = this.props;

    const rightMenu = (
      <Menu>
        {/* <Menu.Item key="0">
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">个人中心</a>
        </Menu.Item>
        <Menu.Divider />*/}
        <Menu.Item key="1" onClick={this.editpassword}>修改密码</Menu.Item>
        <Menu.Item key="3" onClick={this.logout}>退出登录</Menu.Item>
      </Menu>
    );
    const formData = [
      {
        key: 'oldPassword',
        label: '原密码',
        render() {
          return <Input.Password  placeholder="请输入原密码"/>;
        },
        options: {
          rules: [{ required: true,  ...RegExp.passWord }],
        },
      },
      {
        key: 'newPassword',
        label: '新密码',
        render() {
          return <Input.Password  placeholder="不少于6位的数字、字母及特殊字符组成" />;
        },
        options: {
          rules: [{ required: true, ...RegExp.passWord }],
        },
      },
      {
        key: 'newPasswordConfirm',
        label: '确认密码',
        render() {
          return <Input.Password  placeholder="不少于6位的数字、字母及特殊字符组成"/>;
        },
        options: {
          rules: [{ required: true, ...RegExp.passWord }, { validator: (rule, value, callback)=>{ this.check(rule, value, callback); } }],
          validateFirst: true,
        },
      },

    ];

    return (
      <Fragment>
        <Header className="dy-header">
          {/* <Icon
          className="dy-header-trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={toggle}
        /> */}
          <div className="dy-header-menu">
            {this.renderMenus()}
          </div>
          <div className="dy-header-right">
            <Dropdown overlay={rightMenu} trigger={['click']}>
              <span className="user-info">
                <span className="avatar">
                  <img src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" alt="avatar" />
                </span>
                <span className="name" >{window.localStorage.getItem('username')||'管理员'}</span>
              </span>
            </Dropdown>
          </div>
        </Header>
        <DyFormModal visible={this.state.passVisible} formData={formData} title="修改密码"
          visibleName={'passVisible'} app={this}  action={this.setAction} />
        <DyFormModal visible={this.state.visible} formData={formData} title="首次修改密码"
          visibleName={'visible'} app={this} action={this.setNew}
          closable={false}  />
      </Fragment>
    );
  }
}

export default Top;