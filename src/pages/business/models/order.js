import {
  getList,
  add, edit,
  cancel,
  detail,
  agencyDetail,
  synthesizeInfo,
  getyearPlan,
  examine,
  planList,
  brandInfo,
  licenceorganization,
  appoint,
} from '../service/order';
import { getFileList } from 'src/utils/tools';

export default {
  state: {
    goodList: [],
  },
  namespace: 'order',
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
      if (response.data.goodsList) {
        let goodList = response.data.goodsList;
        goodList.map((item, i)=>{
          item.id = i+1;
        });
        yield put({
          type: 'updateState',
          payload: { goodList },
        });
      }
      if (response.data.fileList){
        let brandFileParams = getFileList(response.data.fileList);
        response.data.fileParamList = brandFileParams;
      }
      if (response.data.yearFileList){
        let brandFileParams = getFileList(response.data.yearFileList);
        response.data.fileVoList = brandFileParams;
      }
      return response;
    },
    *getAgencyDetail({ payload }, { call, put }) {
      const response = yield call(agencyDetail, payload);
      return response;
    },
    *getSynthesizeInfo({ payload }, { call, put }) {
      const response = yield call(synthesizeInfo, payload);
      return response;
    },
    *yearPlan({ payload }, { call, put }) {
      const response = yield call(getyearPlan, payload);
      if (response.data.fileVoList){
        let brandFileParams = getFileList(response.data.fileVoList);
        response.data.fileVoList = brandFileParams;
      }
      return response;
    },
    *toExamine({ payload }, { call, put }) {
      const response = yield call(examine, payload);
      return response;
    },
    *getPlan({ payload }, { call, put }) {
      const response = yield call(planList, payload);
      return response;
    },
    *brandInfo({ payload }, { call, put }) {
      const response = yield call(brandInfo, payload);
      return response;
    },
    *licenceorganization({ payload }, { call, put }) {
      const response = yield call(licenceorganization, payload);
      return response;
    },
    *appoint({ payload }, { call, put }) {
      const response = yield call(appoint, payload);
      return response;
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};