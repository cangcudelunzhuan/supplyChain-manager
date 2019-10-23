import request from 'src/utils/axios';

export function getList(data) {
  let current = data.current || 1;
  let pageSize = data.pageSize || 10;
  return request.get(`/dayan/scf/admin/yearPlan/list/${current}/${pageSize}`);
}
// 根据经销商社会信用编号查id
export function getSocId(data) {
  return request.get(`/dayan/scf/admin/dealer/synthesize/info/${data.id}`);
}
// 根据品牌商社会信用编号查id
export function getBrandId(data) {
  return request.get(`/dayan/scf/admin/brand/info/${data.id}`);
}
// 新增
export function postAdd(data) {
  return request.post('/dayan/scf/admin/yearPlan/create', data);
}
// 获取详情
export function getDetail(data) {
  return request.get(`/dayan/scf/admin/yearPlan/info/${data.id}`);
}
// 更新详情
export function putUpdate(data) {
  return request.put('/dayan/scf/admin/yearPlan/update', data);
}
// 审核
export function putCheck(data) {
  return request.put('/dayan/scf/admin/yearPlan/check', data);
}
// 指派
export function putOrder(data) {
  return request.put('/dayan/scf/admin/yearPlan/appoint', data);
}
