import React, { Component } from 'react';
import { DyPage, DyUpload, DyControl, DyFormModal, DyExamineBox, DyAuditLog } from 'dy-components';
import { Form, Input, Button,  Modal, message, Row, Checkbox, DatePicker, Select } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import { isContain, getFileList, setAccount, goBack } from 'src/utils/tools';
import { dealerAccountT } from 'src/utils/statusData';
import '../../index.less';
import { formItemLayout, renderField, gutter } from 'src/utils/gridInit';
const confirm = Modal.confirm;
const { Option } = Select;
@connect()
@Form.create()
class index extends Component {
  state = {
    status: '',
    fileParamList: [],
    value: '',
    dealId: '',
    selectData: [],
    visible: false,
    countType: '',
    notexaminevisible: false,
  }
  componentDidMount() {
    let { id } = this.props.match.params;
    if (id !== 'add') {
      this.getOrgaList();
      this.getDetail();
    } else {
      this.getOrgaList();
    }
  }
  // 获取下拉框数据 默认选中第一个
  getOrgaList = async () => {
    let res = await this.props.dispatch({
      type: 'account_d/getOrgaList',
      payload: {},
    });
    this.setState({
      selectData: res.data ? res.data : [],
    });
  }
  // 获取详情
  getDetail = () => {
    let { id } = this.props.match.params;
    this.props.dispatch({
      type: 'account_d/detail',
      payload: { id },
    }).then((res) => {
      if (res.data.fileVoList) {
        let fileParamList = getFileList(res.data.fileVoList);
        res.data.fileParamList = fileParamList;
        this.setState({
          fileParamList: fileParamList,
        });
      }
      this.setState({ status: res.data.status, id: id, fundingOrganizationName: res.data.fundingOrganizationName, countType: res.data.accountType });

      this.props.form.setFieldsValue({
        ...res.data,
        accountCreateTime: moment(res.data.accountCreateTime),
        bindStatus: res.data.bindStatus === 1 ? true : false,
      });

    });
  }

  // 提交审核
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (values.accountType === 1 && values.bindStatus !== true) {
          message.error('请确认监管专户与支付宝账户关联');
          return;
        }
        let type = this.props.match.params.id;
        if (type !== 'add') {
          values.id = this.state.id;
        } else {
          values.dealId = this.state.dealId;
        }
        values.fileParamList = this.state.fileParamList;
        values.fundingOrganizationName = this.state.fundingOrganizationName;
        values.accountCreateTime = values['accountCreateTime'].format('YYYY-MM-DD HH:mm:ss');
        if (this.state.countType === 1) {
          values.bindStatus = values.bindStatus ? 1 : 0;
        } else {
          values.bindStatus = 1;
          values.payAccount = 1;
        }
        delete values.bankBranchName;
        delete values.dealerNo;
        delete values.dealerName;
        delete values.bankName;
        delete values.dealerAccountNo;
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
        type: 'account_d/add',
        payload: values,
      })
    ) : (
      await this.props.dispatch({
        type: 'account_d/update',
        payload: values,
      })
    );
    message.success(res.message);
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
        this.setState({ fundingOrganizationName: item.organizationName });
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
      type: 'account_d/check',
      payload: {
        id: this.props.match.params.id,
        status: type,
        ...data,
      },
    });
    ;
    message.success(res.message);
    goBack(e, this);
  }
  // 根据编号查询经销商名称
  getRelaInfo = async () => {
    let num = this.props.form.getFieldValue('dealerNo');
    if (num && (num.length === 10 || num.length === 18)) {
      let res = await this.props.dispatch({
        type: 'account_d/getSocId',
        payload: { id: num },
      });
      this.props.form.setFieldsValue({
        dealerName: res.data.dealerName,
      });
      this.setState({ dealId: res.data.dealerId });
    }
  }
  numChange = () => {
    this.props.form.setFieldsValue({ dealerName: '' });
  }
  countTypeChange = (v) => {
    console.log(v);
    this.setState({
      countType: v,
    });
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
    const { status, selectData, countType } = this.state;
    let isDisabled = true;
    const options = {
      rules: [
        { required: true, whitespace: true, message: '不能为空' },
      ],
    };
    let action = [<Button key="back" onClick={(e) => goBack(e, this)}>返回</Button>];
    let { id } = this.props.match.params;
    if (id === 'add' && isContain(1005001001001)) {
      action.push(<Button key="sure" type="primary" onClick={this.handleSubmit}>新增</Button>);
      isDisabled = false;
    }
    switch (status) {
    case 1:
      if (isContain(1005001001004)) {
        action.push(<Button key="sure" type="primary" onClick={this.openModal}>审核</Button>);
        isDisabled = true;
      }
      break;
    case 3:
      if (isContain(1005001001002)) {
        action.push(<Button key="sure" type="primary" onClick={this.handleSubmit}>修改</Button>);
        isDisabled = false;
      }
      break;
    default:
      break;
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <DyControl permission="1005001001003">
        <DyPage
          className="account-detail"
          breadcrumb={[{
            name: '财务管理',
          }, {
            name: '经销商账户管理',
            href: '/finances/account/distributor',
          }, {
            name: '经销商账户',
          }]}
          action={action}
        >
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Row gutter={gutter}>
              <DyAuditLog
                id={id}
                type={id === 'add' ? 'add' : 6}
              />
              <div className="block-title">基本信息</div>
              {id !== 'add' ? renderField(getFieldDecorator, '账户编号', 'dealerAccountNo', <Input disabled />) : ''}
              {renderField(getFieldDecorator, '经销商编号', 'dealerNo', <Input onBlur={this.getRelaInfo} onChange={this.numChange} disabled={isDisabled} />, options)}
              {renderField(getFieldDecorator, '经销商名称', 'dealerName', <Input disabled />, options)}
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
                  onChange={this.countTypeChange}
                  disabled={isDisabled}
                >
                  {dealerAccountT.map((item) => {
                    return <Option key={item.id} value={item.id}>{item.name}</Option>;
                  })}
                </Select>, {
                  rules: [
                    { required: true, message: '必选' },
                  ],
                })}
              {renderField(getFieldDecorator, '银行账号', 'bankCardNo', <Input disabled={isDisabled} onBlur={() => { setAccount('bankCardNo', this); }} />, options)}
              {renderField(getFieldDecorator, '开户时间', 'accountCreateTime', <DatePicker disabled={isDisabled} />, {
                rules: [
                  { type: 'object', required: true, whitespace: true, message: '必选' },
                ],
              })}
              {countType === 1 && renderField(getFieldDecorator, '支付宝账户', 'payAccount', <Input disabled={isDisabled} />, options)}
              {countType === 1 && renderField(getFieldDecorator, '确认', 'bindStatus', <Checkbox disabled={isDisabled}>请确认监管专户与支付宝账户关联</Checkbox>, {
                valuePropName: 'checked',
                rules: [
                  { required: true, whitespace: true, message: '必选', type: 'boolean' },
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
