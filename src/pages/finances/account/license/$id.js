import React, { Component } from 'react';
import { DyPage, DyUpload, DyControl, DyFormModal, DyExamineBox } from 'dy-components';
import { Form, Input, Button, Modal, message, Row, DatePicker, Select } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import AuditLog from '../components/AuditLog';
import { isContain, getFileList, setAccount, goBack } from 'src/utils/tools';
import { formItemLayout, renderField, gutter } from 'src/utils/gridInit';
import '../../index.less';
const confirm = Modal.confirm;
const { Option } = Select;
@connect()
@Form.create()
class index extends Component {
  state = {
    status: '',
    fileParamList: [],
    value: '',
    selectData: [],
    tableData: [],
    visible: false,
    notexaminevisible: false,
  }
  componentDidMount() {
    let { id } = this.props.match.params;
    if (id !== 'add') {
      this.getDetail();
    } else {
      this.getOrgaList();
      this.getBaseInfo();
    }
  }
  // 获取下拉框数据 默认选中第一个
  getOrgaList = async () => {
    let res = await this.props.dispatch({
      type: 'account_L/getOrgaList',
      payload: {},
    });
    this.setState({
      selectData: res.data ? res.data : [],
    });
  }
  // 获取默认持牌机构信息
  getBaseInfo = async () => {
    let res = await this.props.dispatch({
      type: 'account_L/getBaseInfo',
      payload: {},
    });
    this.props.form.setFieldsValue({ ...res.data });
  }
  // 获取详情
  getDetail = async () => {
    let { id } = this.props.match.params;
    let resList = await this.props.dispatch({
      type: 'account_L/getOrgaList',
      payload: {},
    });
    this.setState({
      selectData: resList.data ? resList.data : [],
    });
    let res = await this.props.dispatch({
      type: 'account_L/detail',
      payload: { id },
    });
    if (res.data.fileVoList) {
      let fileParamList = getFileList(res.data.fileVoList);
      res.data.fileParamList = fileParamList;
      this.setState({
        fileParamList: fileParamList,
      });
    }
    this.props.form.setFieldsValue({
      ...res.data,
      openTime: moment(res.data.openTime),
    });
    this.state.selectData.map((item) => {
      if (item.id === res.data.fundingOrganizationId) {
        this.props.form.setFieldsValue({
          bankBranchName: item.bankBranchName,
          bankName: item.bankName,
        });
      }
    });
    this.setState({ status: res.data.status, id: res.data.id, tableData: res.data.auditRecord });
  }

