import React, { PureComponent, Fragment } from 'react';
import { Table, Button, Input, message, Popconfirm, Divider } from 'antd';
import isEqual from 'lodash/isEqual';
import { object } from 'prop-types';
import { async } from 'q';
import { connect } from 'dva';
@connect(({ distributor, brans, loading }) => ({
  distributor,
}))
class TableForm extends PureComponent {
  index = 0;

  cacheOriginData = {};

  constructor(props) {
    super(props);

    this.state = {
      data: props.value,
      loading: false,
      value: props.value,
    };
  }

  static getDerivedStateFromProps(nextProps, preState) {
    if (isEqual(nextProps.value, preState.value)) {
      return null;
    }
    return {
      data: nextProps.value,
      value: nextProps.value,
    };
  }

  getRowByKey(key, newData) {
    const { data } = this.state;
    return (newData || data).filter((item) => item.key === key)[0];
  }

  toggleEditable = (e, key) => {
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map((item) => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        this.cacheOriginData[key] = { ...target };
      }
      target.editable = !target.editable;
      this.setState({ data: newData });
    }
  };

  newMember = () => {
    const { data } = this.state;
    const newData = data.map((item) => ({ ...item }));
    newData.push({
      key: `NEW_TEMP_ID_${this.index}`,
      socialCreditCode: '',
      companyName: '',
      companyWebsite: '',
      companyAlipay: '',
      editable: true,
      isNew: true,
    });
    this.index += 1;
    this.setState({ data: newData });
  };

  remove(key) {
    const { data } = this.state;
    const { onChange } = this.props;
    const newData = data.filter((item) => item.key !== key);
    this.setState({ data: newData });
    onChange(newData);
  }

  handleKeyPress(e, key) {
    if (e.key === 'Enter') {
      this.saveRow(e, key);
    }
  }

  handleFieldChange(e, fieldName, key) {
    const { data } = this.state;
    const newData = data.map((item) => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.value;
      this.setState({ data: newData });
    }
  }

  async saveRow(e, key, type) {
    e.persist();
    if (this.clickedCancel) {
      this.clickedCancel = false;
      return;
    }
    const target = this.getRowByKey(key) || {};
    if (!target.socialCreditCode || !target.companyName || !target.companyWebsite|| !target.companyAlipay) {
      message.error('请填写完整成员信息。');
      e.target.focus();
      this.setState({
        loading: false,
      });
      return;
    }
    delete target.isNew;
    // this.toggleEditable(e, key);
    // target.editable = false;
    const { data } = this.state;
    const { add, edit } = this.props;
    if (type === 'add') {
      // add(data);
      data.companyId = 6;
      let res = await this.props.dispatch({
        type: 'distributor/addCompany',
        payload: { ...data },
      });
      target.editable = false;
    }
    if (type === 'edit') {
      edit(data);
    }
  }
  cancel(e, key) {
    this.clickedCancel = true;
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map((item) => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (this.cacheOriginData[key]) {
      Object.assign(target, this.cacheOriginData[key]);
      delete this.cacheOriginData[key];
    }
    target.editable = false;
    this.setState({ data: newData });
    this.clickedCancel = false;
  }

  render() {
    const columns = [
      {
        title: '公司名称/店铺名称',
        dataIndex: 'companyName',
        key: 'companyName',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={(e) => this.handleFieldChange(e, 'companyName', record.key)}
                onKeyPress={(e) => this.handleKeyPress(e, record.key)}
                placeholder="公司名称/店铺名称"
              />
            );
          }
          return text;
        },
      },
      {
        title: '社会信用代码',
        dataIndex: 'socialCreditCode',
        key: 'socialCreditCode',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={(e) => this.handleFieldChange(e, 'socialCreditCode', record.key)}
                onKeyPress={(e) => this.handleKeyPress(e, record.key)}
                placeholder="社会信用代码"
              />
            );
          }
          return text;
        },
      },
      {
        title: '网址',
        dataIndex: 'companyWebsite',
        key: 'companyWebsite',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={(e) => this.handleFieldChange(e, 'companyWebsite', record.key)}
                onKeyPress={(e) => this.handleKeyPress(e, record.key)}
                placeholder="网址"
              />
            );
          }
          return text;
        },
      },
      {
        title: '支付宝账号',
        dataIndex: 'companyAlipay',
        key: 'companyAlipay',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={(e) => this.handleFieldChange(e, 'companyAlipay', record.key)}
                onKeyPress={(e) => this.handleKeyPress(e, record.key)}
                placeholder="支付宝账号"
              />
            );
          }
          return text;
        },
      },
      {
        title: '操作',
        key: 'action',
        width: 130,
        render: (text, record) => {
          const { loading } = this.state;
          if (!!record.editable && loading) {
            return null;
          }
          if (record.editable) {
            if (record.isNew) {
              return (
                <span>
                  <a onClick={(e) => this.saveRow(e, record.key, 'add')}>保存</a>
                  <Divider type="vertical" />
                  <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                    <a>删除</a>
                  </Popconfirm>
                </span>
              );
            }
            return (
              <span>
                <a onClick={(e) => this.saveRow(e, record.key, 'edit')}>保存</a>
                <Divider type="vertical" />
                {/* <a onClick={(e) => this.cancel(e, record.key)}>取消</a> */}
                <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                  <a>删除</a>
                </Popconfirm>
              </span>
            );
          }
          return (
            <span>
              <a onClick={(e) => this.toggleEditable(e, record.key)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                <a>删除</a>
              </Popconfirm>
            </span>
          );
        },
      },
    ];

    const { loading, data } = this.state;

    return (
      <Fragment>
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          pagination={false}
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.newMember}
          icon="plus"
        >
          新增关联公司信息
        </Button>
      </Fragment>
    );
  }
}

export default TableForm;
