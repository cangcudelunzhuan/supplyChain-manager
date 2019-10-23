import { getList, getDetailTable, getDetail, putApplyRepay, putAuditRepay, getFinancing } from '../service/repay';

export default {
  state: {
    formData: { },
  },
  effects: {
    *getList({ payload }, { call, put }) {
      const response = yield call(getList, payload);
      return response;
    },
    *getDetail({ payload }, { call, put }) {
      const response = yield call(getDetail, payload);
      // if(response){
      //   yield put({
      //     type: 'setFormdata',
      //     payload: { formData: response.data },
      //   });
      // }
      return response.data;
    },
    *getFinancing({ payload }, { call, put }) {
      const response = yield call(getFinancing, payload);
      return response;
    },
    *getDetailTable({ payload }, { call, put }) {
      const response = yield call(getDetailTable, payload);
      if(response.data.length>0){
        response.data= response.data.map((item, index)=>{
          return { ...item, 'id': index, index: index+1 };
        });
      }
      return response;
    },
    *putApplyRepay({ payload }, { call, put }) {
      const response = yield call(putApplyRepay, payload);
      return response;
    },
    *putAuditRepay({ payload }, { call, put }) {
      const response = yield call(putAuditRepay, payload);
      return response;
    },
  },
  reducers: {
    setFormdata(state, { payload }){
      return { ...state, ...payload };
    },
  },
};
