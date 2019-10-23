import request from 'src/utils/axios';

export function getList(data) {
  let current = data.current || 1;
  return request.get(`/dayan/scf/admin/dealer/account/list?pageNum=${current}&pageSize=10`);
}
export function add(data) {
  return request.post('/dayan/scf/admin/dealer/account/create', data);
}
export function update(data) {
  return request.put('/dayan/scf/admin/dealer/account/update', data);
}
export function detail(data) {
  return request.get(`/dayan/scf/admin/dealer/account/detail/${data.id}`);
}
export function check(data) {
  return request.put('/dayan/scf/admin/dealer/account/check', data);
}
// 根据经销商社会信用编号查id
export function getSocId(data) {
  return request.get(`/dayan/scf/admin/dealer/synthesize/info/${data.id}`);
}
// 获取出资机构下拉框数据
export function getOrgaList(data) {
  return request.get('/dayan/scf/admin/funding/dropdown');
}