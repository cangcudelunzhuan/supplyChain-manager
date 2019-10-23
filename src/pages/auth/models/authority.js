import {
  getList, add, edit, cancel, detail,
  agencyDetail, organizations, getroles,
  arealist, resetPassword,
} from '../service/authority';

export default {
  state: {},
  namespace: 'authority',
  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(getList, payload);
      return response;
    },
    *toAdd({ payload }, { call, put }) {
      const response = yield call(add, payload);
      return response;
    },
    *toEdit({ payload }, { call, put }) {
      const response = yield call(edit, payload);
      return response;
    },
    *toCancel({ payload }, { call, put }) {
      const response = yield call(cancel, payload);
      return response;
    },
    *getDetail({ payload }, { call, put }) {
      const response = yield call(detail, payload);
      return response;
    },
    *getAgencyDetail({ payload }, { call, put }) {
      const response = yield call(agencyDetail, payload);
      return response;
    },
    *getOrganizations({ payload }, { call, put }) {
      const response = yield call(organizations, payload);
      return response;
    },
    *getRoles({ payload }, { call, put }) {
      const response = yield call(getroles, payload);
      return response;
    },
    *areaList({ payload }, { call, put }) {
      const response = yield call(arealist, payload);
      let data = response.data;
      let res = [];
      data.map((item, i)=>{
        let t = [];
        item.menus.map((menus, m)=>{
          t.push(menus.resourceName);
        });
        t.reverse();
        res.push({
          title: t.join('-'),
          auth: item.buttons,
        });
      });
      return res;
    },
    *resetPassword({ payload }, { call, put }) {
      const response = yield call(resetPassword, payload);
      return response;
    },
  },
};