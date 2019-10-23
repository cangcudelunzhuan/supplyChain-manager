import {
  getRoleList, postAdd, putUpdate, putDelete, detail,
  getTrees, organizations,
} from '../service/role';

export default {
  state: {},
  effects: {
    *getRoleList({ payload }, { call, put }) {
      const response = yield call(getRoleList, payload);
      return response;
    },
    *postAdd({ payload }, { call, put }) {
      const response = yield call(postAdd, payload);
      return response;
    },
    *putUpdate({ payload }, { call, put }) {
      const response = yield call(putUpdate, payload);
      return response;
    },
    *putDelete({ payload }, { call, put }) {
      const response = yield call(putDelete, payload);
      return response;
    },
    *getRoleDetail({ payload }, { call, put }) {
      const response = yield call(detail, payload);
      return response;
    },
    *getTrees({ payload }, { call, put }) {
      const response = yield call(getTrees, payload);
      return response;
    },
    *getOrganizations({ payload }, { call, put }) {
      const response = yield call(organizations, payload);
      return response;
    },
  },
};