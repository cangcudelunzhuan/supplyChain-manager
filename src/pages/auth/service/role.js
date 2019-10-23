import request from 'src/utils/axios';

export function getRoleList(data){
  let current = data.currentPage || 1;
  return request.get(`/dayan/scf/admin/role/queryList/${current}/10`);
}
export function postAdd(data){
  return request.post('/dayan/scf/admin/role/create', data);
}
export function putUpdate(data){
  return request.put('/dayan/scf/admin/role/update', data);
}
export function putDelete(data){
  return request.delete(`/dayan/scf/admin/role/delete/${data.id}`);
}
export function detail(data){
  return request.get(`/dayan/scf/admin/role/detail/${data.id}`);
}
export function getTrees(data){
  return request.get(`/dayan/scf/admin/role/queryResourceTree/${data.organizationId}`);
}
export function organizations(data){
  return request.get('/dayan/scf/admin/role/queryOrganizations');
}
