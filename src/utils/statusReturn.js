import { Tag } from 'antd';
// 审核状态
function shenHeT(status) {
  switch (status - 0) {
  case 0:
    return (
      <Tag color="rgb(244, 200, 20)">待申请</Tag>
    );
  case 1:
    return (
      <Tag color="#40a9ff">待审核</Tag>
    );
  case 2:
    return (
      <Tag color="#87d068">审核通过</Tag>
    );
  case 3:
    return (
      <Tag color="#f50">审核不通过</Tag>
    );
  case 4:
    return (
      <Tag color="#722ed1">已指派</Tag>
    );
  default:
    break;
  }
}
// 保证金状态
function payStatusT(status, type) {
  switch (status - 0) {
  case 1:
    return (
      <Tag color="#40a9ff">待审核</Tag>
    );
  case 2:
    if (type === 1) {
      return (
        <Tag color="#87d068">审核成功</Tag>
      );
    } else {
      return (
        <Tag color="#faad14">待确认</Tag>
      );
    }
  case 3:
    return (
      <Tag color="#f50">审核失败</Tag>
    );
  case 4:
    return (
      <Tag color="#722ed1">确认失败</Tag>
    );
  case 5:
    return (
      <Tag color="#722ed1">确认成功</Tag>
    );
  default:
    break;
  }
}
// 收付款状态
function payRecT(status) {
  switch (status - 0) {
  case 1:
    return (
      <Tag color="orange">业务保证金</Tag>
    );
  case 2:
    return (
      <Tag color="lime">授信金额</Tag>
    );
  case 3:
    return (
      <Tag color="cyan">货款</Tag>
    );
  case 4:
    return (
      <Tag color="purple">赎回款</Tag>
    );
  case 5:
    return (
      <Tag color="red">还款</Tag>
    );
  case 6:
    return (
      <Tag color="blue">金融服务费</Tag>
    );
  case 7:
    return (
      <Tag color="geekblue">利息支出</Tag>
    );
  case 8:
    return (
      <Tag color="#4c8762">风险保证金</Tag>
    );
  case 9:
    return (
      <Tag color="#ffa39e">票据保证金</Tag>
    );
  case 10:
    return (
      <Tag color="#d3adf7">风险保证金-期末退款</Tag>
    );
  case 11:
    return (
      <Tag color="#91d5ff">票据保证金-期末退款</Tag>
    );
  case 12:
    return (
      <Tag color="rgb(230, 193, 37)">业务保证金-期末退款</Tag>
    );
  default:
    break;
  }
}
// 还款状态
function repaymentS(status) {
  switch (status - 0) {
  case 1:
    return <Tag color="#ffd591">还款中</Tag>;
  case 2:
    return <Tag color="#40a9ff">到期</Tag>;
  case 3:
    return <Tag color="#87d068">还款成功</Tag>;
  case 4:
    return <Tag color="#f50">还款失败</Tag>;
  default:
    break;
  }
}
// 赎回状态
function redeemS(status) {
  switch (status - 0) {
  case 1:
    return <Tag color="#ffd591">赎回中</Tag>;
  case 2:
    return <Tag color="#40a9ff">到期</Tag>;
  case 3:
    return <Tag color="#87d068">赎回成功</Tag>;
  case 4:
    return <Tag color="#f50">赎回失败</Tag>;
  default:
    break;
  }
}
// 业务状态：1.额度申请 2.申请成功 3.申请失败
function businessS(status) {
  switch (status - 0) {
  case 1:
    return <span>额度申请</span>;
  case 2:
    return <span>申请成功</span>;
  case 3:
    return <span>申请失败</span>;
  default:
    break;
  }
}
// 计费方式
function payT(status) {
  switch (status - 0) {
  case 1:
    return '每月付费，到期赎回';
  case 2:
    return '到期一次性还本付息';
  default:
    break;
  }
}

// 计息方式
function interestT(status) {
  switch (status - 0) {
  case 1:
    return '每月付息，到期还本';
  case 2:
    return '到期一次性还本付息';
  default:
    break;
  }
}

