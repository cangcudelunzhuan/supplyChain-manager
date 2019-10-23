import { getList, detail, putOpen } from '../service/account';

export default {
  state: {},
  effects: {
    *getList({ payload }, { call, put }) {
      const response = yield call(getList, payload);
      return response;
    },
    *detail({ payload }, { call, put }) {
      const response = yield call(detail, payload);
      return response;
    },
    *putOpen({ payload }, { call, put }) {
      const response = yield call(putOpen, payload);
      return response;
    },
  },
};