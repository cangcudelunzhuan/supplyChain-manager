import { routerRedux } from 'dva/router';
import { getBaseInfo, getMenus, upload, getAuthority, getAuditLog, logList, changePassword } from '../service/index';
import { getFirstMenuPath, getPathName } from 'src/utils/tools';
import getlocalMenu from 'src/utils/menu';
import request from 'src/utils/axios';

export default {
  namespace: 'global',
  state: {
    userInfo: {},
    qiniu: {},
    menus: [], // 菜单数据
    mainMenu: {
      children: [],
    }, // 主菜单
    currentMenuPath: '', // 当前菜单路径
    recordData: {},
    sessionPath: [],
  },
  effects: {
    * setLoginState({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload,
      });
    },
    // 公用上传
    * toUpload({ payload }, { call, put }) {
      const response = yield call(upload, payload);
      return response;
    },
    // 公共审核日志接口
    * getLogList({ payload }, { call, put }) {
      const response = yield call(logList, payload);
      return response;
    },
    // 获取基本信息
    * getBaseInfo({ payload }, { call, put }) {
      const response = yield call(getBaseInfo, payload);
      if (!response.success && response.login === false) {
        yield put(routerRedux.replace('/login'));
      } else {
        yield put({
          type: 'setLoginState',
          payload: response.data,
        });
      }
    },
    // 登出
    * logout({ payload }, { call, put }) {
      window.localStorage.removeItem('token');
      request.defaults.headers.token = '';
      yield put(routerRedux.replace('/login'));
    },
    // 获取系统菜单
    * getMenus({ payload }, { select, call, put }) {
      // const menus = yield call(getMenus, payload);
      const menus = yield call(getlocalMenu.list);
      const { currentMenuPath } = yield select((state) => state.global);
      let mainMenu = {
        children: [],
      };
      const jsonDt = menus.data instanceof Array ? menus.data : JSON.parse(menus.data);
      if (jsonDt) {
        if (currentMenuPath === '/' || currentMenuPath === '/404') {
          mainMenu = jsonDt[0];
        } else {
          const firstPath = currentMenuPath.split('/')[1];
          mainMenu = jsonDt.find((item) => item.path === `/${firstPath}`);
        }
        yield put({
          type: 'updateState',
          payload: {
            menus: jsonDt,
            mainMenu,
          },
        });
        if (mainMenu.children && (currentMenuPath === '/' || currentMenuPath === '/404')) {
          yield put(routerRedux.push(getFirstMenuPath(mainMenu)));
        }
        // else{
        //   yield put(routerRedux.push(mainMenu.path));
        // }
      }
    },
    // 设置当前菜单
    * setCurrentMenuPath({ payload }, { select, call, put }) {
      let str = payload.currentMenuPath.replace(/\s+/g, '');
      // start 存储浏览记录
      // let menus =yield call(getlocalMenu.list);
      // const jsonDt= menus.data instanceof Array?menus.data:JSON.parse( menus.data);
      // let pathname = getPathName(jsonDt, str);
      // let session = JSON.parse(localStorage.getItem('sessionPath'))||[];
      // let spath = [{ name: pathname.join('-'), path: str }, ...session];
      // let obj = {};
      // spath = spath.reduce((item, next)=> {
      //   obj[next.path] ? '' : obj[next.path] = true && item.push(next);
      //   return item;
      // }, []);
      // let sessionPath =  Array.from(new Set(
      //   spath.splice(0, 5)
      // ));
      // localStorage.setItem('sessionPath', JSON.stringify(sessionPath));
      // end 存储浏览记录
      let reg = /\/[0-9]/;
      let add = /\/add/;
      // 新增或详情页保证菜单不被关闭
      if (reg.test(str)) {
        // let id = str.replace(/[^0-9]/ig, '');
        let id = str.match(/\d+(\.\d+)?/)[0];
        let index = str.indexOf(id);
        payload.currentMenuPath = payload.currentMenuPath.substr(0, index - 1);
      } else if (add.test(str)) {
        payload.currentMenuPath = payload.currentMenuPath.replace('/add', '');
      }
      yield put({
        type: 'updateState',
        payload: {
          currentMenuPath: payload.currentMenuPath,
          // sessionPath: sessionPath,
        },
      });
    },
    // 切换菜单
    * switchMenu({ payload }, { select, call, put }) {
      const mainMenu = yield select((state) => state.global.mainMenu);
      const { menu } = payload;
      if (menu.path !== mainMenu.path) {
        // 设置主菜单
        yield put({
          type: 'updateState',
          payload: {
            mainMenu: menu,
          },
        });
        const path = getFirstMenuPath(menu);
        // 设置当前菜单
        yield put({
          type: 'updateState',
          payload: {
            currentMenuPath: path,
          },
        });
        // 跳转当前首个页面
        yield put(routerRedux.push(path));
      }
    },
    // 登录成功获取权限数据
    * getAuthority({ payload }, { call }) {
      const response = yield call(getAuthority, payload);
      if (response.code === '000000') {
        window.localStorage.setItem('AuthList', JSON.stringify(response.data));
      }
    },
    // 获取公共日志接口
    * getAuditLog({ payload }, { call }) {
      const response = yield call(getAuditLog, payload);
      return response;
    },
    // 修改密码
    * changePassword({ payload }, { call }) {
      const response = yield call(changePassword, payload);
      return response;
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        dispatch({
          type: 'setCurrentMenuPath',
          payload: {
            currentMenuPath: pathname,
          },
        });
      });
    },
  },
};
