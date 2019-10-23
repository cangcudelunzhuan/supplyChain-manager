import React, { Component } from 'react';
import { DyPage } from 'dy-components';
import { Form, Input, Button, Col, Row,  Select, Modal, message, Spin, List, Avatar } from 'antd';
import { connect } from 'dva';
import RegExp from 'src/utils/regExp';
import { goBack }from'src/utils/tools';
import '../../user/index.less';
import { isContain }from 'src/utils/tools';
import '../index.less';
import { formItemLayout, renderField, gutter } from 'src/utils/gridInit';
const confirm = Modal.confirm;
@connect(({ authority, loading }) => ({
  authority,
  addloading: loading.effects['authority/toAdd'],
  editloading: loading.effects['authority/toEdit'],
  detailLoading: loading.effects['authority/getDetail']&&loading.effects['authority/getAgencyDetail'],
}))
@Form.create()
class index extends Component {
  state = {
    status: true,
    roleList: [],
    organizationList: [],
    areaList: [],
  }
  renderField = (label, key, component, options = {}) => {
    const { getFieldDecorator } = this.props.form;
    return (
      <Col span={12}>
        <Form.Item
          label={label}
        >
          {key? getFieldDecorator(key, options)(component): component}
        </Form.Item>
      </Col>
    );
  }
  componentDidMount(){
    let id = this.props.match.params.id;
    let status = id === 'add' ? false : true;
    this.setState({
      status: status,
    });
    this.props.form.setFieldsValue({
      agencyType: 1,
    });
    if (status) {
      this.getDetail(id);
    }
    this.getOrganizations();
  }
  getOrganizations = async () => {
    let res = await this.props.dispatch({
      type: 'authority/getOrganizations',
    });
    this.setState({
      organizationList: res.data,
    });
  }
  getDetail = async (id) => {
    let formKey = this.props.form.getFieldsValue();
    let res = await this.props.dispatch({
      type: 'authority/getDetail',
      payload: { id },
    });
    for (let key in formKey) {
      formKey[key] = res.data[key];
    }
    this.props.form.setFieldsValue({
      ...formKey,
    });
    this.changeOr(formKey.organizationId, 'getDetail');
  }
  // 提交审核
  handleSubmit = (e, type) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let title;
        if (type === 'add') {
          title = '新增';
        }else{
          title = '修改';
          values.id = this.props.match.params.id;
        }
        confirm({
          title: `确认${title}此项？`,
          onOk: ()=> {
            values.agencyFileParamList = this.state.agencyFileParamList;
            this.examineAction(values, type);
          },
        });
      }
    });
  }
  examineAction = async (values, type) => {
    let res = type === 'add'?(
      await this.props.dispatch({
        type: 'authority/toAdd',
        payload: values,
      })
    ):(
      await this.props.dispatch({
        type: 'authority/toEdit',
        payload: values,
      })
    );
    message.success(res.message);
    goBack(null, this);
  }
  // 选择机构
  changeOr = async (val, type ='change') => {
    let res = await this.props.dispatch({
      type: 'authority/getRoles',
      payload: { organizationId: val },
    });
    this.setState({
      roleList: res.data,
    });
    let id = type ==='getDetail'? this.props.form.getFieldValue('roleId'):res.data[0].id-0;
    // 选机构后默认选中第一条角色
    this.props.form.setFieldsValue({
      roleId: id,
    });
    // 生成权限范围列表
    this.changeRole(id);
  }
  // 选择角色 --> 生成权限范围列表
  changeRole = async (val) => {
    let res = await this.props.dispatch({
      type: 'authority/areaList',
      payload: { roleId: val },
    });
    this.setState({
      areaList: res,
    });
  }
  // 上传
  onChange = (fileName, fileList) => {
    this.setState({
      [fileName]: fileList,
    });
    this.props.form.setFieldsValue({
      [fileName]: fileList,
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { detailLoading } = this.props;
    let actionlist = [
      <Button key="back" onClick={(e)=>goBack(e, this)}>返回</Button>,
    ];
    if (isContain('1003001001')&&!this.state.status) {
      actionlist.push(
        <Button key="edit" type="primary"
          onClick={(e)=>{ (this.handleSubmit(e, 'add')); }}>新增</Button>
      );
    } else if (isContain('1003001002')) {
      actionlist.push(
        <Button key="edit" type="primary"
          onClick={(e)=>{ (this.handleSubmit(e, 'edit')); }}>修改</Button>
      );
    }
    return (
      <DyPage className="user-manage-detail"
        breadcrumb={[{
          name: '权限管理',
        }, {
          name: '权限管理',
          href: '/auth/authority',
        }, {
          name: this.state.status?'修改角色':'添加角色',
        }]}
        action={
          actionlist
        }
      >
        <Spin spinning={this.state.status?detailLoading:false}>
          <Form {...formItemLayout} >
            <Row gutter={gutter}>
              <div className="block-title">基本信息</div>
              {renderField(getFieldDecorator, '姓名', 'name', <Input disabled={this.state.status} maxLength={13}/>,
                {
                  rules: [
                    { required: true, message: '请输入姓名' },
                  ],
                }
              )}
              {renderField(getFieldDecorator, '用户名', 'username', <Input disabled={this.state.status} maxLength={20}/>,
                {
                  rules: [
                    { required: true, message: '请输入用户名' },
                  ],
                }
              )}
              {renderField(getFieldDecorator, '手机号', 'mobilePhone', <Input disabled={this.state.status} />,
                {
                  rules: [
                    { required: true, ...RegExp.Phone  },
                  ],
                }
              )}
              {renderField(getFieldDecorator, '所属机构', 'organizationId',
                <Select placeholder="请选择所属机构"  onChange={(e)=>this.changeOr(e)}>
                  {
                    (this.state.organizationList||[]).map((item, i)=>{
                      return( <Select.Option  key={item.id} value={item.id}>{item.licenseOrganizationName}</Select.Option>);
                    })
                  }
                </Select>, {
                  rules: [{ required: true, message: '请选择所属机构!' }],
                }
              )}
              {renderField(getFieldDecorator, '角色', 'roleId',
                <Select placeholder="请选择角色"  onChange={this.changeRole}>
                  {
                    (this.state.roleList||[]).map((item, i)=>{
                      return( <Select.Option  key={item.id} value={item.id}>{item.roleName}</Select.Option>);
                    })
                  }
                </Select>, {
                  rules: [{ required: true, message: '请选择角色!' }],
                }
              )}

            </Row>
            <List className="authList"
              itemLayout="horizontal"
              header={<h4>权限范围</h4>}
              dataSource={this.state.areaList}
              renderItem={(item) => (
                <List.Item
                  key={item.title}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar icon="user"
                        style={{ backgroundColor: '#1890ff', verticalAlign: 'middle' }}
                        size="small"/>
                    }
                    title={<a href="javascript:;">{item.title}</a>}
                  />
                  <div className="authAction">
                    {item.auth.map((item, index) => {
                      return (
                        <span key={item.resourceTreeId}>{item.resourceName}</span>
                      );
                    })}
                  </div>
                </List.Item>
              )}
            />
          </Form>

        </Spin>
      </DyPage>
    );
  }
}
export default index;