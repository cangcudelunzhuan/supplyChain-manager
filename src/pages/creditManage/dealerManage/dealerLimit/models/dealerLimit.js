import { getDealerLimitDetail, getDealerLimitList, getLicense, getDealerDetail, putOrder } from '../service/dealerLimit';

export default {
  state: {},
  effects: {
    * getDealerLimitList({ payload }, { call, put }) {
      const response = yield call(getDealerLimitList, payload);
      return response;
    },
    * getDealerLimitDetail({ payload }, { call, put }) {
      const response = yield call(getDealerLimitDetail, payload);
      return response;
    },
    * getDealerDetail({ payload }, { call, put }) {
      const response = yield call(getDealerDetail, payload);
      return response;
    },
    *getLicense({ payload }, { call, put }) {
      const response = yield call(getLicense, payload);
      return response;
    },
    *putOrder({ payload }, { call, put }) {
      const response = yield call(putOrder, payload);
      return response;
    },
  },
};
