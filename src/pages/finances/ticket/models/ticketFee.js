import {
  getList,
  getDetail,
  toSubmit,
} from '../service/ticketFee';
export default {
  state: {},
  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(getList, payload);
      return response;
    },
    *getDetail({ payload }, { call, put }) {
      const response = yield call(getDetail, payload);
      return response;
    },
    *toSubmit({ payload }, { call, put }) {
      const response = yield call(toSubmit, payload);
      return response;
    },
  },
};
