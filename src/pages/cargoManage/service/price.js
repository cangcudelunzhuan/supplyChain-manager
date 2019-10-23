import request from 'src/utils/axios';

export function getIndustrialParkList(data) {
  let pageNum = data.current || 1;
  return request.get(`/dayan/scf/admin/industrialPark/getList/${pageNum}/10`);
}

export function getPolicyList(data) {
  let pageNum = data.current || 1;
  return request.get(`/dayan/scf/admin/industrialParkPolicy/getList/${pageNum}/10`);
}

export function getIndustrialParkDetail(data) {
  return request.get(`/dayan/scf/admin/industrialPark/getDetail/${data.id}`);
}

export function getIndustrialParkDetailByNo(data) {
  return request.get(`/dayan/scf/admin/industrialPark/getDetailByNo/${data.no}`);
}

export function getPolicyDetail(data) {
  return request.get(`/dayan/scf/admin/industrialParkPolicy/getDetail/${data.id}`);
}

export function addIndustrialPark(data) {
  return request.post('/dayan/scf/admin/industrialPark/create', data);
}

export function addPolicy(data) {
  return request.post('/dayan/scf/admin/industrialParkPolicy/create', data);
}

export function updateIndustrialPark(data) {
  return request.post('/dayan/scf/admin/industrialPark/update', data);
}

export function updatePolicy(data) {
  return request.post('/dayan/scf/admin/industrialParkPolicy/update', data);
}

export function auditIndustrialPark(data) {
  return request.post('/dayan/scf/admin/industrialPark/audit', data);
}

export function auditPolicy(data) {
  return request.post('/dayan/scf/admin/industrialParkPolicy/audit', data);
}

export function getIndustrialParkFiles(data) {
  return request.get(`/dayan/scf/admin/industrialPark/getExtFiles/${data.id}`);
}

export function getIndustrialParkPolicyFiles(data) {
  return request.get(`/dayan/scf/admin/industrialParkPolicy/getExtFiles/${data.id}`);
}
