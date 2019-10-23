import React, { Component } from 'react';
import { DyPage, DyControl } from 'dy-components';
import { Form, Input, Button, Row, Select, Modal, message, Spin, Tree } from 'antd';
import { connect } from 'dva';
import { getAllIds } from 'src/utils/tools';
import { isContain, goBack } from 'src/utils/tools';
import { formItemLayout, renderField, gutter } from 'src/utils/gridInit';
import '../index.less';
const { TreeNode } = Tree;
const confirm = Modal.confirm;
@connect(({ role, loading }) => ({
  role,
  addloading: loading.effects['role/postAdd'],
  editloading: loading.effects['role/putUpdate'],
  detailLoading: loading.effects['role/getRoleDetail'] && loading.effects['role/getAgencyDetail'],
  treeLoading: loading.effects['role/getTrees'],
}))
@Form.create()
class index extends Component {
  state = {
    status: true,
    treeData: [],
    organizationList: [],
    expandedKeys: [],
    autoExpandParent: true,
    checkedKeys: [],
    halfCheckedKeys: [],
    selectedKeys: [],
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    let status = id === 'add' ? false : true;
    this.setState({
      status: status,
    });
    if (status) {
      this.getDetail(id);
    } else {
      this.getOrganizations();
    }
  }

  // 通过机构id 查询机构id所有权限数据
  getOrganizations = async () => {
    let res = await this.props.dispatch({
      type: 'role/getOrganizations',
    });
    this.setState({
      organizationList: res.data,
    });
    if (res.data) {
      this.props.form.setFieldsValue({
        organizationId: res.data[0].id,
      });
      this.changeOr(res.data[0].id);
    }
  }

  // 获取角色详情 设置树数据和选中权限
  getDetail = async (id) => {
    let formKey = this.props.form.getFieldsValue();
    let res = await this.props.dispatch({
      type: 'role/getRoleDetail',
      payload: { id },
    });
    for (let key in formKey) {
      formKey[key] = res.data[key];
    }
    this.props.form.setFieldsValue({
      ...formKey,
    });
    console.log(res.data);
    this.setState({
      organizationList: res.data.organizationList,
      treeData: res.data.menuTreeVoList,
      checkedKeys: res.data.allCheckedIds,
      expandedKeys: getAllIds(res.data.menuTreeVoList),
      halfCheckedKeys: res.data.halfCheckedKeys ? res.data.halfCheckedKeys : [],
    });
  }

  // 提交新增或者修改请求
  handleSubmit = (e, type) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let title;
        if (type === 'add') {
          title = '新增';
        } else {
          title = '修改';
          values.id = this.props.match.params.id;
        }
        confirm({
          title: `确认${title}此项？`,
          onOk: () => {
            values.allCheckedIds = this.state.checkedKeys;
            values.notAllCheckedIds = this.state.halfCheckedKeys;
            this.examineAction(values, type);
          },
        });
      }
    });
  }

  // 新增或者修改角色
  examineAction = async (values, type) => {
    let res = type === 'add' ? (
      await this.props.dispatch({
        type: 'role/postAdd',
        payload: values,
      })
    ) : (
      await this.props.dispatch({
        type: 'role/putUpdate',
        payload: values,
      })
    );
    message.success('操作成功');
    goBack(null, this);
  }

  // 选择所属机构重制树数据 清空选中权限
  changeOr = async (val) => {
    let res = await this.props.dispatch({
      type: 'role/getTrees',
      payload: { organizationId: val },
    });
    this.setState({
      treeData: res.data,
      checkedKeys: [],
      halfCheckedKeys: [],
      expandedKeys: getAllIds(res.data),
    });
  }

  // 展开树节点
  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };
  // 选中复选框
  onCheck = (checkedKeys, half) => {
    this.setState({ checkedKeys, halfCheckedKeys: half.halfCheckedKeys });
  };
  // 点击树节点title
  onSelect = (selectedKeys, info) => {
    this.setState({ selectedKeys });
  };
  // 渲染树结构
  renderTreeNodes = (data) =>
    data.map((item) => {
      if (item.children) {
        return (
          <TreeNode className="clear-both" title={item.name} key={item.permission}
            dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode className="tree-float" key={item.permission} title={item.name}
          dataRef={item} />
      );
    });

  render() {
    const { treeData, autoExpandParent, checkedKeys, selectedKeys, expandedKeys, organizationList } = this.state;
    const { detailLoading } = this.props;
    const { getFieldDecorator } = this.props.form;
    let actionlist = [
      <Button key="back" onClick={(e) => goBack(e, this)}>返回</Button>,
    ];
    if (isContain('1003002001') && !this.state.status) {
      actionlist.push(
        <Button key="edit" type="primary"
          onClick={(e) => { (this.handleSubmit(e, 'add')); }}>新增</Button>
      );
    } else if (isContain('1003002002')) {
      actionlist.push(
        <Button key="edit" type="primary"
          onClick={(e) => { (this.handleSubmit(e, 'edit')); }}>修改</Button>
      );
    }
    return (
      <DyControl permission="1003002" key="control">
        <DyPage className="role-manage-detail"
          breadcrumb={[{
            name: '权限管理',
          }, {
            name: '角色管理',
            href: '/auth/role',
          }, {
            name: this.state.status ? '修改角色' : '添加角色',
          }]}
          action={
            actionlist
          }
        >
          <Spin spinning={this.state.status ? detailLoading : false}>
            <Form {...formItemLayout} >
              <Row gutter={gutter}>
                <div className="block-title">基本信息</div>
                {renderField(getFieldDecorator, '角色名', 'roleName', <Input maxLength={13} />,
                  {
                    rules: [
                      { required: true, message: '请输入角色名' },
                    ],
                  }
                )}
                {renderField(getFieldDecorator, '描述', 'roleDes', <Input maxLength={20} />,
                  {
                    rules: [
                      { required: true, message: '请输入描述' },
                    ],
                  }
                )}
                {renderField(getFieldDecorator, '所属机构', 'organizationId',
                  <Select placeholder="请选择" onChange={this.changeOr}>
                    {
                      (organizationList || []).map((item, i) => {
                        return (<Select.Option key={item.id} value={item.id}>{item.licenseOrganizationName}</Select.Option>);
                      })
                    }
                  </Select>, {
                    rules: [{ required: true, message: '请选择所属机构!' }],
                  }
                )}

              </Row>
              <Spin spinning={this.state.status ? false : this.props.treeLoading}>
                <Tree
                  checkable
                  onExpand={this.onExpand}
                  expandedKeys={expandedKeys}
                  autoExpandParent={autoExpandParent}
                  onCheck={this.onCheck}
                  checkedKeys={checkedKeys}
                  onSelect={this.onSelect}
                  selectedKeys={selectedKeys}
                >
                  {this.renderTreeNodes(treeData)}
                </Tree>
              </Spin>
            </Form>
          </Spin>
        </DyPage>
      </DyControl>
    );
  }
}
export default index;
