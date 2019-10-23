import {
  getIndustrialParkList, getPolicyList, getIndustrialParkDetail, getPolicyDetail,
  addIndustrialPark, addPolicy, updateIndustrialPark, updatePolicy, auditIndustrialPark, auditPolicy,
  getIndustrialParkDetailByNo, getIndustrialParkFiles, getIndustrialParkPolicyFiles,
} from '../service/industrialPark';
import { getFileList } from 'src/utils/tools';

export default {
  state: {},
  namespace: 'industrialPark',
  effects: {
    * industrialParkList({ payload }, { call, put }) {
      const response = yield call(getIndustrialParkList, payload);
      return response;
    },

    * policyList({ payload }, { call, put }) {
      const response = yield call(getPolicyList, payload);
      return response;
    },

    * addIndustrialPark({ payload }, { call, put }) {
      const response = yield call(addIndustrialPark, payload);
      return response;
    },

    * addPolicy({ payload }, { call, put }) {
      const response = yield call(addPolicy, payload);
      return response;
    },

    * updateIndustrialPark({ payload }, { call, put }) {
      const response = yield call(updateIndustrialPark, payload);
      return response;
    },

    * updatePolicy({ payload }, { call, put }) {
      const response = yield call(updatePolicy, payload);
      return response;
    },

    * auditIndustrialPark({ payload }, { call, put }) {
      const response = yield call(auditIndustrialPark, payload);
      return response;
    },

    * auditPolicy({ payload }, { call, put }) {
      const response = yield call(auditPolicy, payload);
      return response;
    },

    * getIndustrialParkDetail({ payload }, { call, put }) {
      const response = yield call(getIndustrialParkDetail, payload);
      // response.data.fileParamList = getFileList(response.data.fileVoList);
      return response;
    },

    * getIndustrialParkDetailByNo({ payload }, { call, put }) {
      const response = yield call(getIndustrialParkDetailByNo, payload);
      return response;
    },

    * getPolicyDetail({ payload }, { call, put }) {
      const response = yield call(getPolicyDetail, payload);
      // response.data.fileParamList = getFileList(response.data.fileVoList);
      return response;
    },

    * getIndustrialParkFiles({ payload }, { call, put }) {
      const response = yield call(getIndustrialParkFiles, payload);
      // response.data.fileParamList = getFileList(response.data);
      return response;
    },

    * getIndustrialParkPolicyFiles({ payload }, { call, put }) {
      const response = yield call(getIndustrialParkPolicyFiles, payload);
      // response.data.fileParamList = getFileList(response.data);
      return response;
    },

  },
};
