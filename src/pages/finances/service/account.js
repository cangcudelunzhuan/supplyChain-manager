import request from 'src/utils/axios';

export function getList(data){
  let current = data.current || 1;
  return request.get(`/dayan/scf/admin/account/list?pageNum=${current}&pageSize=10`);
}
export function detail(data){
  return request.get(`/dayan/scf/admin/account/detail/${data.id}`);
}
export function putOpen(data){
  return request.put('/dayan/scf/admin/account/open', data);
}