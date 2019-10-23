import request from 'src/utils/axios';

// 获取融资额度列表
export function getDealerLimitList(data) {
  let pagesize = data.pagesize || 10;
  return request.get(`/dayan/scf/admin/financeCredit/dealer/credit/list/${data.current}/${pagesize}`);
}

// 获取融资额度详情列表
export function getDealerLimitDetail(data) {
  const pagesize = data.pagesize || 10;
  return request.get(`/dayan/scf/admin/financeCredit/dealer/credit/detail/history/${data.id}?pageNum=${data.current}&pageSize=${pagesize}`);
}
// 获取融资额度详情表单
export function getDealerDetail(data) {
  return request.get(`/dayan/scf/admin/financeCredit/dealer/credit/detail/${data.id}`);
}
// 获取持牌机构详情
export function getLicense(data) {
  return request.get(`/dayan/scf/admin/license/info/${data.id}`);
}
// 指派
export function putOrder(data) {
  return request.put(`/dayan/scf/admin/financeCredit/dealer/credit/appoint?id=${data.id}&licenseOrganizationId=${data.licenseOrganizationId}`);
}