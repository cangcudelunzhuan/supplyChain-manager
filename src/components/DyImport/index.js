import React, { Component } from 'react';
import { Button,  Upload, message } from 'antd';
import { connect } from 'dva';
@connect(({ brans, distributor }) => ({
  brans,
  distributor,
  // uploading: loading.effects['global/toUpload'],
}))
class DyImport extends Component {

  beforeUpload = () => {
    return false;
  }
  onChange = async (info) => {
    let formData = new FormData();
    formData.append('file', info.file);
    await this.props.dispatch({
      type: this.props.url||'brans/toupload',
      payload: formData,
    });
    message.success('导入成功');
    this.props.app.getTableData({
      current: 1,
    });
  }
  render() {
    const { uploading } = this.props;
    return (
      <Upload action="" accept=".xlsx" key="upload"
        beforeUpload={this.beforeUpload}
        onChange={this.onChange} showUploadList={false}>
        <Button type="primary" loading={uploading}  icon="upload">
        导入
        </Button>
      </Upload>
    );
  }
}

export default DyImport;