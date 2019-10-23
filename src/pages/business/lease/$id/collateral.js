import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Row, Button, message, Select, Radio, Spin } from 'antd';
import { DyPage, DyUpload, DyExamineBox, DyFormModal, DyLog, DyControl, DySubtitle } from 'dy-components';
import { isContain, fileChange, getFileList, timeFormat, goBack } from 'src/utils/tools';
import RegExp from 'src/utils/regExp';
import format from 'src/utils/filter';
import '../index.less';
import { formItemLayout, renderField, gutter } from 'src/utils/gridInit';

@connect(({ lease, loading }) => ({
  lease,
  tableLoading: loading.effects['lease/getDetail'],
}))
@Form.create()
class Detail extends Component {
  state = {
    visible: false,
    notexaminevisible: false,
    status: 1,
    organizationId: '',
    isEditDisabled: true,
    financePayDay: true,
    financeShow: true,
    fileParamList: [],
    accountList: [],
    rentLogVoList: [],
    escrowList: [],
    riskList: [],
    repurList: [],
    isReapply: '',
    rentNo: '',
    isFixed: 1,
  };

  componentDidMount() {
    this.getDetail();
  }

  getDetail = () => {
    let id = this.props.match.params.id;
    this.props.dispatch({
      type: 'lease/getDetail',
      payload: {
        id,
      },
    }).then((res) => {
      const data = res.data;
      this.renderFile(data.rentInfoVo.fileList, 'fileParamList');
      this.renderFile(data.managedAccountVo.fileList, 'accountList');
      this.renderFile(data.financeInfoVo.fileList, 'fundList');
      this.renderFile(data.escrowAccountVo.fileList, 'escrowList');
      this.renderFile(data.repurchaseAccountVo.fileList, 'repurList');
      this.renderFile(data.riskDepositAccountVo.fileList, 'riskList');
      timeFormat(data.orderInfoVo);
      timeFormat(data.rentInfoVo);
      timeFormat(data.financeInfoVo);
      timeFormat(data.rentFinanceInfoVo);
      this.setState({
        rentLogVoList: data.rentLogVoList ? data.rentLogVoList : [],
        status: data.status,
        organizationId: data.rentFinanceInfoVo.organizationId,
        isReapply: data.rentInfoVo.isReapply,
        financePayDay: data.rentFinanceInfoVo.interestType === 1 ? true : false,
        rentNo: data.rentNo,
        isFixed: data.rentInfoVo.payDateType === 1 ? 1 : '',
        financeShow: Object.keys(data.financeInfoVo).length === 0 ? false : true,
      });
      this.props.form.setFieldsValue({
        ...data.orderInfoVo,
        ...data.rentInfoVo,
        ...data.managedAccountVo,
        ...data.financeInfoVo,
        ...data.billInfoVo,
        ...data.escrowAccountVo,
        ...data.rentFinanceInfoVo,
        ...data.repurchaseAccountVo,
        ...data.riskDepositAccountVo,
        ...data,
        payType: data.rentInfoVo.payType === 1 ? '每月付费，到期赎回' : '',
        organizationType: this.exChangeOrgaType(data.rentFinanceInfoVo.organizationType),
        fundingType: data.rentInfoVo.fundingType === 1 ? '先授信后放款' : '整体授信放款',
        fundingExpireDate: data.rentFinanceInfoVo.fundingExpireDate ? data.rentFinanceInfoVo.fundingExpireDate : '无限期',
        fundType: this.exfundType(data.financeInfoVo.fundType),
        fundTypeTop: this.exfundType(data.financeInfoVo.fundTypeTop),
        rentFundingType: this.extype(data.rentFinanceInfoVo.rentFundingType),
        financeLimitUnit: '天', // data.rentFinanceInfoVo.financeLimitUnit === 1 ? '天' : '月',
        riskDepositAmount: format.formatPoint(data.rentInfoVo.tradeAmount * data.rentFinanceInfoVo.riskDepositRate / 100, 4) || 0,
      });
      if (data.status === 99) {
        this.setState({ isEditDisabled: false });
      }
    });
  };
  // 渲染表单中文件列表
  renderFile = (data, type) => {
    if (data) {
      let fileParamList = getFileList(data);
      this.setState({
        [type]: fileParamList,
      });
      this.props.form.setFieldsValue({
        [type]: fileParamList,
      });
    }
  };
  // 申请或修改年度计划
  handleSubmit = (e) => {
    e.preventDefault();
    const { organizationId, fileParamList, status } = this.state;
    let type = '';
    if (status === 1) {
      type = 'lease/putApply';
    } else {
      type = 'lease/putReapply';
    }
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let id = this.props.match.params.id;
        let fundingOrganizationId = organizationId;
        let tradeAmount = values.tradeAmount;
        let advanceRate = values.advanceRate;
        let rentDays = values.rentDays;
        let payDay = values.payDay;
        let intention = values.intention;
        let financeLimit = values.financeLimit;
        let financeLimitUnit = 1;
        let limitUnit = values.limitUnit;
        let payDateType = values.payDateType;
        let allValue = {
          id,
          fileParamList,
          fundingOrganizationId,
          tradeAmount,
          advanceRate,
          rentDays,
          payDay,
          intention,
          financeLimit,
          financeLimitUnit,
          limitUnit,
          payDateType,
        };
        if (this.state.isFixed !== 1) {
          delete values.payDay;
        }
        this.props.dispatch({
          type: type,
          payload: allValue,
        }).then((res) => {
          goBack(e, this);
        });
      }
    });
  };
  // 通过编号查询出资机构相关信息
  getRelaInfo = async () => {
    let id = this.props.form.getFieldValue('organizationNo');
    if (id && id.length === 10) {
      let res = await this.props.dispatch({
        type: 'lease/getRelaInfo',
        payload: {
          id: id,
          rentId: this.props.match.params.id,
        },
      });
      this.setState({
        organizationId: res.data.id,
        financePayDay: res.data.interestType === 1 ? true : false,
      });
      this.renderFile(res.data.managedAccountVo.fileList, 'accountList');
      this.renderFile(res.data.escrowAccountVo.fileList, 'escrowList');
      this.renderFile(res.data.repurchaseAccountVo.fileList, 'repurList');
      this.renderFile(res.data.riskDepositAccountVo.fileList, 'riskList');
      this.props.form.setFieldsValue({
        ...res.data,
        ...res.data.managedAccountVo,
        ...res.data.escrowAccountVo,
        ...res.data.repurchaseAccountVo,
        ...res.data.riskDepositAccountVo,
        organizationType: this.exChangeOrgaType(res.data.organizationType),
        rentFundingType: this.extype(res.data.rentFundingType),
        fundingAvailableAmount: res.data.availableAmount,
        fundingExpireDate: res.data.expireDate ? res.data.expireDate : '无限期',
        rentRate: format.formatPoint((res.data.financeRate - 0) + (this.props.form.getFieldValue('riskPremiumRate') - 0), 4),
      });
    }
  };
  // 输入内容改变清空出资机构相关信息
  clearInfo = () => {
    this.props.form.setFieldsValue({
      id: '',
      organizationName: '',
      organizationNo: '',
      organizationType: '',
    });
  };
  // 转换出资方式
  extype = (type) => {
    switch (type) {
    case 1:
      return '先授信后放款';
    case 2:
      return '整体授信放款';
    default:
      break;
    }
  };
  // 转换出资机构类型
  exChangeOrgaType = (type) => {
    switch (type) {
    case 1:
      return '银行';
    case 2:
      return '非银行金融机构';
    case 3:
      return '其他';
    case '银行':
      return 1;
    case '非银行金融机构':
      return 2;
    case '其他':
      return 3;
    default:
      break;
    }
  };
  // 转换资金类型
  exfundType = (type) => {
    switch (type) {
    case 1:
      return '保证金';
    case 2:
      return '融资';
    case 3:
      return '融资金额';
    case 4:
      return '赎回';
    case 5:
      return '还款';
    default:
      break;
    }
  };
  // 转换计息方式
  exinterestType = (type) => {
    switch (type) {
    case 1:
      return '每月付息，到期还本';
    case 2:
      return '到期一次性还本息';
    default:
      break;
    }
  };
  // 审核不通过
  setAction = (data) => {
    this.toex(3, data);
  };
  // 审核通过
  examine = () => {
    this.toex(2);
  };
  // 审核接口调用
  toex = async (type, data) => {
    let { status } = this.state;
    let url = '';
    switch (status) {
    case 2:
      url = 'lease/putBusiAudit';
      break;
    case 3:
      url = 'lease/putRiskAudit';
      break;
    case 4:
      url = 'lease/putRentConfirm';
      break;
    case 13:
      url = 'lease/putBankConfirm';
      break;
    case 8:
      url = 'lease/putUseMoneyConfirm';
      break;
    case 11:
      url = 'lease/putCollectTicket';
      break;
    default:
      break;
    }
    let res = await this.props.dispatch({
      type: url,
      payload: {
        id: this.props.match.params.id,
        status: type,
        ...data,
      },
    });
    ;
    message.success(res.message);
    goBack(window.event, this);
  };

  // 关闭对话框
  hideModal = () => {
    this.setState({
      visible: false,
    });
  };
  // 审核不通过modal打开
  notexamine = () => {
    this.setState({
      notexaminevisible: true,
    });
  };
  // 提交审核请求
  checkDetail = () => {
    this.setState({ visible: true });
  };
  // 利率改变 清空融资金额数值
  rateChange = () => {
    this.props.form.setFieldsValue({
      'tradeAmount': '',
    });
  };
  // 融资金额 失去焦点 对比金额是否超出年度计划额度
  checkMoney = () => {
    let advanceRate = this.props.form.getFieldValue('advanceRate');
    let dealerAvailableAmount = this.props.form.getFieldValue('dealerAvailableAmount');
    let totalGoodsValue = this.props.form.getFieldValue('totalGoodsValue');
    let fundingAvailableAmount = this.props.form.getFieldValue('fundingAvailableAmount');
    let riskDepositRate = this.props.form.getFieldValue('riskDepositRate');
    if (totalGoodsValue * (advanceRate) / 100 > dealerAvailableAmount || totalGoodsValue * (advanceRate) / 100 > fundingAvailableAmount) { // 增加判断是否大于授信可用额度 1
      message.error('可用额度不足');
      this.setState({ isEditDisabled: true });
      this.props.form.setFieldsValue({
        'tradeAmount': '',
      });
    } else {
      let tradeAmount = format.formatPoint(totalGoodsValue / 100 * (advanceRate));
      this.props.form.setFieldsValue({
        'tradeAmount': tradeAmount === 'NaN' ? '' : tradeAmount,
      });
      if (tradeAmount === 'NaN') {
        return;
      } else {
        this.props.form.setFieldsValue({
          'riskDepositAmount': format.formatPoint(tradeAmount * riskDepositRate / 100),
        });
      }
      this.setState({ isEditDisabled: false });
    }
  };
  // 融资金额改变 计算利率和保证金金额
  tradeChange = () => {
    let totalGoodsValue = this.props.form.getFieldValue('totalGoodsValue');
    let advanceRate = this.props.form.getFieldValue('advanceRate');
    let tradeAmount = this.props.form.getFieldValue('tradeAmount');
    let maxAmount = format.formatPoint(totalGoodsValue * (advanceRate) / 100);
    if (tradeAmount > maxAmount) {
      message.error(`融资金额额度最大值为${maxAmount}`);
      this.props.form.setFieldsValue({
        'tradeAmount': maxAmount,
        'advanceRate': format.formatPoint((maxAmount / totalGoodsValue) * 100),
      });
    } else {
      this.props.form.setFieldsValue({
        'advanceRate': format.formatPoint((tradeAmount / totalGoodsValue) * 100),
      });
    }
  };
  checkChange = (t) => {
    this.props.form.setFieldsValue({ limitUnit: 1 });
    this.setState({
      isFixed: t,
    });
  };

  render() {
    const { rentLogVoList, status, isReapply, isEditDisabled, financePayDay, rentNo, isFixed, financeShow } = this.state;
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
    /**
     * 业务状态 1:转融资待申请 2:转融资租赁审核 3:转融资风控审核 4:转融资待确认 5:缴纳保证金收款待确认 6:用款收款待确认 13:银行确认 8:用款待确认 9:用款用款待确认 10:赎回待确认 11:待收票确认 12:交易成功 99:审核失败
     */
    let isDisabled = true;// 申请状态和审核失败的状态可以修改
    let breadName = '融资详情';
    let action = [<Button key="back" onClick={(e) => goBack(e, this)}>返回</Button>];
    switch (status) {
    case 1:
      breadName = '融资申请';
      if (isContain(1002003002)) {
        isDisabled = false;
        action.push(
          <Button key="sure" type="primary" onClick={this.handleSubmit}>申请</Button>,
        );
      }
      break;
    case 2:
      if (isContain(1002003005)) {
        breadName = '融资审核';
        action.push(
          <Button key="sure" type="primary" onClick={this.checkDetail}>审核</Button>, // 融资审核
        );
      }
      break;
    case 3:
      if (isContain(1002003006)) {
        breadName = '融资审核';
        action.push(
          <Button key="sure" type="primary" onClick={this.checkDetail}>审核</Button>, // 风控审核
        );
      }
      break;
    case 4:
      if (isContain(1002003008)) {
        breadName = '融资确认';
        action.push(
          <Button key="sure" type="primary" onClick={this.checkDetail}>确认</Button>, // 转融资待 项目经理确认
        );
      }
      break;
    case 13:
      if (isContain(1002003007)) {
        breadName = '融资确认';
        action.push(
          <Button key="sure" type="primary" onClick={this.checkDetail}>确认</Button>, // 用款 风控审核改为------>转融资 银行确认
        );
      }
      break;
    case 8:
      if (isContain(1002003009)) {
        breadName = '融资确认';
        action.push(
          <Button key="sure" type="primary" onClick={this.checkDetail}>确认</Button>, // 用款 项目经理确认
        );
      }
      break;
    case 11:
      if (isContain(1002003004)) {
        breadName = '融资确认';
        action.push(
          <Button key="sure" type="primary" onClick={this.checkDetail}>确认</Button>, // 待收票 bd确认
        );
      }
      break;
    case 99:
      if (isContain(1002003003) && isReapply === 1) {
        breadName = '融资申请';
        isDisabled = false;
        action.push(
          <Button key="sure" type="primary" onClick={this.handleSubmit}>申请</Button>,
        );
      }
      break;
    default:
      break;
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <DyControl permission="1002003001" key="control">
        <DyPage
          className="financing-order-detail"
          breadcrumb={[{
            name: '业务管理',
          }, {
            name: '融资管理',
            href: '/business/lease',
          }, {
            name: breadName,
          }]}
          action={action}
        >
          <Spin spinning={this.props.tableLoading}>
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <DyLog
                dataSource={rentLogVoList}
              />
              <Row gutter={gutter}>
                <div className="block-title">订单信息</div>
                {renderField(getFieldDecorator, '经销商编号', 'dealerNo', <Input disabled />)}
                {renderField(getFieldDecorator, '经销商名称（抵押人）', 'dealerName', <Input disabled />)}
                {renderField(getFieldDecorator, '品牌商编号', 'brandNo', <Input disabled />)}
                {renderField(getFieldDecorator, '品牌商名称', 'brandName', <Input disabled />)}
                {renderField(getFieldDecorator, '质/抵押合同编号', 'orderNo', <Input disabled />)}
                {renderField(getFieldDecorator, '质/抵押物总货值（元）', 'totalGoodsValue', <Input disabled />)}
                {renderField(getFieldDecorator, '支付方式', '', '现金')}
              </Row>
              <div className="block-title">融资申请</div>
              {status !== 1 && <div className="block-title-num">(融资编号：{rentNo})</div>}
              <Row gutter={gutter}>
                <DySubtitle title="授信信息" />
                {renderField(getFieldDecorator, '出资机构编号', 'organizationNo', <Input onBlur={this.getRelaInfo} onChange={this.clearInfo}
                  disabled={isDisabled} />, {
                  rules: [
                    { required: true, message: '不能为空' },
                  ],
                })}
                {renderField(getFieldDecorator, '出资机构类型', 'organizationType', <Input disabled />, {
                  rules: [
                    { required: true, message: '不能为空' },
                  ],
                })}
                {renderField(getFieldDecorator, '出资机构名称', 'organizationName', <Input disabled />)}
                {renderField(getFieldDecorator, '出资方式', 'rentFundingType', <Input disabled />)}
                {renderField(getFieldDecorator, '授信可用额度（元）', 'fundingAvailableAmount', <Input disabled />)}
                {renderField(getFieldDecorator, '授信额度到期日', 'fundingExpireDate', <Input disabled />)}
                {renderField(getFieldDecorator, '计息方式', 'interestType', <Select onChange={this.rentTypeChange} placeholder="请选择计息方式"
                  disabled>
                  <Select.Option value={1} key={1}>{'每月付息，到期还本'}</Select.Option>
                  <Select.Option value={2} key={2}>{'到期一次性还本息'}</Select.Option>
                </Select>)}
                {financePayDay && renderField(getFieldDecorator, '固定付费日', 'financePayDay', <Input disabled />)}
                {renderField(getFieldDecorator, '授信利率（%）', 'financeRate', <Input disabled />)}
                {renderField(getFieldDecorator, '风险保证金比例(%)', 'riskDepositRate', <Input disabled />)}
                {renderField(getFieldDecorator, '风险保证金（元）', 'riskDepositAmount', <Input disabled />)}
                {renderField(getFieldDecorator, '授信期限', 'financeLimit', <Input disabled={isDisabled} />, {
                  rules: [
                    { required: true, ...RegExp.number },
                  ],
                })}
                {renderField(getFieldDecorator, '期限单位', 'financeLimitUnit', <Input disabled />, { initialValue: '天' })}
              </Row>

              <Row gutter={gutter}>
                <DySubtitle title="融资信息" />
                {renderField(getFieldDecorator, '出资方式', 'fundingType', <Input disabled />)}
                {renderField(getFieldDecorator, '计费方式', 'payType', <Input disabled />)}
                {renderField(getFieldDecorator, '融资可用额度（元）', 'dealerAvailableAmount', <Input disabled />)}
                {renderField(getFieldDecorator, '付费日期类型', 'payDateType',
                  <Radio.Group onChange={(e) => this.checkChange(e.target.value)} disabled={isDisabled}>
                    <Radio value={1}>{'固定'}</Radio>
                    <Radio value={2}>{'非固定'}</Radio>
                  </Radio.Group>, {
                    rules: [
                      { required: true },
                    ],
                  })}
                {renderField(getFieldDecorator, '质/抵押率（%）', 'advanceRate', <Input onChange={this.rateChange} onBlur={this.checkMoney}
                  disabled={isDisabled} />, {
                  rules: [
                    { required: true, ...RegExp.Rate },
                  ],
                })}
                {isFixed === 1 && renderField(getFieldDecorator, '固定付费日', 'payDay', <Input disabled={isDisabled}
                  placeholder="不能填写28日之后的日期" />, {
                  rules: [
                    { required: true, ...RegExp.payDay },
                  ],
                })}
                {renderField(getFieldDecorator, '融资金额（元）', 'tradeAmount', <Input onBlur={this.tradeChange}
                  disabled={isDisabled || isEditDisabled} />, {
                  rules: [
                    { required: true, ...RegExp.Money },
                  ],
                })}
                {renderField(getFieldDecorator, '融资期限', 'rentDays', <Input disabled={isDisabled} />, {
                  rules: [
                    { required: true, ...RegExp.number },
                  ],
                })}
                {renderField(getFieldDecorator, '期限单位', 'limitUnit', <Select placeholder="请选择期限单位"
                  disabled={isDisabled || this.state.isFixed === 1}>
                  <Select.Option value={1}>{'天'}</Select.Option>
                  <Select.Option value={2}>{'月'}</Select.Option>
                </Select>, {
                  initialValue: 1,
                })}
                {renderField(getFieldDecorator, '风险溢价率（%）', 'riskPremiumRate', <Input disabled />)}
                {renderField(getFieldDecorator, '金融服务费率（%）', 'rentRate', <Input disabled />)}

                {renderField(getFieldDecorator, '融资意图', 'intention', <Input disabled={isDisabled} />)}
                {renderField(getFieldDecorator, '附件', 'fileList',
                  <DyUpload app={this} onChanges={(fileName, fileList) => {
                    fileChange(fileName, fileList, this);
                  }}
                  fileList={this.state.fileParamList}
                  action={'global/toUpload'}
                  fileListName={'fileParamList'}
                  status={isDisabled}
                  />)}
              </Row>
              {financeShow && (
                <Row gutter={gutter}>
                  <div className="block-title">财务信息</div>
                  {renderField(getFieldDecorator, '资金类型', '', '风险保证金')}
                  {renderField(getFieldDecorator, '发生金额（元）', 'financeRiskDepositAmount', <Input disabled />)}
                  {renderField(getFieldDecorator, '资金类型', '', '授信金额')}
                  {renderField(getFieldDecorator, '发生金额（元）', 'financeCreditAmount', <Input disabled />)}
                  {renderField(getFieldDecorator, '资金类型', '', '融资金额')}
                  {renderField(getFieldDecorator, '发生金额（元）', 'financeGoodsAmount', <Input disabled />)}
                  {renderField(getFieldDecorator, '资金类型', '', '风险保证金-期末退款')}
                  {renderField(getFieldDecorator, '发生金额（元）', 'financeRiskDepositBackAmount', <Input disabled />)}
                </Row>
              )}
              <div className="block-title">账户信息</div>
              <Row gutter={gutter}>
                <DySubtitle title="监管专户信息" />
                {renderField(getFieldDecorator, '银行名称', 'bankName', <Input disabled />)}
                {renderField(getFieldDecorator, '银行开户支行', 'bankBranchName', <Input disabled />)}
                {renderField(getFieldDecorator, '监管专户', 'managedAccount', <Input disabled />)}
                {renderField(getFieldDecorator, '支付宝账户', 'payAccount', <Input disabled />)}
                {renderField(getFieldDecorator, '附件', 'accountList',
                  <DyUpload app={this} onChanges={(fileName, fileList) => {
                    fileChange(fileName, fileList, this);
                  }}
                  fileList={this.state.accountList}
                  action={'global/toUpload'}
                  fileListName={'accountList'}
                  status={true}
                  />)}
              </Row>
              <Row gutter={gutter}>
                <DySubtitle title="托管账户信息" />
                {renderField(getFieldDecorator, '银行名称', 'escrowBankName', <Input disabled />)}
                {renderField(getFieldDecorator, '银行开户支行', 'escrowBankBranchName', <Input disabled />)}
                {renderField(getFieldDecorator, '托管账号', 'escrowAccount', <Input disabled />)}
                {renderField(getFieldDecorator, '附件', 'escrowList',
                  <DyUpload app={this} onChanges={(fileName, fileList) => {
                    fileChange(fileName, fileList, this);
                  }}
                  fileList={this.state.escrowList}
                  action={'global/toUpload'}
                  fileListName={'escrowList'}
                  status={true}
                  />)}
              </Row>
              <Row gutter={gutter}>
                <DySubtitle title="回购款账户信息" />
                {renderField(getFieldDecorator, '银行名称', 'repurchaseAccountBankName', <Input disabled />)}
                {renderField(getFieldDecorator, '银行开户支行', 'repurchaseAccountBankBranchName', <Input disabled />)}
                {renderField(getFieldDecorator, '回购款账号', 'repurchaseAccount', <Input disabled />)}
                {renderField(getFieldDecorator, '附件', 'repurList',
                  <DyUpload app={this} onChanges={(fileName, fileList) => {
                    fileChange(fileName, fileList, this);
                  }}
                  fileList={this.state.repurList}
                  action={'global/toUpload'}
                  fileListName={'repurList'}
                  status={true}
                  />)}
              </Row>
              <Row gutter={gutter}>
                <DySubtitle title="风险保证金账户信息" />
                {renderField(getFieldDecorator, '银行名称', 'riskDepositAccountBankName', <Input disabled />)}
                {renderField(getFieldDecorator, '银行开户支行', 'riskDepositAccountBankBranchName', <Input disabled />)}
                {renderField(getFieldDecorator, '银行账号', 'riskDepositAccount', <Input disabled />)}
                {renderField(getFieldDecorator, '附件', 'riskList',
                  <DyUpload app={this}
                    fileList={this.state.riskList}
                    action={'global/toUpload'}
                    fileListName={'riskList'}
                    status={true}
                  />)}
              </Row>
              {(status === 11 || status === 12) && (
                <Row gutter={gutter}>
                  <div className="block-title">票务信息</div>
                  {renderField(getFieldDecorator, '累计收票金额（元）', 'totalAmount', <Input disabled />)}
                  {renderField(getFieldDecorator, '累计开票金额（元）', 'invoiceAmount', <Input disabled />)}
                </Row>
              )}
            </Form>
          </Spin>
          <DyExamineBox visible={this.state.visible} ok={this.examine} not={this.notexamine}
            app={this} />
          <DyFormModal visible={this.state.notexaminevisible} formData={formData} title="请填写不通过的原因"
            visibleName={'notexaminevisible'} app={this} action={this.setAction} />
        </DyPage>
      </DyControl>
    );
  }
}

export default Detail;
