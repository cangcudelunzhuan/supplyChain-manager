import request from 'src/utils/axios';
// 获取列表
export function getList(data){
  let currentPage = data.currentPage||1;
  // data.pageNum = currentPage;
  // data.pageSize = 10;
  delete data.currentPage;
  return request.post(`/dayan/scf/admin/water/manage/last/list?pageSize=10&pageNum=${currentPage}`, data );
}
// 获取详情
export function getDetail(data){
  let currentPage = data.currentPage||1;
  return request.get(`/dayan/scf/admin/water/manage/dealer/list/${data.id}`, { params: { pageNum: currentPage, pageSize: 10 } });
}
// 增加
export function add(data){
  return request.put('/dayan/scf/admin/water/manage/update', data);
}
// 删除
export function deletes(data){
  return request.put(`/dayan/scf/admin/water/manage/delete/${data.id}`);
}

