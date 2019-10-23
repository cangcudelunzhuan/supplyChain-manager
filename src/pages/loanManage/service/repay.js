import request from 'src/utils/axios';
// 获取赎回列表
export function getList(data){
  let currentPage = data.currentPage||1;
  return request.get('/dayan/scf/admin/order/repayment/list', { params: { pageNum: currentPage, pageSize: 10 } } );
}
// 获取表单字段详情
export function getDetail(data){
  return request.get(`/dayan/scf/admin/order/repayment/detail/${data.id}`);
}
// 赎回操作详情表格数据
export function getDetailTable(data){
  return request.get(`/dayan/scf/admin/repayment/logs/${data.id}`);
}
// 申请赎回
export function putApplyRepay(data){
  return request.put(`/dayan/scf/admin/repayment/apply/${data.id}`);
}
// 审核赎回
export function putAuditRepay(data){
  return request.put('/dayan/scf/admin/repayment/check', data);
}
// 查询租赁详情
export function getFinancing(data){
  return request.get(`/dayan/scf/admin/financing/detail/${data.id}`);
}