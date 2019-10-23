import request from 'src/utils/axios';
// 获取额度管理持牌机构列表
export function getBusiList(data) {
  let pagesize = data.pagesize || 10;
  return request.get(`/dayan/scf/admin/creditAmount/list?pageNum=${data.current}&pageSize=${pagesize}`);
}
// 获取额度管理持牌机构详情
export function getBusiDetail(data) {
  return request.get(`/dayan/scf/admin/creditAmount/detail/${data.id}`);
}
// 审核额度管理持牌机构
export function putCheck(data) {
  return request.put('/dayan/scf/admin/creditAmount/audit', data);
}
// 新增额度管理持牌机构
export function postAdd(data) {
  return request.post('/dayan/scf/admin/creditAmount/create', data);
}
// 修改额度管理持牌机构
export function putUpdate(data) {
  return request.put('/dayan/scf/admin/creditAmount/update', data);
}
// 查询持牌机构
export function getLicense(data) {
  return request.get(`/dayan/scf/admin/creditAmount/query/license/${data.id}`);
}
// 查询出资机构
export function getFunding(data) {
  return request.get(`/dayan/scf/admin/creditAmount/query/funding/${data.id}`);
}