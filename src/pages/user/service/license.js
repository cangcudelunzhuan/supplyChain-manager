import request from 'src/utils/axios';

// 新增详情
export function addLicense(data){
  return request.post('/dayan/scf/admin/license/create', data);
}
// 获取持牌机构列表
export function getList(data){
  let pagesize=data.pagesize||10;
  return request.get(`/dayan/scf/admin/license/list?pageSize=${pagesize}&pageNum=${data.current}`);
}
// 获取详情
export function getDetail(data){
  return request.get(`/dayan/scf/admin/license/detail/${data.id}`);
}
// 修改详情
export function postUpdate(data){
  return request.put('/dayan/scf/admin/license/update', data);
}
// 审核
export function postCheck(data){
  return request.put('/dayan/scf/admin/license/check', data);
}