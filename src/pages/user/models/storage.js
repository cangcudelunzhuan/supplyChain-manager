import {
  getList, add, edit, cancel,
  detail, agencyDetail,
  toexamine,
} from '../service/storage';
import { getFileList } from 'src/utils/tools';

export default {
  state: {},
  namespace: 'storage',
  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(getList, payload);
      return response;
    },
    *toAdd({ payload }, { call, put }) {
      const response = yield call(add, payload);
      return response;
    },
    *toEdit({ payload }, { call, put }) {
      const response = yield call(edit, payload);
      return response;
    },
    *toCancel({ payload }, { call, put }) {
      const response = yield call(cancel, payload);
      return response;
    },
    *getDetail({ payload }, { call, put }) {
      const response = yield call(detail, payload);
      response.data.fileParamList = getFileList(response.data.fileVoList);
      response.data.creditAmountFileList = getFileList(response.data.creditAmountFileList);
      response.data.escrowAccountFileList = getFileList(response.data.escrowAccountFileList);
      response.data.personFileList = getFileList(response.data.personFileList);
      response.data.accountFileList = getFileList(response.data.accountFileList);
      response.data.repurchaseAccountFileList = getFileList(response.data.repurchaseAccountFileList);
      return response;
    },
    *getAgencyDetail({ payload }, { call, put }) {
      const response = yield call(agencyDetail, payload);
      return response;
    },
    *toExamine({ payload }, { call, put }) {
      const response = yield call(toexamine, payload);
      return response;
    },
  },
};