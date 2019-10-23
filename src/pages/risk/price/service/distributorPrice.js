import request from 'src/utils/axios';

export function getList(data){
  let current = data.currentPage || 1;
  return request.get('/dayan/scf/admin/risk/dealerprice/list');
}
export function add(data){
  return request.post('/dayan/scf/admin/risk/dealerprice/create', data);
}
export function edit(data){
  return request.post('/dayan/scf/admin/risk/dealerprice/modify', data);
}
export function detail(data){
  return request.get(`/dayan/scf/admin/risk/dealerprice/detail/${data.id}`);
}
export function synthesizeInfo(data){
  return request.get(`/dayan/scf/admin/risk/dealerprice/relativeinfo/${data.dealerNo}`);
}
export function examine(data){
  return request.post('/dayan/scf/admin/risk/dealerprice/audit', data);
}
export function listValid(data){
  return request.get(`/dayan/scf/admin/risk/riskfactor/listValid/${data.type}`);
}
export function getByCondition(data){
  return request.post('/dayan/scf/admin/industrialPark/getByCondition', {});
}
export function cyDetail(data){
  return request.get(`/dayan/scf/admin/industrialParkPolicy/getTaxPolicy/${data.id}`);
}






