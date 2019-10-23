

import React, { Component } from 'react';
import { connect } from 'dva';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { DyLayout } from 'dy-components';

moment.locale('zh-cn');

@connect(({ global }) => ({
  global,
}))
class BasicLayout extends Component {

  componentDidMount(){
    const { global: { currentMenuPath } } = this.props;
    if(currentMenuPath !== '/login'){
      this.props.dispatch({
        type: 'global/getMenus',
      });
    }
  }

  renderContainer = () => {
    const { children, global: { currentMenuPath } } = this.props;
    if (currentMenuPath === '/login') {
      return (
        <>
          {children}
        </>
      );
    }
    return (
      <DyLayout>
        {children}
      </DyLayout>
    );
  }

  render() {
    return (
      <LocaleProvider locale={zh_CN}>
        {this.renderContainer()}
      </LocaleProvider>
    );
  }
}

export default BasicLayout;
