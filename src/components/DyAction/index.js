import React, { Component } from 'react';
import { isContain } from 'src/utils/tools';
// import { Divider } from 'antd';

class DyAction extends Component {

  render() {
    const { action } = this.props;
    return action.map((item, index) => {
      if (item) {
        return (
          <span key={item.name}>
            {isContain(item.permission) && <a onClick={item.onClick} style={{ marginRight: '10px' }}>{item.name}</a>}
          </span>
        );
      }
      // if (index !== action.length - 1) {
      //   return (
      //     <span key={item.name}>
      //       <a onClick={item.onClick}>{item.name}</a>
      //       <Divider type="vertical" />
      //     </span>
      //   );
      // } else {
      //   return <a key={item.name} onClick={item.onClick}>{item.name}</a>;
      // }
    });
  }
}

export default DyAction;