import { getBusiList, getBusiDetail, putApply, putAudit, putConfirm, putUpdate } from '../service/business';
import { calcuUniqNum, calcuTotal }from 'src/utils/tools';
import format from 'src/utils/filter';
export default {
  state: {},
  effects: {
    *getBusiList({ payload }, { call, put }) {
      const response = yield call(getBusiList, payload);
      // if(response.list.length>0){
      //   let tableDatas= response.list.map((item, index)=>{
      //     return { ...item, index: index+1, key: item.id };
      //   });
      //   let totalnu=response.list.map((item)=>{
      //     return Number(item.borrowAmount) ;
      //   });
      //   response.list=[...tableDatas, {
      //     index: '总计',
      //     agencyName: `${calcuUniqNum(tableDatas, 'agencyName')}个`,
      //     id: 'uniq',
      //     borrowAmount: `${format.formatPoint(calcuTotal(totalnu))}`,
      //   }];
      // }
      // let total = response.pagination.total;
      // response.pagination.total = total+parseInt(total/10);
      return response;
    },
    *getBusiDetail({ payload }, { call, put }) {
      const response = yield call(getBusiDetail, payload);
      return response;
    },
    *putAudit({ payload }, { call, put }) {
      const response = yield call(putAudit, payload);
      return response;
    },
    *putConfirm({ payload }, { call, put }) {
      const response = yield call(putConfirm, payload);
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
  },
};