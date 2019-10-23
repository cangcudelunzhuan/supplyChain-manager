import request from 'src/utils/axios';

export function getList(data){
  let current = data.currentPage || 1;
  return request.get(`/dayan/scf/admin/pledge/list/${current}/10`);
}
export function add(data){
  return request.post('/dayan/scf/admin/pledge/save', data);
}
export function edit(data){
  return request.put('/dayan/scf/admin/pledge/update', data);
}
export function cancel(data){
  return request.delete(`/dayan/scf/admin/agency/delete/${data.id}`);
}
export function detail(data){
  return request.get(`/dayan/scf/admin/pledge/detail/${data.pledgeId}`);
}
export function agencyDetail(data){
  return request.get(`/dayan/scf/admin/agency/file/${data.id}`);
}
export function synthesizeInfo(data){
  return request.get(`/dayan/scf/admin/dealer/synthesize/info/${data.code}`);
}
export function getyearPlan(data){
  return request.get(`/dayan/scf/admin/yearPlan/info/${data.yearPlanId}`);
}
export function examine(data){
  return request.put('/dayan/scf/admin/pledge/audit', data);
}
export function planList(data){
  return request.get(`/dayan/scf/admin/yearPlan/dropdown/${data.dealerId}`);
}
export function brandInfo(data){
  return request.get(`/dayan/scf/admin/brand/info/${data.code}`);
}
export function licenceorganization(data){
  return request.get(`/dayan/scf/admin/license/dropdown/${data.dealerId}`);
}
export function appoint(data){
  return request.put('/dayan/scf/admin/pledge/appoint', data);
}




