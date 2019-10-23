import React, { Component } from 'react';
import { isContain } from 'src/utils/tools';

class DyControl extends Component {
  render() {
    if(isContain(this.props.permission)){
      return this.props.children;
    }
    return (
      null
    );
  }
}



export default DyControl;