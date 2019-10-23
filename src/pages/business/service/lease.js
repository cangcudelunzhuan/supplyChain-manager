import request from 'src/utils/axios';

// 查询列表
export function getList(data) {
  let pageSize = data.pageSize || 10;
  return request.get(`/dayan/scf/admin/rent/queryList/${data.current}/${pageSize}`);
}

// 查询租赁详情
export function getDetail(data) {
  return request.get(`/dayan/scf/admin/rent/queryDetail/${data.id}`);
}

// 查询机构相关信息
export function getRelaInfo(data) {
  return request.get(`/dayan/scf/admin/rent/queryFundingOrganization/${data.id}/${data.rentId}`);
}

// 租赁申请
export function putApply(data) {
  return request.put('/dayan/scf/admin/rent/apply', data);
}
// 租赁修改
export function putUpdate(data) {
  return request.put('/dayan/scf/admin/rent/update', data);
}
// 下面都是审核确认操作
// 租赁审核 2
export function putBusiAudit(data) {
  return request.put('/dayan/scf/admin/rent/businessAudit', data);
}
// 风控审核 3
export function putRiskAudit(data) {
  return request.put('/dayan/scf/admin/rent/riskManagementAudit', data);
}
// 转融资确认 4
export function putRentConfirm(data) {
  return request.put('/dayan/scf/admin/rent/rentConfirm', data);
}
// 银行确认  13
export function putBankConfirm(data) {
  return request.put('/dayan/scf/admin/rent/rentBankConfirm', data);
}
/**
 * '业务状态 1:转租赁待申请 2:转租赁业务审核 3:转租赁风控审核 4:转租赁待确认 13:转租赁待确认-银行确认 14:风险保证金-收款确认
 * 5:业务保证金-收款待确认 6:用款收款待确认 8:用款待确认 9:用款用款待确认 10:赎回待确认 15：赎回财务审核-退回风险保证金
 * 11:待收票确认 12:交易成功 99:审核失败',
 */
// 用款 项目经理确认8
export function putUseMoneyConfirm(data) {
  return request.put('/dayan/scf/admin/rent/useMoneyConfirm', data);
}
// 收票确认
export function putCollectTicket(data) {
  return request.put('/dayan/scf/admin/rent/collectTicketsConfirm', data);
}

// 通过租赁id查询是否有监管专户
export function getAccountInfo(data) {
  return request.get(`/dayan/scf/admin/rent/checkManagedAccount/${data.id}`);
}

// 租赁再次申请 -》修改
export function putReapply(data) {
  return request.put('/dayan/scf/admin/rent/reapply', data);
}