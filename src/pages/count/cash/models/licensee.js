import { getList, getDetail, add, deletes, getDealer } from '../service/licensee';

export default {
  state: {
    formData: { },
  },
  namespace: 'cashLicensee',
  effects: {
    *getList({ payload }, { call, put }) {
      const response = yield call(getList, payload);
      return response;
    },
    *getDetail({ payload }, { call, put }) {
      const response = yield call(getDetail, payload);
      return response;
    },
    *add({ payload }, { call, put }) {
      const response = yield call(add, payload);
      return response;
    },
    *deletes({ payload }, { call, put }) {
      const response = yield call(deletes, payload);
      return response;
    },
    *getDealer({ payload }, { call, put }) {
      const response = yield call(getDealer, payload);
      return response;
    },
  },
  reducers: {
    setFormdata(state, { payload }){
      return { ...state, ...payload };
    },
  },
};
