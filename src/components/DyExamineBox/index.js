import React, { Component } from 'react';
import { Modal, Button  } from 'antd';

class Dy extends Component {
    hideModal = ()=>{
      this.props.app.setState({
        [this.props.visibleName||'visible']: false,
      });
    }
    ok = (e) => {
      this.props.ok(e);
    }
    not = () => {
      this.props.app.setState({
        visible: false,
      });
      if (this.props.not) {
        this.props.not();
      }
    }
    render() {
      return (
        <Modal
          title={null}
          width={'300px'}
          wrapClassName="bond-examine"
          visible={this.props.visible}
          onCancel={this.hideModal}
          footer={null}
          centered={true}
        >
          <p className="bond-examine-title">{this.props.title||'审核是否通过？'}</p>
          <div className="buttonbox">
            <Button  onClick={(e)=>{ this.ok(e) ; }} type="primary">是</Button>
            <Button  onClick={this.not} >否</Button>
          </div>
        </Modal>
      );
    }
}

export default Dy;