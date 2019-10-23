import { getList, detail, check, add, update, getSocId, getOrgaList } from '../service/account_d';

export default {
  state: {},
  effects: {
    *getList({ payload }, { call, put }) {
      const response = yield call(getList, payload);
      return response;
    },
    *add({ payload }, { call, put }) {
      const response = yield call(add, payload);
      return response;
    },
    *update({ payload }, { call, put }) {
      const response = yield call(update, payload);
      return response;
    },
    *detail({ payload }, { call, put }) {
      const response = yield call(detail, payload);
      return response;
    },
    *check({ payload }, { call, put }) {
      const response = yield call(check, payload);
      return response;
    },
    *getSocId({ payload }, { call, put }) {
      const response = yield call(getSocId, payload);
      return response;
    },
    *getOrgaList({ payload }, { call, put }) {
      const response = yield call(getOrgaList, payload);
      return response;
    },
  },
};