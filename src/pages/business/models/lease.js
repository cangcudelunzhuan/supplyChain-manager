import {
  getList,
  getDetail,
  getRelaInfo,
  putApply,
  putUpdate,
  putBusiAudit,
  putRiskAudit,
  putRentConfirm,
  putBankConfirm,
  putUseMoneyConfirm,
  getAccountInfo,
  putCollectTicket,
  putReapply,
} from '../service/lease';

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
    *getRelaInfo({ payload }, { call, put }) {
      const response = yield call(getRelaInfo, payload);
      return response;
    },
    *putApply({ payload }, { call, put }) {
      const response = yield call(putApply, payload);
      return response;
    },
    *putUpdate({ payload }, { call, put }) {
      const response = yield call(putUpdate, payload);
      return response;
    },
    *putBusiAudit({ payload }, { call, put }) {
      const response = yield call(putBusiAudit, payload);
      return response;
    },
    *putRiskAudit({ payload }, { call, put }) {
      const response = yield call(putRiskAudit, payload);
      return response;
    },
    *putRentConfirm({ payload }, { call, put }) {
      const response = yield call(putRentConfirm, payload);
      return response;
    },
    *putBankConfirm({ payload }, { call, put }) {
      const response = yield call(putBankConfirm, payload);
      return response;
    },
    *putUseMoneyConfirm({ payload }, { call, put }) {
      const response = yield call(putUseMoneyConfirm, payload);
      return response;
    },
    *putCollectTicket({ payload }, { call, put }) {
      const response = yield call(putCollectTicket, payload);
      return response;
    },
    *getAccountInfo({ payload }, { call, put }) {
      const response = yield call(getAccountInfo, payload);
      return response;
    },
    *putReapply({ payload }, { call, put }) {
      const response = yield call(putReapply, payload);
      return response;
    },
  },
};
