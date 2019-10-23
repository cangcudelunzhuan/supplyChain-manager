import request from 'src/utils/axios';

// 获取持牌机构列表
export function getList(data) {
  let pagesize = data.pagesize || 10;
  return request.get(`/dayan/scf/admin/rent/bill/list?pageSize=${pagesize}&pageNum=${data.current}`);
}
// 获取详情
export function getDetail(data) {
  return request.get(`/dayan/scf/admin/rent/bill/detail/${data.id}`);
}
// 票据提交开票
export function putOpen(data) {
  return request.put('/dayan/scf/admin/rent/bill/open', data);
}
// 审核开票
export function putAudit(data) {
  return request.put('/dayan/scf/admin/rent/bill/audit', data);
}
// 获取待审核发票详情
export function getTicketDetail(data) {
  return request.get(`/dayan/scf/admin/rent/bill/stage/ticket/${data.id}`);
}
// 获取查看详情
export function getSeeDetail(data) {
  return request.get(`/dayan/scf/admin/rent/bill/stage/detail/${data.id}`);
}