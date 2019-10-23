import { routerRedux } from 'dva/router';
import { userLogin } from '../service';
import request from 'src/utils/axios';

export default {
  namespace: 'login',
  state: {

  },
  effects: {
    *userLogin({ payload }, { call, put }) {
      const response = yield call(userLogin, payload);
      if (response.code === '000000') {
        window.localStorage.setItem('token', response.data.token);
        window.localStorage.setItem('username', response.data.username);
        window.localStorage.setItem('isChanged', response.data.isChanged); // 1修改过密码 2没有修改过密码
        request.defaults.headers.token = window.localStorage.getItem('token');
        /**
         * 多个异步任务的并行执行
         * 如何多任务调度:https://dvajs.com/guide/develop-complex-spa.html#%E5%A4%9A%E4%BB%BB%E5%8A%A1%E8%B0%83%E5%BA%A6
         */
        yield [
          put({
            type: 'global/getMenus',
          }),
          put({
            type: 'global/getAuthority',
          }),
          put(routerRedux.replace('/')),
        ];
      }
    },
  },
};