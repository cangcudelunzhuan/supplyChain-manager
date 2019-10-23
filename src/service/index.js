import request from '../utils/axios';

export function getBaseInfo(params){
  return request({
    method: 'get',
    url: '/account/getBaseInfo',
    params,
  });
}

export function logout(params){
  return request({
    method: 'get',
    url: '/logout',
    params,
  });
}

export function getMenus(params){
  return request({
    method: 'get',
    url: '/dayan/scf/admin/resource/query',
    params,
  });
}
// 登录后 获取权限数组
export function getAuthority(params){
  return request({
    method: 'get',
    url: '/dayan/scf/admin/resource/queryResource',
    params,
  });
}
// 公共审核日志接口
export function getAuditLog({ businessId, businessType }){
  return request({
    method: 'get',
    url: `/dayan/scf/admin/audit/log/list?businessId=${businessId}&businessType=${businessType}`,
  });
}

// 上传图片接口
export function upload(data){
  data.requestType = 'upload';
  return request.post('/dayan/file/upload/scf/admin/file/common', data);
}
export function logList(data){
  return request.get('/dayan/scf/admin/audit/log/list', { params: data });
}

// 修改密码
export function changePassword(data){
  return request.put('/dayan/scf/admin/admin/password/change', data);
}