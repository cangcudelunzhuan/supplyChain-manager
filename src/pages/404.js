import React, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import './404.less';

@connect()
class Index extends Component {
  render() {
    return (
      <div className="page-not-found">
        <div className="page-not-found-img" />
        <div className="page-not-found-explain">
          <h1>404</h1>
          <p>抱歉，你访问的页面不存在。</p>
          <Button
            type="primary"
            onClick={() => {
              window.location.href = '/';
            }}
          >返回首页</Button>
        </div>
      </div>
    );
  }
}

export default Index;