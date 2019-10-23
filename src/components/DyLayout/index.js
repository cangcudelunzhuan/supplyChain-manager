import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Header from './header';
import './index.less';
import logoImg from '../../assets/logo.png';

const { Sider } = Layout;
const { SubMenu } = Menu;
const DyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1190650_9cidfqyb3hh.js',
});
@connect(({ global }) => ({
  global,
}))
class componentName extends Component {
  constructor(props){
    super(props);
    this.contentRef = React.createRef();
  }
  state = {
    collapsed: false,
  };

  renderMenuItem=(menuTree, parentPath)=>{
    return menuTree.map((item)=>{
      if((item.children || []).length === 0){
        return (
          <Menu.Item
            key={`${parentPath.join('')}${item.path}`}
            onClick={() => {
              this.props.dispatch(routerRedux.push(`${parentPath.join('')}${item.path}`));
            }}
          >
            {item.icon && <DyIcon type={item.icon} />}
            <span className="nav-text">{item.name}</span>
          </Menu.Item>
        );
      }else{
        return(
          <SubMenu
            key={`${parentPath.join('')}${item.path}`}
            title={<span>{item.icon?<DyIcon type={item.icon} />:''} <span>{item.name}</span></span>}
          >
            {this.renderMenuItem(item.children, [...parentPath, item.path])}
          </SubMenu>
        );
      }
    });
  }

  render() {
    const { collapsed, fix } = this.state;
    const { global: { mainMenu, currentMenuPath } } = this.props;
    const pathArray = currentMenuPath.split('/').slice(1);
    const openPathArray = pathArray.slice(0, pathArray.length-1);
    const openKeys = openPathArray.map((item)=>`/${item}`).join('');
    return (
      <Layout className="dy-layout">
        <Sider
          className="dy-layout-slider"
          collapsed={collapsed}
          style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}
        >
          <div className="logo">
            <img src={logoImg} alt="logo" />
          </div>
          <Menu
            theme="dark"
            mode="inline"
            key={openKeys}
            selectedKeys={[currentMenuPath]}
            defaultOpenKeys={[openKeys]}
          >
            {this.renderMenuItem(mainMenu.children, [mainMenu.path])}
          </Menu>
        </Sider>
        <Layout
          className="dy-main-content"
          style={{ marginLeft: collapsed ? 80 : 200 }}
        >
          <Header collapsed={collapsed} toggle={this.toggle} />
          {this.props.children}
        </Layout>
      </Layout>
    );
  }
}

export default componentName;