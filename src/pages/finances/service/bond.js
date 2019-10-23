import request from 'src/utils/axios';

export function getList(data){
  let currentPage = data.currentPage || 1;
  return request.get(`/dayan/scf/admin/bail/list/${currentPage}`, data);
}
export function detail(data){
  return request.get(`/dayan/scf/admin/bail/info/${data.id}`);
}
export function orderinfo(data){
  // return request.get(`/dayan/scf/admin/order/info/${data.id}`);
  return request.get(`/dayan/scf/admin/order/info/financing/${data.id}`);
}
export function financinginfo(data){
  return request.get(`/dayan/scf/admin/financing/detail/audit/${data.id}`);
}
export function Examine(data){
  return request.put('/dayan/scf/admin/bail/check', data);
}




