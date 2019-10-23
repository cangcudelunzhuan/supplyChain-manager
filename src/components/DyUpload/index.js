import React, { Component } from 'react';
import { Form, Button,  Upload } from 'antd';
import { connect } from 'dva';
@connect(({ global, loading }) => ({
  global,
  uploading: loading.effects['global/toUpload'],
}))
@Form.create()
class upload extends Component {
  beforeUpload = (file) => {
    return false;
  };
  onRemove = (file, fileListName) => {
    if (this.props.status) {
      return;
    }
    let list = [...this.props.fileList];
    let i = list.indexOf(file);
    list.splice(i, 1);
    this.fileChange(fileListName, list);
  };
  toOnChange = (info) => {
    this.upAction(info, this.props.fileListName, this.props.action);
  };
  upAction = async (info, fileName, action) => {
    if (this.props.status||(info.file.status==='removed')) {
      return false;
    }
    let formData = new FormData();
    formData.append('file', info.file);
    let res = await this.props.dispatch({
      type: action || 'global/toUpload',
      payload: formData,
    });
    let data = decodeURI(res.data);
    let fileList = [...info.fileList];
    if (this.props.type && this.props.type === 'one') {
      fileList = fileList.slice(-1);
    } else {
      fileList.slice(-1);
    }
    fileList = fileList.map((file) => {
      file.url = data;
      file.fileUrl = data;
      file.fileName = file.name;
      return file;
    });
    this.fileChange(fileName, fileList);
  };

  fileChange = (fileName, fileList) => {
    this.props.app.setState({
      [fileName]: fileList,
    });
    this.props.app.props.form.setFieldsValue({
      [fileName]: fileList,
    });
  }

  render() {
    return (
      <Upload key={this.props.key || 'upload'} fileList={this.props.fileList}
        accept={this.props.accept || '.png, .pdf, .jpeg, .jpg'}
        beforeUpload={this.beforeUpload}
        onRemove={(e) => this.onRemove(e, this.props.fileListName)}
        onChange={this.toOnChange}>
        <Button loading={this.props.uploading} icon="upload" disabled={this.props.status}>
          上传
        </Button>
      </Upload>
    );
  }
}

export default upload;
