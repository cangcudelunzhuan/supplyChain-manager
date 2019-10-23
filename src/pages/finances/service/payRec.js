import request from 'src/utils/axios';

export function upload(data){
  return request.post('/dayan/scf/admin/brand/import', data);
}
export function getList(data){
  let currentPage = data.currentPage || 1;
  return request.get(`/dayan/scf/admin/receipt/pay/list/${currentPage}/10`, { params: data });
}
export function advanceDetail(data){
  return request.get(`/dayan/scf/admin/receipt/pay/business/deposit/detail/${data.id}`);
}
export function advanceExamine(data){
  return request.put('/dayan/scf/admin/receipt/pay/business/deposit/audit', data);
}
export function financeDetail(data){
  return request.get(`/dayan/scf/admin/receipt/pay/credit/detail/${data.id}`);
}
export function financeExamine(data){
  return request.put('/dayan/scf/admin/receipt/pay/credit/audit', data);
}
export function financeConfrim(data){
  return request.put('/dayan/scf/admin/receipt/pay/credit/confirm', data);
}
export function tradeDetail(data){
  return request.get(`/dayan/scf/admin/receipt/pay/trade/detail/${data.id}`);
}
export function tradeExamine(data){
  return request.put('/dayan/scf/admin/receipt/pay/trade/audit', data);
}
export function tradeConfrim(data){
  return request.put('/dayan/scf/admin/receipt/pay/trade/confirm', data);
}
export function redeemDetail(data){
  return request.get(`/dayan/scf/admin/receipt/pay/redeem/detail/${data.id}`);
}
export function redeemExamine(data){
  return request.put('/dayan/scf/admin/receipt/pay/redeem/audit', data);
}
export function redeemConfrim(data){
  return request.put('/dayan/scf/admin/receipt/pay/redeem/confirm', data);
}
export function repaymentDetail(data){
  return request.get(`/dayan/scf/admin/receipt/pay/repayment/detail/${data.id}`);
}
export function repaymentExamine(data){
  return request.put('/dayan/scf/admin/receipt/pay/repayment/audit', data);
}
export function repaymentConfrim(data){
  return request.put('/dayan/scf/admin/receipt/pay/repayment/confirm', data);
}
export function interestDetail(data){
  return request.get(`/dayan/scf/admin/receipt/pay/interest/detail/${data.id}`);
}
export function interestExamine(data){
  return request.put('/dayan/scf/admin/receipt/pay/interest/audit', data);
}
export function interestConfrim(data){
  return request.put('/dayan/scf/admin/receipt/pay/interest/confirm', data);
}
export function feeDetail(data){
  return request.get(`/dayan/scf/admin/receipt/pay/service/fee/detail/${data.id}`);
}
export function feeExamine(data){
  return request.put('/dayan/scf/admin/receipt/pay/service/fee/audit', data);
}
export function feeConfrim(data){
  return request.put('/dayan/scf/admin/receipt/pay/service/fee/confirm', data);
}

export function riskDetail(data){
  return request.get(`/dayan/scf/admin/receipt/pay/risk/deposit/detail/${data.id}`);
}
export function riskExamine(data){
  return request.put('/dayan/scf/admin/receipt/pay/risk/deposit/audit', data);
}
export function billDetail(data){
  return request.get(`/dayan/scf/admin/receipt/pay/bill/deposit/detail/${data.id}`);
}
export function billExamine(data){
  return request.put('/dayan/scf/admin/receipt/pay/bill/deposit/audit', data);
}
export function riskRefundDetail(data){
  return request.get(`/dayan/scf/admin/receipt/pay/risk/deposit/refund/detail/${data.id}`);
}
export function riskRefundExamine(data){
  return request.put('/dayan/scf/admin/receipt/pay/risk/deposit/refund/audit', data);
}
export function billRefundDetail(data){
  return request.get(`/dayan/scf/admin/receipt/pay/bill/deposit/refund/detail/${data.id}`);
}
export function billRefundExamine(data){
  return request.put('/dayan/scf/admin/receipt/pay/bill/deposit/refund/audit', data);
}
export function advanceRefundDetail(data){
  return request.get(`/dayan/scf/admin/receipt/pay/business/deposit/refund/detail/${data.id}`);
}
export function advanceRefundExamine(data){
  return request.put('/dayan/scf/admin/receipt/pay/business/deposit/refund/audit', data);
}







