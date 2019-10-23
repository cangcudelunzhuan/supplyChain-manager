import { getList, getDetail, add, deletes, getDealer } from '../service/licensee';
import format from 'src/utils/filter';
export default {
  state: {
    formData: { },
  },
  effects: {
    *getList({ payload }, { call, put }) {
      const response = yield call(getList, payload);
      let total = response.pagination.total;
      response.pagination.total = total + parseInt(total/10);
      if (response.list.length> 0){
        // let warehouseGoodsPrice = 0;
        // response.list.map((item, i) => {
        //   warehouseGoodsPrice += Number(item.warehouseGoodsPrice);
        // });
        response.list.push({
          'index': '合计',
          id: 'sum',
          // 'warehouseGoodsPrice': format.formatPoint(Number(warehouseGoodsPrice)),
        });
      }

      return response;
    },
    *getDetail({ payload }, { call, put }) {
      const response = yield call(getDetail, payload);
      // let total = response.pagination.total;
      // response.pagination.total = total + parseInt(total/10);
      // if (response.list.length> 0){
      //   response.list.push({
      //     'index': '合计',
      //     id: 'sum',
      //   });
      // }
      return response;
    },
    *add({ payload }, { call, put }) {
      const response = yield call(add, payload);
      return response;
    },
    *deletes({ payload }, { call, put }) {
      const response = yield call(deletes, payload);
      return response;
    },
    *getDealer({ payload }, { call, put }) {
      const response = yield call(getDealer, payload);
      return response;
    },
  },
  reducers: {
    setFormdata(state, { payload }){
      return { ...state, ...payload };
    },
  },
};
