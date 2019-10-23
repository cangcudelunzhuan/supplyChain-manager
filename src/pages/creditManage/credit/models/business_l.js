import { getBusiList, getBusiDetail, postAdd, putCheck, putUpdate, getLicense, getFunding } from '../service/business_l';
export default {
  state: {},
  effects: {
    *getBusiList({ payload }, { call, put }) {
      const response = yield call(getBusiList, payload);
      return response;
    },
    *getBusiDetail({ payload }, { call, put }) {
      const response = yield call(getBusiDetail, payload);
      return response;
    },
    *putCheck({ payload }, { call, put }) {
      const response = yield call(putCheck, payload);
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
    *getLicense({ payload }, { call, put }) {
      const response = yield call(getLicense, payload);
      return response;
    },
    *getFunding({ payload }, { call, put }) {
      const response = yield call(getFunding, payload);
      return response;
    },
  },
};