import {
  getList,
  getDetail,
} from '../service/redeem';

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
  },
  reducers: {
    setFormdata(state, { payload }){
      return { ...state, ...payload };
    },
  },
};
