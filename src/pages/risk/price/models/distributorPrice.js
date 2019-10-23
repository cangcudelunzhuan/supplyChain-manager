import {
  getList,
  add, edit,
  detail,
  synthesizeInfo,
  examine,
  listValid,
  getByCondition,
  cyDetail,
} from '../service/distributorPrice';
// import { getFileList } from 'src/utils/tools';

export default {
  state: {
    goodList: [],
  },
  namespace: 'distributorPrice',
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
    *getDetail({ payload }, { call, put }) {
      const response = yield call(detail, payload);
      response.data.postFactor.premiumVoList.map((item)=>{
        item.type=`post${item.name}`;
      });
      response.data.preFactor.premiumVoList.map((item)=>{
        item.type=`pre${item.name}`;
      });
      response.data = {
        ...response.data,
        ...response.data.relativeInfoVo,
      };
      return response;
    },

    *getSynthesizeInfo({ payload }, { call, put }) {
      const response = yield call(synthesizeInfo, payload);
      return response;
    },
    *toExamine({ payload }, { call, put }) {
      const response = yield call(examine, payload);
      return response;
    },
    *getByCondition({ payload }, { call, put }) {
      const response = yield call(getByCondition, payload);
      return response;
    },
    *cyDetail({ payload }, { call, put }) {
      const response = yield call(cyDetail, payload);
      return response;
    },
    *listValid({ payload }, { call, put }) {
      const response = yield call(listValid, payload);
      response.data.map((item)=>{
        item.premiumRate = '';
        item.riskFactorId = item.id;
        item.type = payload.type === 1?`pre${item.name}`:`post${item.name}`;
        if (item.isIndustrialPark === 1) {
          item.extendInfo={
            industrialParkId: '',
            industrialParkName: '',
            receiveTicketType: [],
            sendTicketType: [],
          };
        }
      });
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