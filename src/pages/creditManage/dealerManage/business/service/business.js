import request from 'src/utils/axios';
// 获取年度计划额度管理列表
export function getBusiList(data) {
  let pagesize = data.pagesize || 10;
  return request.get(`/dayan/scf/admin/financeCredit/list/${data.current}/${pagesize}`);
}
// 获取年度计划额度详情
export function getBusiDetail(data) {
  return request.get(`/dayan/scf/admin/financeCredit/detail/${data.id}`);
}
// 审核年度计划额度
export function putAudit(data) {
  return request.put('/dayan/scf/admin/financeCredit/check', data);
}
// 确认年度计划额度
export function putConfirm(data) {
  return request.put('/dayan/scf/admin/financeCredit/confirm', data);
}
// 申请年度计划额度
export function putApply(data) {
  return request.put('/dayan/scf/admin/financeCredit/apply', data);
}
// 修改年度计划额度
export function putUpdate(data) {
  return request.put('/dayan/scf/admin/financeCredit/update', data);
}