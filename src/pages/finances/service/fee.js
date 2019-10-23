import request from 'src/utils/axios';
export function getList(){
  return request.get('/dayan/scf/admin/serviceFee/list');
}
export function getDetail(data){
  return request.get(`/dayan/scf/admin/serviceFee/detail/${data.id}`);
}