// 出资方式
function fundingT(status) {
  switch (status - 0) {
  case 1:
    return '先授信后放款';
  case 2:
    return '整体授信放款';
  default:
    break;
  }
}
// 出资机构类型
function organizationT(status) {
  switch (status - 0) {
  case 1:
    return '银行';
  case 2:
    return '非银行金融机构';
  case 3:
    return '其他';
  default:
    break;
  }
}
// 水位是否破仓
function brokePositionT(status) {
  switch (status - 0) {
  case 1:
    return '否';
  case 2:
    return '是';
  default:
    break;
  }
}
// 开收票状态
function ticketS(status) {
  switch (status - 0) {
  case 1:
    return '待收票';
  case 2:
    return '待审核';
  case 3:
    return '已收票/待开票';
  case 4:
    return '待审核';
  case 5:
    return '已开票';
  default:
    break;
  }
}
// 税票类型
function ticketT(status) {
  switch (status - 0) {
  case 1:
    return '增值税';
  case 2:
    return '零税';
  case 3:
    return '其他';
  default:
    break;
  }
}
// 票务审核结果
function ticketAuditT(status) {
  switch (status - 0) {
  case 1:
    return <Tag color="#40a9ff">待审核</Tag>;
  case 2:
    return <Tag color="#87d008">审核通过</Tag>;
  case 3:
    return <Tag color="#f50">审核不通过</Tag>;
  default:
    break;
  }
}
// 账户审核额状态
function financeTicketT(status) {
  switch (status - 0) {
  case 1:
    return '待开票';
  case 2:
    return '已开票';
  case 3:
    return '待审核';
  default:
    break;
  }
}
// 保证金状态
function dealerT(status) {
  switch (status - 0) {
  case 1:
    return (
      <Tag color="#40a9ff">待审核</Tag>
    );
  case 2:
    return (
      <Tag color="#faad14">待确认</Tag>
    );
  case 3:
    return (
      <Tag color="#f50">待修改</Tag>
    );
  case 4:
    return (
      <Tag color="#722ed1">待申请</Tag>
    );
  case 5:
    return (
      <Tag color="#87d068">通过</Tag>
    );
  default:
    break;
  }
}
// 支付方式
function moneyT(status) {
  switch (status - 0) {
  case 1:
    return '现金';
  case 2:
    return '银票';
  default:
    break;
  }
}
// 账户类型
function accountT(status) {
  switch (status - 0) {
  case 1:
    return '托管账户';
  case 2:
    return '回购款账户';
  case 3:
    return '出票人账户';
  case 4:
    return '风险保证金账户';
  default:
    break;
  }
}
// 资产类型
function sourceT(status) {
  switch (status - 0) {
  case 1:
    return '订单';
  case 2:
    return '质/抵押物';
  default:
    break;
  }
}
// 资金类型
function cashT(status) {
  switch (status - 0) {
  case 1:
    return '本金';
  case 2:
    return '利息';
  default:
    break;
  }
}
// 风险因素类型
function riskT(status) {
  switch (status - 0) {
  case 1:
    return '事前因素';
  case 2:
    return '事后因素';
  default:
    break;
  }
}
// 生效状态
function stateT(status) {
  switch (status - 0) {
  case 1:
    return '未生效';
  case 2:
    return '已生效';
  case 3:
    return '已作废';
  default:
    break;
  }
}

// 转换赎回期限展示文案
function exChange(type) {
  switch (type) {
  case 1:
    return '随时赎回';
  default:
    break;
  }
}
// 转换租赁方式展示文案
function exChangeRepay(type) {
  switch (type) {
  case 1:
    return '到期一次性赎回';
  case 2:
    return '每月还息，到期还本';
  case 3:
    return '等额本息';
  case 4:
    return '等额本金';
  default:
    break;
  }
}

// 授信类型
function  creditT(type){
  switch (type) {
  case 0:
    return '全部';
  case 1:
    return '仅现金';
  case 2:
    return '仅银票';
  case 3:
    return '混合支付';
  case 4:
    return '比例支付';
  default:
    break;
  }
}
module.exports = {
  shenHeT,
  payRecT,
  repaymentS,
  redeemS,
  payT,
  interestT,
  fundingT,
  organizationT,
  businessS,
  payStatusT,
  brokePositionT,
  ticketS,
  ticketT,
  ticketAuditT,
  financeTicketT,
  dealerT,
  moneyT,
  accountT,
  sourceT,
  cashT,
  riskT,
  stateT,
  exChange,
  exChangeRepay,
  creditT,
};