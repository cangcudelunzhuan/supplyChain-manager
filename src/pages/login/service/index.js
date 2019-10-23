import request from 'src/utils/axios';

export function userLogin(data){
  return request.post('/dayan/scf/admin/admin/login', data);
}