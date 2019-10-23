import {
  getList,
  getDetail,
} from '../service/fee';
export default {
  state: {},
  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(getList, payload);
      return response;
    },
    *detail({ payload }, { call, put }) {
      const response = yield call(getDetail, payload);
      return response;
    },
  },
};
