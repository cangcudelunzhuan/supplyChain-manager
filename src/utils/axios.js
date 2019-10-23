import axios from 'axios';
import { routerRedux } from 'dva/router';
import { message, Modal } from 'antd';
import { encrypt, decrypt, timeFormat, getmoney } from 'src/utils/tools';
import {
  filterArr,
  moneyArr,
} from 'src/utils/formatKey';
let pendings = {};
let cancelPending = (config) => {
  let source = pendings[config.url];
  if (source) {
    source.cancel();
    pendings[config.url] = null;
  } else {
    pendings[config.url] = axios.CancelToken.source();
    config.cancelToken = pendings[config.url].token;
  }
};

const BUILD_TYPE = process.env.BUILD_TYPE;
let BASEURL = '';
switch (BUILD_TYPE) {
case 'dev':
  BASEURL = 'http://192.168.45.191/api';
  break;
case 'test':
  BASEURL = 'http://192.168.100.142/scfApi/';
  break;
case 'prod':
  BASEURL = 'https://pre.49capital.cn/scf/api/';
  break;
default:
  break;
}
const request = axios.create({
  timeout: 20000,
  headers: {
    token: window.localStorage.getItem('token'),
    'Content-Type': 'application/json',
    secretId: 1,
  },
  // baseURL: process.env.NODE_ENV === 'development' ? '' : 'http://192.168.100.142/scfApi/',
  baseURL: BASEURL,
});

request.interceptors.request.use((config) => {
  cancelPending(config);
  if ((config.method === 'post') && (config.data.requestType === 'upload')) {
    return config;
  }
  if (config.data) {
    for (let k in config.data) {
      let res = getmoney(k, filterArr); // 是否有日期格式
      let res2 = getmoney(k, moneyArr);
      if (typeof (config.data[k]) === 'string' && res.status === false) { // 排除日期格式
        config.data[k] = `${config.data[k]}`.replace(/\s+/g, '');
        if(res2.status===true){ // 如果是金额字段 去掉千位符
          config.data[k] = `${config.data[k]}`.replace(/,/gi, '');
        }
      }
    }
    console.log('config.data', config.data);
    config.data = encrypt(encodeURIComponent(JSON.stringify(config.data)));
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use((res) => {
  // console.log('res.data.data', res.data.data);
  if (res.data.data && res.data.data.indexOf('http') === -1) {
    try {
      res.data.data = JSON.parse(decodeURIComponent(decrypt(res.data.data)));
    } catch (err) {
      res.data.data = decodeURIComponent(decrypt(res.data.data));
    }
  }
  if (res.data.code === '900001') {
    message.error('请重新登录');
    window.g_app._store.dispatch(
      routerRedux.replace('/login')
    );
    return Promise.reject(res);
  }
  if (/000000$/.test(res.data.code)) {
    let data = {};
    // 列表时间格式化
    res.data.data = timeFormat(res.data.data);
    if (res.data && res.data.pageSize) {
      data.list = res.data.data || [];

      data.pagination = {
        current: res.data.current - 0,
        pageSize: res.data.pageSize - 0,
        total: res.data.total - 0,
      };
    } else {
      data = res.data;
    }
    console.log('data', data);
    return Promise.resolve(data, res);
  }
  if (/[9]/.test(res.data.code)) {
    message.error(res.data.message);
    setTimeout(() => {
      Modal.destroyAll();
    }, 1000);
    return Promise.reject(res.data);
  }
  return res.data;
  // return Promise.reject(res.data);
}, (error, data) => {
  message.error('服务器出错，请稍后再试！');
  return Promise.reject(error);
});

export default request;
