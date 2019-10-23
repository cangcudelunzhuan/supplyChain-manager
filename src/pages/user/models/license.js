import { addLicense, getList, getDetail, postUpdate, postCheck } from '../service/license';

export default {
  state: {},
  effects: {
    *addLicense({ payload }, { call, put }) {
      const response = yield call(addLicense, payload);
      return response;
    },
    *getList({ payload }, { call, put }) {
      const response = yield call(getList, payload);
      return response;
    },
    *getDetail({ payload }, { call, put }) {
      const response = yield call(getDetail, payload);
      return response;
    },
    *postUpdate({ payload }, { call, put }) {
      const response = yield call(postUpdate, payload);
      return response;
    },
    *postCheck({ payload }, { call, put }) {
      const response = yield call(postCheck, payload);
      return response;
    },
  },
};
