import { getList, getDetail, getOpenDetail, getTicketInfo, putReceive, putOpen, putRefund, getRDetail, getODetail, putAuditR, putAuditO, getTickets } from '../service/ticketTrade';

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
    *getOpenDetail({ payload }, { call, put }) {
      const response = yield call(getOpenDetail, payload);
      return response;
    },
    *putReceive({ payload }, { call, put }) {
      const response = yield call(putReceive, payload);
      return response;
    },
    *putOpen({ payload }, { call, put }) {
      const response = yield call(putOpen, payload);
      return response;
    },
    *putRefund({ payload }, { call, put }) {
      const response = yield call(putRefund, payload);
      return response;
    },
    *getRDetail({ payload }, { call, put }) {
      const response = yield call(getRDetail, payload);
      return response;
    },
    *getODetail({ payload }, { call, put }) {
      const response = yield call(getODetail, payload);
      return response;
    },
    *getTicketInfo({ payload }, { call, put }) {
      const response = yield call(getTicketInfo, payload);
      return response;
    },
    *putAuditR({ payload }, { call, put }) {
      const response = yield call(putAuditR, payload);
      return response;
    },
    *putAuditO({ payload }, { call, put }) {
      const response = yield call(putAuditO, payload);
      return response;
    },
    *getTickets({ payload }, { call, put }) {
      const response = yield call(getTickets, payload);
      return response;
    },
  },
};
