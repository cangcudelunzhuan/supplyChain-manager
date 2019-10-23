import request from 'src/utils/axios';
// 获取赎回列表
export function getList(data){
  return request.get(`/dayan/scf/admin/order/redeem/queryList/${data.current}/10`, );
}
// 获取表单字段详情
export function getDetail(data){
  return request.get(`/dayan/scf/admin/order/redeem/queryDetail/${data.id}`);
}