  // 提交审核
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let type = this.props.match.params.id;
        if (type !== 'add') {
          values.id = this.state.id;
        }
        values.fileParamList = this.state.fileParamList;
        values.openTime = values['openTime'].format('YYYY-MM-DD HH:mm:ss');
        confirm({
          title: type === 'add' ? '确认新增此项' : '确认修改此项',
          onOk: async () => {
            this.examineAction(values, type);
          },
        });
      }
    });
  }
  // 新增或者修改
  examineAction = async (values, type) => {
    let res = type === 'add' ? (
      await this.props.dispatch({
        type: 'account_L/add',
        payload: values,
      })
    ) : (
      await this.props.dispatch({
        type: 'account_L/update',
        payload: values,
      })
    );
    message.success('操作成功');
    goBack(null, this);
  }
  // 改变出资机构类型
  handleSelectChange = (value) => {
    console.log(value);
    this.state.selectData.map((item) => {
      if (item.id === value) {
        this.props.form.setFieldsValue({
          bankBranchName: item.bankBranchName,
          bankName: item.bankName,
        });
      }
    });
  }
  // 打开审核框
  openModal = (e) => {
    e.preventDefault();
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
  setAction = (data, e) => {
    this.toex(3, data, e);
  }
  // 审核通过
  examine = (e) => {
    this.toex(2, {}, e);
  }
  // 审核接口调用
  toex = async (type, data, e) => {
    e.persist();
    let res = await this.props.dispatch({
      type: 'account_L/check',
      payload: {
        id: this.props.match.params.id,
        status: type,
        ...data,
      },
    });
    ;
    message.success('操作成功！');
    goBack(e, this);
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
    const { status, selectData, tableData } = this.state;
    const countDate = [{ id: 1, value: '托管账户' }, { id: 2, value: '回购款账户' }, { id: 3, value: '出票人账户' }, { id: 4, value: '风险保证金账户' }];
    let isDisabled = true;
    const options = {
      rules: [
        { required: true, whitespace: true, message: '不能为空' },
      ],
    };
    let action = [<Button key="back" onClick={(e) => goBack(e, this)}>返回</Button>];
    let { id } = this.props.match.params;
    if (id === 'add' && isContain(1005001002001)) {
      action.push(<Button key="sure" type="primary" onClick={this.handleSubmit}>新增</Button>);
      isDisabled = false;
    }
    switch (status) {
    case 1:
      if (isContain(1005001002004)) {
        action.push(<Button key="sure" type="primary" onClick={this.openModal}>审核</Button>);
        isDisabled = true;
      }
      break;
    case 3:
      if (isContain(1005001002002)) {
        action.push(<Button key="sure" type="primary" onClick={this.handleSubmit}>修改</Button>);
        isDisabled = false;
      }
      break;
    default:
      break;
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <DyControl permission="1005001002003">
        <DyPage
          className="account-detail"
          breadcrumb={[{
            name: '财务管理',
          }, {
            name: '持牌机构账户管理',
            href: '/finances/account/license',
          }, {
            name: '持牌机构账户',
          }]}
          action={action}
        >
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Row gutter={gutter}>
              <AuditLog
                tableData={tableData}
              />
              <div className="block-title">基本信息</div>
              {id !== 'add' ? renderField(getFieldDecorator, '账户编号', 'accountNo', <Input disabled />) : ''}
              {renderField(getFieldDecorator, '持牌机构编号', 'licenseOrganizationNo', <Input disabled />, options)}
              {renderField(getFieldDecorator, '持牌机构名称', 'licenseOrganizationName', <Input disabled />, options)}
              {renderField(getFieldDecorator, '出资机构类型', '', '银行')}
              {renderField(getFieldDecorator, '出资机构名称', 'fundingOrganizationId',
                <Select
                  placeholder="请选择出资机构"
                  onChange={this.handleSelectChange}
                  disabled={isDisabled}
                >
                  {selectData.map((item) => {
                    return <Option key={item.id} value={item.id}>{item.organizationName}</Option>;
                  })}
                </Select>, {
                  rules: [
                    { required: true, message: '必选' },
                  ],
                })}
              {renderField(getFieldDecorator, '银行名称', 'bankName', <Input disabled />)}
              {renderField(getFieldDecorator, '银行开户行', 'bankBranchName', <Input disabled />)}
              {renderField(getFieldDecorator, '账户类型', 'accountType',
                <Select
                  placeholder="请选择出账户类型"
                  disabled={isDisabled}
                >
                  {countDate.map((item) => {
                    return <Option key={item.id} value={item.id}>{item.value}</Option>;
                  })}
                </Select>, {
                  rules: [
                    { required: true, message: '必选' },
                  ],
                })}
              {renderField(getFieldDecorator, '银行账号', 'bankAccount', <Input disabled={isDisabled} onBlur={() => { setAccount('bankAccount', this); }} />, options)}
              {renderField(getFieldDecorator, '开户时间', 'openTime', <DatePicker disabled={isDisabled} />, {
                rules: [
                  { type: 'object', required: true, whitespace: true, message: '必选' },
                ],
              })}
            </Row>
            <Row gutter={gutter}>
              <div className="block-title">附件</div>
              {renderField(getFieldDecorator, '', 'fileParamList',
                <DyUpload app={this}
                  fileList={this.state.fileParamList}
                  action={'global/toUpload'}
                  fileListName={'fileParamList'} status={isDisabled}
                />, {
                  rules: [
                    { required: false },
                  ],
                })}
            </Row>
          </Form>
        </DyPage>
        <DyExamineBox visible={this.state.visible} ok={this.examine} not={this.notexamine}
          app={this} />
        <DyFormModal visible={this.state.notexaminevisible} formData={formData} title="请填写不通过的原因"
          visibleName={'notexaminevisible'} app={this} action={this.setAction} />
      </DyControl>
    );
  }
}
export default index;
