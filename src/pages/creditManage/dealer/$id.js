import React, { Component } from 'react';
import { DyPage, DyControl, DyExamineBox, DyFormModal } from 'dy-components';
import { Table, Form, Row, Input, Button, Modal, Select, message } from 'antd';
import { connect } from 'dva';
import { isContain, goBack } from 'src/utils/tools';
import Logs from './components/Logs';
import { formItemLayout, renderField, gutter } from 'src/utils/gridInit';
const { confirm } = Modal;
const { Option } = Select;
@connect(({ dealerLimit, loading }) => ({
  dealerLimit,
  tableLoading: loading.effects['dealerLimit/getDealerLimitDetail'],
}))
@Form.create()
class index extends Component {
  state = {
    tableData: [],
    total: 0,
    current: 1,
    status: '',
    visible: false,
    notexaminevisible: false,
    logList: [],

  };
  componentDidMount() {
    let id = this.props.match.params.id;
    this.getDealerDetail(id);
  }
  getDealerDetail = async (id) => {
    let res = await this.props.dispatch({
      type: 'dealerLimit/getDealerDetail',
      payload: {
        id,
      },
    });
    this.props.form.setFieldsValue({
      ...res.data,
    });
    this.setState({ status: res.data.status, logList: res.data.auditLogVoList || [] });
    this.getTableData({
      current: 1,
      id: res.data.dealerId,
    });
  }
  // 提交修改
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(values);
      if (!err) {
        let id = this.props.match.params.id;
        if (id === 'add') {
          // 添加一个查询方法
          confirm({
            title: '确认指派持牌机构，指派后不可更改',
            icon: '',
            onOk: () => this.props.dispatch({
              type: 'business_l/postAdd',
              payload: values,
            }).then((res) => {
              goBack(e, this);
            }),
            onCancel() {
              console.log('Cancel');
            },
          });
        } else {
          // 此处是调整模式
          this.props.dispatch({
            type: 'business_l/putUpdate',
            payload: values,
          }).then((res) => {
            message.success('操作成功！');
            goBack(e, this);
          });
        }
      }
    });
  }
  edit = () => {
    // 此处 修改模式
    const { limitCount14 } = this.props.form.getFieldsValue();
    let id = this.props.match.id;
    // 发送给后台修改的数据
  }
  // 获取表格数据
  getTableData = (payload) => {
    this.props.dispatch({
      type: 'dealerLimit/getDealerLimitDetail',
      payload,
    }).then((res) => {
      this.setState({
        tableData: res.list,
        total: res.pagination.total,
        current: res.pagination.current,
      });
    });
  };

  // 分页改变
  onTableChange = (pagination) => {
    this.getTableData({
      current: pagination.current,
    });
  };

  // 年度计划指派
  order = (e) => {
    // 指派方法putOrder
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let id = this.props.match.params.id;
        let licenseOrganizationId = this.state.licenseId;
        let allValue = {
          id,
          licenseOrganizationId,
        };
        confirm({
          title: '确认指派持牌机构，指派后不可更改',
          icon: '',
          onOk: () => this.props.dispatch({
            type: 'dealerLimit/putOrder',
            payload: allValue,
          }).then((res) => {
            goBack(e, this);
          }),
          onCancel() {
            console.log('Cancel');
          },
        });
      }
    });
  }
  // 打开审核框
  openModal = () => {
    this.setState({
      visible: true,
    });
  }
  // 审核不通过modal打开
  notexamine = () => {
    this.setState({
      notexaminevisible: true,
    });
  }
  // 审核不通过
  setAction = (data) => {
    this.toex(3, data);
  }
  // 审核通过
  examine = () => {
    this.toex(2);
  }
  // 审核接口调用
  toex = async (type, data) => {
    let res = await this.props.dispatch({
      type: 'business_l/putCheck',
      payload: {
        id: this.props.match.params.id,
        status: type,
        ...data,
      },
    });
    ;
    message.success('操作成功！');
    goBack(null, this);
  }
  onChange = (value) => {
    console.log(`selected ${value}`);
  }

  onBlur = () => {
    console.log('blur');
  }

  onFocus = () => {
    console.log('focus');
  }

  onSearch = (val) => {
    console.log('search:', val);
  }
  render() {
    const formData = [
      {
        key: 'remark',
        render() {
          return <Input.TextArea maxLength={40} placeholder="审核不通过原因" />;
        },
        options: {
          rules: [{ required: true, message: '必填!' }],
        },
      },
    ];
    const { tableData, total, current, status, logList } = this.state;
    const { tableLoading } = this.props;
    let id = this.props.match.params.id;
    let isDisabled = true;
    let action = [<Button key="back" onClick={(e) => goBack(e, this)}>返回</Button>];
    if (id === 'add') {
      action.push(<Button key="add" type="primary" onClick={this.handleSubmit}>新增</Button>);
      isDisabled = false;
    }

    switch (status) {
    //  1 修改   2 调整  这两种状态下支持修改额度上线 isdisabled为 false
    case 1:
      if (isContain(1004002002002)) {
        isDisabled = false;
        action.push(
          <Button key="edit" type="primary" onClick={this.handleSubmit}>修改</Button>
        );
      }
      break;
    case 2:
      if (isContain(1004002002002)) {
        isDisabled = false;
        action.push(
          <Button key="edit" type="primary" onClick={this.handleSubmit}>调整</Button>
        );
      }
      break;
    case 3:
      if (isContain(1004002002002)) {
        action.push(
          <Button key="edit" type="primary" onClick={this.openModal}>审核</Button>,
        );
      }
      break;
    default:
      break;
    }
    const columns = [
      {
        title: '额度序号',
        dataIndex: 'index',
      },
      {
        title: '持牌机构编号',
        dataIndex: 'confirmDate',
      },
      {
        title: '持牌机构名称',
        dataIndex: 'financeCreditNo',
      },
      {
        title: '额度（元）',
        dataIndex: 'dealerName',
        render: (data) => {
          return data ? data : '/';
        },
      },
      {
        title: '操作时间',
        dataIndex: 'endDate',
        render: (data) => {
          return data ? data : '/';
        },
      },
    ];
    const { getFieldDecorator } = this.props.form;
    return (
      <DyControl permission="1004002002001" key="control">
        <DyPage
          breadcrumb={[{
            name: '额度管理',
          }, {
            name: '持牌机构额度管理',
            href: '/creditManage/dealer',
          }]}
          action={action}
        >
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Row gutter={gutter}>
              <Logs
                tableData={logList}
              />
              <div className="block-title">基本信息</div>
              {renderField(getFieldDecorator, '持牌机构名称', 'financeCreditNo',
                <Select
                  showSearch
                  placeholder="请选择"
                  optionFilterProp="children"
                  onChange={this.onChange}
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                  onSearch={this.onSearch}
                  disabled={id === 'add' ? false : true}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
              )}
              {renderField(getFieldDecorator, '统一社会信用代码', 'financeCreditAmount', <Input disabled />, {
                rules: [
                  { required: true, message: '必填' },
                ],
              })}
              {renderField(getFieldDecorator, '持牌机构编号', 'startDate', <Input disabled />)}
              {renderField(getFieldDecorator, '持牌机构地址', 'expireDate', <Input disabled />)}
              {renderField(getFieldDecorator, '法人姓名', 'fin14', <Input disabled />)}
              {renderField(getFieldDecorator, '联系人姓名', 'finance14', <Input disabled />)}
              {renderField(getFieldDecorator, '联系人手机号', 'startD14', <Input disabled />)}
              {renderField(getFieldDecorator, '持牌机构放贷额度上限（元）', 'limitCount14', <Input disabled={isDisabled} />, {
                rules: [
                  { required: true, ...RegExp.Money, message: '必填' },
                ],
              })}
            </Row>
          </Form>
          <div className="block-title" style={{ marginTop: '20px' }}>历史记录</div>
          <Table
            rowKey="index"
            loading={tableLoading}
            columns={columns}
            dataSource={tableData}
            pagination={{
              total,
              current,
            }}
            onChange={this.onTableChange}
            size="small"
          />
          <DyExamineBox visible={this.state.visible} ok={this.examine} not={this.notexamine}
            app={this} />
          <DyFormModal visible={this.state.notexaminevisible} formData={formData} title="请填写不通过的原因"
            visibleName={'notexaminevisible'} app={this} action={this.setAction} />
        </DyPage>
      </DyControl>
    );
  }
}

export default index;
