import request from 'src/utils/axios';

export function getList(data){
  let currentPage = data.currentPage || 1;
  let pageSize = data.pageSize|| 10;
  // data.startTime = '2019-05-01 10:00:00';
  // data.endTime = '2019-05-03 10:00:00';
  return request.get(`/dayan/scf/admin/warehouse/goods/list/${currentPage}/${pageSize}`, { params: data });
}

export function upload(data){
  return request.post('/dayan/scf/admin/warehouse/goods/import', data);
}

export function deletes(data) {
  return request.delete('/dayan/scf/admin/warehouse/goods/delete', { data: data });
}





