import { getList, upload, deletes } from '../service/productStatistics';
import format from 'src/utils/filter';
export default {
  state: {},
  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(getList, payload);
      let getarr =  (key) => {
        let arr = [];
        response.list.map((item, i) => {
          if ((arr.indexOf(item[key])===-1)&&item[key]!==null) {
            arr.push(item[key]);
          }
        });
        return arr;
      };
      let total = response.pagination.total;
      response.pagination.total = total+parseInt(total/10);
      if (response.list.length> 0){
        let companyName = [...new Set(getarr('companyName'))];
        let rookieName = [...new Set(getarr('rookieName'))];
        let warehouseGoodsPrice = 0;
        response.list.map((item, i) => {
          warehouseGoodsPrice += Number(item.warehouseGoodsPrice);
        });
        response.list.push({
          'id': '合计',
          'companyName': companyName.length,
          'rookieName': rookieName.length,
          'warehouseGoodsPrice': format.formatPoint(Number(warehouseGoodsPrice)),
        });
      }
      return response;
    },
    *toupload({ payload }, { call, put }) {
      const response = yield call(upload, payload);
      return response;
    },
    *todelete({ payload }, { call, put }) {
      const response = yield call(deletes, payload);
      return response;
    },
  },
};