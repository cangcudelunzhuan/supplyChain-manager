import request from 'src/utils/axios';

export function upload(data){
  data.requestType = 'upload';
  return request.post('/dayan/scf/admin/brand/import', data);
}
export function getList(data){
  let current = data.current||1;
  return request.get(`/dayan/scf/admin/brand/list/${current}/10`, data);
}
export function detail(data){
  return request.get(`/dayan/scf/admin/brand/detail/${data.id}`, data);
}
export function Examine(data){
  return request.put('/dayan/scf/admin/brand/check', data);
}
export function Edit(data){
  return request.put('/dayan/scf/admin/brand/update', data);
}
export function FileList(data){
  return request.get(`/dayan/scf/admin/brand/file/${data.id}`, data);
}
export function cancel(data){
  return request.delete(`/dayan/scf/admin/brand/delete/${data.id}`);
}


