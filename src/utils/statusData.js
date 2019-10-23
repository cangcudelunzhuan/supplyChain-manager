// 出资机构类型
const organizationType = [{
  name: '银行',
  id: 1,
},
  // {
  //   name: '非银行金融机构',
  //   id: 2,
  // }, {
  //   name: '其他',
  //   id: 3,
  // }
];


// 资金类型
const receiptPayType = [{
  name: '业务保证金',
  id: 1,
}, {
  name: '授信金额',
  id: 2,
}, {
  name: '货款',
  id: 3,
}, {
  name: '赎回款',
  id: 4,
}, {
  name: '还款',
  id: 5,
}, {
  name: '金融服务费',
  id: 6,
}, {
  name: '利息支出',
  id: 7,
}, {
  name: '风险保证金',
  id: 8,
}, {
  name: '票据保证金',
  id: 9,
}, {
  name: '风险保证金-期末退款',
  id: 10,
}, {
  name: '票据保证金-期末退款',
  id: 11,
}, {
  name: '业务保证金-期末退款',
  id: 12,
}];


// 出资方式
const investmentType = [{
  name: '先授信后放款',
  id: 1,
}, {
  name: '整体授信放款',
  id: 2,
}];


// 计息方式
const interestType = [{
  name: '每月付息，到期还本',
  id: 1,
}, {
  name: '到期一次性还本付息',
  id: 2,
}];


// 计费方式
const payType = [{
  name: '每月付费，到期赎回',
  id: 1,
}, {
  name: '到期一次性还本付息',
  id: 2,
}];


// 租赁方式
const repaymentType = [{
  name: '到期一次性赎回',
  id: 1,
}, {
  name: '每月还息，到期还本',
  id: 2,
}, {
  name: '等额本息',
  id: 3,
}, {
  name: '等额本金',
  id: 4,
}];


// 额度期效类别
const LimitedData = [{
  name: '额度有期限',
  id: 1,
}, {
  name: '额度无期限',
  id: 2,
}];


// 授信期限单位
const limitUnitData = [{
  name: '天',
  id: 1,
}, {
  name: '月',
  id: 2,
}, {
  name: '年',
  id: 3,
}];


// 保证金审核状态
const payAdvanceStatus = [{
  name: '待审核',
  id: 1,
}, {
  name: '待确认/审核通过',
  id: 2,
}, {
  name: '审核失败',
  id: 3,
}, {
  name: '确认失败',
  id: 4,
}, {
  name: '确认成功',
  id: 5,
}];


// 水位是否破舱
const brokePositionType = [{
  name: '否',
  id: 1,
}, {
  name: '是',
  id: 2,
}];


// 支付方式
const moneyType = [{
  name: '现金',
  id: 1,
}, {
  name: '银票',
  id: 2,
}];


// 资产类型
const propertyType = [{
  name: '采购订单',
  id: 1,
}, {
  name: '质/抵押物清单',
  id: 2,
}];


// 持牌机构账户类型
const accountType = [{
  name: '托管账户',
  id: 1,
}, {
  name: '回购款账户',
  id: 2,
}, {
  name: '出票人账户',
  id: 3,
}, {
  name: '风险保证金账户',
  id: 4,
}];


// 经销商账户类型
const dealerAccountT = [{
  name: '监管账户',
  id: 1,
}, {
  name: '收票人账户',
  id: 2,
}, {
  name: '票据保证金账户',
  id: 3,
}];


// 票务类型
const ticketType = [
  {
    label: '增值税',
    value: 1,
  },
  {
    label: '零税',
    value: 2,
  },
  {
    label: '其他',
    value: 99,
  },
];

// 授信类型
const creditType = [
  {
    label: '全部',
    value: 0,
  },
  {
    label: '仅现金',
    value: 1,
  },
  {
    label: '仅银票',
    value: 2,
  },
  {
    label: '混合支付',
    value: 3,
  },
  {
    label: '比例支付',
    value: 4,
  },
];

// 额度生效状态
const countValid = [
  {
    value: 1,
    label: '未生效',
  },
  {
    value: 2,
    label: '已生效',
  },
  {
    value: 3,
    label: '已失效',
  },
];

// 额度审核状态
const countAudit = [
  {
    value: 1,
    label: '待审核',
  },
  {
    value: 2,
    label: '审核通过',
  },
  {
    value: 3,
    label: '审核不通过',
  },
];

// 额度-计划类型
const countPlainType = [
  {
    value: 1,
    label: '年度计划',
  },
  {
    value: 2,
    label: '活动计划',
  },
];

// 仓储类型
const storageType = [
  {
    name: '菜鸟',
    id: 1,
  },
  {
    name: '天猫',
    id: 2,
  },
  {
    name: '苏宁',
    id: 3,
  },
  {
    name: '普通',
    id: 4,
  },
];
// 出资机构类型
const orgaType = [
  {
    value: 1,
    label: '银行',
  },
  {
    value: 2,
    label: '非银行类金融机构',
  },
  {
    value: 3,
    label: '其他',
  },
];

const userType = [
  {
    value: 1,
    label: '经销商',
  },
  {
    value: 2,
    label: '持牌机构',
  },
];

const countDate = [
  { id: 1, value: '托管专户' },
  { id: 2, value: '回购款专户' },
  { id: 3, value: '出票人账户' },
  { id: 4, value: '票据保证金账户' },
];

const plainType = [
  { value: 1, label: '年度计划' },
  { value: 2, label: '活动计划' },
];

module.exports = {
  organizationType,
  receiptPayType,
  investmentType,
  interestType,
  repaymentType,
  payType,
  LimitedData,
  limitUnitData,
  payAdvanceStatus,
  brokePositionType,
  moneyType,
  propertyType,
  accountType,
  dealerAccountT,
  ticketType,
  creditType,
  countValid,
  countAudit,
  countPlainType,
  storageType,
  orgaType,
  userType,
  countDate,
  plainType,
};
