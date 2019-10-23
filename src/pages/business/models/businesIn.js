import { getList, getSocId, getBrandId, postAdd, getDetail, putUpdate, putCheck, putOrder } from '../service/businesIn';

export default {
  state: {},
  effects: {
    *getList({ payload }, { call, put }) {
      const response = yield call(getList, payload);
      return response;
    },
    *getSocId({ payload }, { call, put }) {
      const response = yield call(getSocId, payload);
      return response;
    },
    *getBrandId({ payload }, { call, put }) {
      const response = yield call(getBrandId, payload);
      return response;
    },
    *postAdd({ payload }, { call, put }) {
      const response = yield call(postAdd, payload);
      return response;
    },
    *getDetail({ payload }, { call, put }) {
      const response = yield call(getDetail, payload);
      return response;
    },
    *putUpdate({ payload }, { call, put }) {
      const response = yield call(putUpdate, payload);
      return response;
    },
    *putCheck({ payload }, { call, put }) {
      const response = yield call(putCheck, payload);
      return response;
    },
    *putOrder({ payload }, { call, put }) {
      const response = yield call(putOrder, payload);
      return response;
    },

  },
};