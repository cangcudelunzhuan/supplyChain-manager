import request from 'src/utils/axios';
export function getList(){
  return request.get('/dayan/scf/admin/serviceFee/bill/list');
}
export function getDetail(data){
  return request.get(`/dayan/scf/admin/serviceFee/bill/detail/${data.id}`);
}
export function toSubmit(data){
  return request.put('/dayan/scf/admin/serviceFee/bill/submit', data);
}




