import React, { Component } from 'react';
import { Table, Input, Button,  message, Modal, Upload } from 'antd';
import { DyAction, DyFormModal  } from 'dy-components';
import { connect } from 'dva';
const confirm = Modal.confirm;
@connect(({ distributor, global, loading }) => ({
  distributor,
  global,
  uploading: loading.effects['distributor/importsCompany'],
  tableLoading: loading.effects['distributor/getCompanyList'],
}))
class indexs extends Component {
    state = {
      svisible: false,
      title: null,
      type: null,
      recordId: null,
      companyList: [],
    }
    componentDidMount() {
      const { companyid } = this.props;
      this.getList(companyid);
    }
    getList = async (id) => {
      let [companyList] = await Promise.all([
        this.props.dispatch({
          type: 'distributor/getCompanyList',
          payload: { id },
        }),
      ]);
      this.setState({
        companyList: companyList.data,
      });

    }
    // 打开弹出
    details = async (record, type) => {
      this.setState({
        svisible: true,
        title: type === 'edit'? '修改': '新增',
        type: type,
        recordId: record.id,
      });
      let res = await this.props.dispatch({
        type: 'global/updateState',
        payload: { recordData: record },
      });
    }
    // 新增或修改调用
    setsAction = async (data) => {
      const { companyid } = this.props;
      data.dealerId = companyid;
      let type = this.state.type;
      data.id = this.state.recordId;
      let res = await this.props.dispatch({
        type: type === 'add'?'distributor/addCompany':'distributor/editCompany',
        payload: { ...data },
      });
      message.success(res.message);
      this.setState({
        svisible: false,
      });
      this.getList(companyid);
    }
    // 新增
    add = () => {
      this.details({}, 'add');
    }
    // 删除
    delete = (id) => {
      confirm({
        title: '确认删除此项？',
        onOk: async ()=> {
          await this.props.dispatch({
            type: 'distributor/toCancelCompany',
            payload: { id },
          });
          message.success('删除成功！');
          const { companyid } = this.props;
          this.getList(companyid);
        },
      });
    }
    // 导入
  beforeUpload = () => {
    return false;
  }
  onChange = async (info) => {
    const { companyid } = this.props;
    let formData = new FormData();
    formData.append('file', info.file);
    let res = await this.props.dispatch({
      type: 'distributor/importsCompany',
      payload: { file: formData, id: companyid },
    });
    message.success(res.message);
    this.getList(companyid);
  }
  render() {
    const { companyList } = this.state;
    const { uploading, tableLoading } = this.props;
    const formData = [
      {
        key: 'socialCreditCode',
        label: '社会信用代码',
        render() {
          return <Input placeholder="请输入社会信用代码"/>;
        },
        options: {
          rules: [{ required: true, message: '必填!' }],
        },
      },
      {
        key: 'companyName',
        label: '公司名称',
        render() {
          return <Input placeholder="请输入公司名称"/>;
        },
        options: {
          rules: [{ required: true, message: '必填!' }],
        },
      },
      {
        key: 'companyWebsite',
        label: '公司网址',
        render() {
          return <Input placeholder="请输入公司网址"/>;
        },
        options: {
          rules: [{ required: true, message: '必填!' }],
        },
      },
      {
        key: 'companyAlipay',
        label: '支付宝账号',
        render() {
          return <Input placeholder="请输入支付宝账号"/>;
        },
        options: {
          rules: [{ required: true, message: '必填!' }],
        },
      },
    ];
    const columns = [
      {
        title: '社会信用代码',
        dataIndex: 'socialCreditCode',
      },
      {
        title: '公司名称',
        dataIndex: 'companyName',
      },
      {
        title: '公司网址',
        dataIndex: 'companyWebsite',
      },
      {
        title: '支付宝账号',
        dataIndex: 'companyAlipay',
      },
      {
        title: '操作',
        width: 130,
        render: (text, record) => {
          switch (this.props.disable) {
          case true:
            return(
              '不可修改'
            );
          case false:
            return(
              <DyAction
                action={[{
                  name: '修改',
                  permission: '1001003002',
                  onClick: (e)=>{ this.details(record, 'edit') ; },
                }, {
                  name: '删除',
                  permission: '1001003002',
                  onClick: ()=>{ this.delete(record.id) ; },
                }]}
              />
            );
          default:
            break;
          }
        },
      },
    ];
    return (
      <div>
        <div style={{ marginBottom: '10px' }}>
          <Upload action="" accept=".xlsx" key="upload"
            beforeUpload={this.beforeUpload}
            onChange={this.onChange} showUploadList={false}>
            <Button type="primary" loading={uploading} icon="upload"
              disabled={this.props.disable}>
            导入
            </Button>
          </Upload>
        </div>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={companyList}
          loading={tableLoading}
          pagination={false}
          onChange={this.onTableChange}
        />
        <Button onClick={this.add} style={{ width: '100%', marginTop: '10px' }}
          disabled={this.props.disable}  type="dashed" icon="plus">新增</Button>
        <DyFormModal visible={this.state.svisible} formData={formData} title={this.state.title}
          visibleName={'svisible'} app={this} action={this.setsAction}
          width={'480px'}/>
      </div>
    );
  }
}
export default indexs;