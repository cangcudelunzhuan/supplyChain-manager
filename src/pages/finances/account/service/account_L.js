import request from 'src/utils/axios';

export function getList(data) {
  let current = data.current || 1;
  let pageSize = data.pageSize || 10;
  return request.get(`/dayan/scf/admin/license/organization/account/queryList/${current}/${pageSize}`);
}
export function add(data) {
  return request.post('/dayan/scf/admin/license/organization/account/create', data);
}
export function update(data) {
  return request.put('/dayan/scf/admin/license/organization/account/update', data);
}
export function detail(data) {
  return request.get(`/dayan/scf/admin/license/organization/account/detail/${data.id}`);
}
export function check(data) {
  return request.put('/dayan/scf/admin/license/organization/account/audit', data);
}
// 获取出资机构下拉框数据
export function getOrgaList(data) {
  return request.get('/dayan/scf/admin/funding/dropdown');
}
// 持牌机构基础详情
export function getBaseInfo(data) {
  return request.get('/dayan/scf/admin/license/organization/account/base');
}