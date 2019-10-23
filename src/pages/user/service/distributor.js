import request from 'src/utils/axios';
// 列表
export function distributorList({ current = 1 } = {}){
  return request.get(`/dayan/scf/admin/dealer/list/${current}`);
}
// 详情
export function distributorDetail({ id }){
  return request.get(`/dayan/scf/admin/dealer/detail/${id}`);
}
// 审核
export function Examine(data){
  return request.post('/dayan/scf/admin/dealer/check', data);
}
export function FileList(data){
  return request.get(`/dayan/scf/admin/dealer/file/${data.id}`, data);
}
export function Edit(data){
  return request.post('/dayan/scf/admin/dealer/update', data);
}
export function imports(data){
  data.requestType = 'upload';
  return request.post('/dayan/scf/admin/dealer/import', data);
}
export function cancel(data){
  return request.delete(`/dayan/scf/admin/dealer/delete/${data.id}`);
}
export function CompanyList(data){
  return request.get(`/dayan/scf/admin/dealer/relate/company/list/${data.id}`);
}
export function addcompany(data){
  return request.post('/dayan/scf/admin/dealer/relate/company/create', data);
}
export function CancelCompany(data){
  return request.get(`/dayan/scf/admin/dealer/relate/company/delete/${data.id}`);
}
export function editcompany(data){
  return request.post('/dayan/scf/admin/dealer/relate/company/update', data);
}
export function importscompany(data){
  let pass = data.file;
  pass.requestType = 'upload';
  return request.post(`/dayan/scf/admin/dealer/relate/company/import/${data.id}`, pass);
}

