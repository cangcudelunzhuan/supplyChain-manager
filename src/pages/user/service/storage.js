import request from 'src/utils/axios';

export function getList(data){
  let pageNum = data.current||1;
  return request.get('/dayan/scf/admin/funding/list', { params: { pageNum, pageSize: 10 } });
}
export function add(data){
  return request.post('/dayan/scf/admin/funding/create', data);
}
export function edit(data){
  return request.put('/dayan/scf/admin/funding/update', data);
}
export function cancel(data){
  return request.delete(`/dayan/scf/admin/agency/delete/${data.id}`);
}
export function detail(data){
  return request.get(`/dayan/scf/admin/funding/detail/${data.id}`);
}
export function agencyDetail(data){
  return request.get(`/dayan/scf/admin/agency/file/${data.id}`);
}
export function toexamine(data){
  return request.put('/dayan/scf/admin/funding/check', data);
}
