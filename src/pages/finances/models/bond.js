import { getList, detail, orderinfo, financinginfo, Examine } from '../service/bond';

export default {
  state: {},
  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(getList, payload);
      return response;
    },
    *getdetail({ payload }, { call, put }) {
      const response = yield call(detail, payload);
      return response;
    },
    *orderInfo({ payload }, { call, put }) {
      const response = yield call(orderinfo, payload);
      return response;
    },
    *financingInfo({ payload }, { call, put }) {
      const response = yield call(financinginfo, payload);
      return response;
    },
    *toExamine({ payload }, { call, put }) {
      const response = yield call(Examine, payload);
      return response;
    },
  },
};