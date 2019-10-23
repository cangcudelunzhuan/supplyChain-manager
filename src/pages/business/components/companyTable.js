import React, { Component } from 'react';
import { Table, Input, Button,  Modal, Select } from 'antd';
import { DyFormModal, DyAction } from 'dy-components';
import RegExp from 'src/utils/regExp';
import { connect } from 'dva';
import { moneyType } from 'src/utils/statusData';
import { formDataSetMoney } from 'src/utils/tools';
const confirm = Modal.confirm;
@connect(({ order, global, pledge, loading }) => ({
  order,
  global,
  pledge,
}))
class indexs extends Component {
    state = {
      svisible: false,
      title: null,
      type: null,
      recordId: null,
      name: this.props.type===1?'商品':'质/抵押物',
      formData: [
      ],
      columns: [],
    }
    componentDidMount() {
      const app = this;
      this.setState({
        formData: [{
          key: 'goodsName',
          label: `${this.state.name}名称`,
          render() {
            return (
              <Select placeholder="请选择" onChange={(e)=>{ app.SelectChange(e) ; }}>
                {moneyType.map((item)=>{
                  return (<Select.Option  value={item.id} key={item.id}>{item.name}</Select.Option>);
                })}
              </Select>
            );
          },
        },
        {
          key: 'xxxxxxxx',
          label: `${this.state.name}编号`,
          render() {
            return <Input placeholder="请输入编号" disabled/>;
          },
          options: {
            rules: [{ required: false } ],
          },
        },
        {
          key: 'goodsCount',
          label: `${this.state.name}数量`,
          render() {
            return <Input placeholder="请输入数量"/>;
          },
          options: {
            rules: [{ required: true, ...RegExp.number } ],
          },
        },
        {
          key: 'unit',
          label: '单位',
          render() {
            return <Input placeholder="请输入单位" disabled/>;
          },
          options: {
            rules: [{ required: false } ],
          },
        },
        {
          key: 'ssssssss',
          label: '到仓期限(天)',
          render() {
            return <Input placeholder="请输入到仓期限(天)"  disabled/>;
          },
          options: {
            rules: [{ required: false } ],
          },
        },
        {
          key: 'goodsValue',
          label: `${this.state.name}货值(元)`,
          render() {
            return (
              <Input placeholder="请输入货值（元）" onBlur={(v)=>{ formDataSetMoney(v, app); }}/>
            );
          },
          options: {
            rules: [{ required: true, message: '请输入货值' } ],
          },
        }],
        columns: [
          {
            title: `${this.state.name}名称`,
            dataIndex: 'goodsName',
          },
          {
            title: `${this.state.name}编号`,
            dataIndex: 'xxxxxxxx',
          },
          {
            title: `${this.state.name}数量`,
            dataIndex: 'goodsCount',
          },
          {
            title: '单位',
            dataIndex: 'unit',
          },
          {
            title: '到仓期限(天)',
            dataIndex: 'ssssssss',
          },
          {
            title: `${this.state.name}货值(元)`,
            dataIndex: 'goodsValue',
          },
          {
            title: '操作',
            width: 130,
            render: (text, record) => {
              if (!this.props.disable) {
                return(
                  <DyAction
                    action={[{
                      name: '修改',
                      permission: '1002002002',
                      onClick: (e)=>{ this.details(record, 'edit') ; },
                    }, {
                      name: '删除',
                      permission: '1002002002',
                      onClick: ()=>{ this.delete(record.id) ; },
                    }]}
                  />
                );
              }
            },
          },
        ],
      });
    }
    SelectChange = async (e) => {
      let recordData =  this.child.props.form.getFieldsValue();
      recordData.goodsName=e;
      await this.props.dispatch({
        type: 'global/updateState',
        payload: { recordData },
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
      await this.props.dispatch({
        type: 'global/updateState',
        payload: { recordData: record },
      });
    }
    // 新增或修改调用
    setsAction = async (data) => {
      let { type, recordId } = this.state;
      let companyList = this.props.type===1?this.props.order.goodList:this.props.pledge.goodList;
      if (type==='add') {
        data.id = companyList.length + 1;
        companyList.push(data);
      } else {
        companyList.splice(companyList.findIndex((item) => item.id === recordId), 1, { id: recordId, ...data });
      }
      this.setState({
        svisible: false,
      });
      await this.props.dispatch({
        type: this.props.type===1?'order/updateState':'pledge/updateState',
        payload: { goodList: companyList },
      });
      this.onTableChange(companyList);
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
        let companyList = this.props.order.goodList;
        companyList.splice(companyList.findIndex((item) => item.id === id), 1);
        await this.props.dispatch({
          type: this.props.type===1?'order/updateState':'pledge/updateState',
          payload: { goodList: companyList },
        });
        this.onTableChange(companyList);
      },
    });
  }
  onTableChange = (data) => {
    this.props.tableChange(data);
  }
  render() {
    const { columns } = this.state;
    return (
      <div>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={this.props.type===1?this.props.order.goodList:this.props.pledge.goodList}
          // loading={tableLoading}
          pagination={false}
          // onChange={this.onTableChange}
        />
        <Button onClick={this.add} style={{ width: '100%', marginTop: '10px' }}
          disabled={this.props.disable}  type="dashed" icon="plus">新增</Button>
        <DyFormModal visible={this.state.svisible} formData={this.state.formData} title={this.state.title}
          onRef={(ref)=>{ this.child = ref ; }}
          visibleName={'svisible'} app={this} action={this.setsAction}
          width={'650px'}/>
      </div>
    );
  }
}
export default indexs;