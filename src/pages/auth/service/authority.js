import request from 'src/utils/axios';

export function getList(data){
  let current = data.currentPage || 1;
  return request.get(`/dayan/scf/admin/resource/queryList/${current}/10`);
}
export function add(data){
  return request.post('/dayan/scf/admin/user/create', data);
}
export function edit(data){
  return request.put('/dayan/scf/admin/user/update', data);
}
export function cancel(data){
  return request.get(`/dayan/scf/admin/user/logout/${data.id}`);
}
export function detail(data){
  return request.get(`/dayan/scf/admin/user/detail/${data.id}`);
}
export function agencyDetail(data){
  return request.get(`/dayan/scf/admin/agency/file/${data.id}`);
}
export function organizations(data){
  return request.get('/dayan/scf/admin/role/queryOrganizations');
}
export function getroles(data){
  return request.get(`/dayan/scf/admin/role/queryListByOrganizationId/${data.organizationId}`);
}
export function arealist(data){
  return request.get(`/dayan/scf/admin/resource/queryDetail/${data.roleId}`);
}
export function resetPassword(data){
  return request.put('/dayan/scf/admin/admin/password/reset', data);
}


