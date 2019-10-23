import React, { Component } from 'react';
import { connect } from 'dva';
// import { routerRedux } from 'dva/router';
import './index.less';
@connect(({ global, loading }) => ({
  global,
}))
class Modalform extends Component {
    gopath = (path)=> {
      window.open(`http://${window.location.host}/dySupplyChain${path}`, '_blank');
    //   this.props.dispatch(routerRedux.push(path));
    }
    render() {
      const { data } =this.props;
      return (
        <div className="pathbox" style={{ fontSize: '12px' }}>之前浏览：
          <div >{data.map((item, i)=>
          {
            if(i!==0){
              return(
                <span onClick={()=>this.gopath(item.path)} key={i}>{item.name}</span>
              );
            }
          }
          )}</div>
        </div>
      );
    }
}
export default Modalform;