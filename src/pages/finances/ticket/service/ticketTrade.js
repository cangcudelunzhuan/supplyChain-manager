import request from 'src/utils/axios';

// 获取列表
export function getList(data) {
  let pagesize = data.pagesize || 10;
  return request.get(`/dayan/scf/admin/trade/bill/list?pageSize=${pagesize}&pageNum=${data.current}`);
}
// 获取收票详情
export function getDetail(data) {
  return request.get(`/dayan/scf/admin/trade/bill/detail/${data.id}`);
}
// 获取开票详情
export function getOpenDetail(data) {
  return request.get(`/dayan/scf/admin/trade/bill/detail/${data.id}`);
}

// 收票查看详情
export function getRDetail(data) {
  return request.get(`/dayan/scf/admin/trade/bill/rent/check/detail/${data.id}`);
}

// 开票查看详情
export function getODetail(data) {
  return request.get(`/dayan/scf/admin/trade/bill/rent/open/detail/${data.id}`);
}
// 获取开票信息 票务详情
export function getTicketInfo(data) {
  return request.get(`/dayan/scf/admin/trade/bill/rent/ticket/${data.id}`);
}

// 收票录入提交
export function putReceive(data) {
  return request.put('/dayan/scf/admin/trade/bill/rent/check/create', data);
}
// 开票录入提交
export function putOpen(data) {
  return request.put('/dayan/scf/admin/trade/bill/rent/open/create', data);
}
// 审核收票
export function putAuditR(data) {
  return request.put('/dayan/scf/admin/trade/bill/rent/check/audit', data);
}
// 审核开票
export function putAuditO(data) {
  return request.put('/dayan/scf/admin/trade/bill/rent/open/audit', data);
}

// 退票
export function putRefund(data) {
  return request.put('/dayan/scf/admin/trade/bill/rent/refund', data);
}

// 获取票据类型数组
export function getTickets(data) {
  return request.get(`/dayan/scf/admin/trade/bill/rent/ticket/type/${data.id}`);
}