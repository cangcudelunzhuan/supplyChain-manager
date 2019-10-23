import { getList, getDetail, putOpen, putAudit, getTicketDetail, getSeeDetail } from '../service/ticketLease';

export default {
  state: {},
  effects: {
    *getList({ payload }, { call, put }) {
      const response = yield call(getList, payload);
      return response;
    },
    *getDetail({ payload }, { call, put }) {
      const response = yield call(getDetail, payload);
      return response;
    },
    *putOpen({ payload }, { call, put }) {
      const response = yield call(putOpen, payload);
      return response;
    },
    *putAudit({ payload }, { call, put }) {
      const response = yield call(putAudit, payload);
      return response;
    },
    *getTicketDetail({ payload }, { call, put }) {
      const response = yield call(getTicketDetail, payload);
      return response;
    },
    *getSeeDetail({ payload }, { call, put }) {
      const response = yield call(getSeeDetail, payload);
      return response;
    },
  },
};
