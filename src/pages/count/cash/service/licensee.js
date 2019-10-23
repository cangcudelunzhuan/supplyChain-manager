import request from 'src/utils/axios';
// 获取列表
export function getList(data){
  let currentPage = data.currentPage||1;
  return request.get(`/dayan/scf/admin/cash/list/${currentPage}/10`);
}
// 获取详情
export function getDetail(data){
  return request.get(`/dayan/scf/admin/cash/detail/${data.id}`);
}
// 增加
export function add(data){
  return request.put('/dayan/scf/admin/water/manage/update', data);
}
// 删除
export function deletes(data){
  return request.put(`/dayan/scf/admin/water/manage/delete/${data.id}`);
}


