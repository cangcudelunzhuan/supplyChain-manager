import {
  getList,
  // upload, detail, Examine,
  // Edit, FileList, cancel,
  advanceDetail, advanceExamine,
  financeDetail, financeExamine, financeConfrim,
  tradeDetail, tradeExamine, tradeConfrim,
  redeemDetail, redeemExamine, redeemConfrim,
  repaymentDetail, repaymentExamine, repaymentConfrim,
  interestDetail, interestExamine, interestConfrim,
  feeDetail, feeExamine, feeConfrim,
  riskDetail, riskExamine,
  billDetail, billExamine,
  riskRefundDetail, riskRefundExamine,
  billRefundDetail, billRefundExamine,
  advanceRefundDetail, advanceRefundExamine,
} from '../service/payRec';
import { getFileList } from 'src/utils/tools';
export default {
  state: {},
  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(getList, payload);
      response.list.map((item) => {
        item.status = parseInt(item.status);
      });
      return response;
    },
    *AdvanceDetail({ payload }, { call, put }) {
      const response = yield call(advanceDetail, payload);
      return response;
    },
    *AdvanceExamine({ payload }, { call, put }) {
      const response = yield call(advanceExamine, payload);
      return response;
    },
    *FinanceDetail({ payload }, { call, put }) {
      const response = yield call(financeDetail, payload);
      response.data.financeVo.fileList= getFileList(response.data.financeVo.fileList);
      return response;
    },
    *FinanceExamine({ payload }, { call, put }) {
      const response = yield call(financeExamine, payload);
      return response;
    },
    *FinanceConfrim({ payload }, { call, put }) {
      const response = yield call(financeConfrim, payload);
      return response;
    },
    *TradeDetail({ payload }, { call, put }) {
      const response = yield call(tradeDetail, payload);
      response.data.financeVo.fileList= getFileList(response.data.financeVo.fileList);
      return response;
    },
    *TradeExamine({ payload }, { call, put }) {
      const response = yield call(tradeExamine, payload);
      return response;
    },
    *TradeConfrim({ payload }, { call, put }) {
      const response = yield call(tradeConfrim, payload);
      return response;
    },
    *RedeemDetail({ payload }, { call, put }) {
      const response = yield call(redeemDetail, payload);
      response.data.financeVo.fileList= getFileList(response.data.financeVo.fileList);
      return response;
    },
    *RedeemExamine({ payload }, { call, put }) {
      const response = yield call(redeemExamine, payload);
      return response;
    },
    *RedeemConfrim({ payload }, { call, put }) {
      const response = yield call(redeemConfrim, payload);
      return response;
    },
    *RepaymentDetail({ payload }, { call, put }) {
      const response = yield call(repaymentDetail, payload);
      response.data.financeVo.fileList= getFileList(response.data.financeVo.fileList);
      return response;
    },
    *RepaymentExamine({ payload }, { call, put }) {
      const response = yield call(repaymentExamine, payload);
      return response;
    },
    *RepaymentConfrim({ payload }, { call, put }) {
      const response = yield call(repaymentConfrim, payload);
      return response;
    },
    *InterestDetail({ payload }, { call, put }) {
      const response = yield call(interestDetail, payload);
      response.data.financeVo.fileList= getFileList(response.data.financeVo.fileList);
      return response;
    },
    *InterestExamine({ payload }, { call, put }) {
      const response = yield call(interestExamine, payload);
      return response;
    },
    *InterestConfrim({ payload }, { call, put }) {
      const response = yield call(interestConfrim, payload);
      return response;
    },
    *FeeDetail({ payload }, { call, put }) {
      const response = yield call(feeDetail, payload);
      response.data.financeVo.fileList= getFileList(response.data.financeVo.fileList);
      return response;
    },
    *FeeExamine({ payload }, { call, put }) {
      const response = yield call(feeExamine, payload);
      return response;
    },
    *FeeConfrim({ payload }, { call, put }) {
      const response = yield call(feeConfrim, payload);
      return response;
    },
    *riskDetail({ payload }, { call, put }) {
      const response = yield call(riskDetail, payload);
      return response;
    },
    *riskExamine({ payload }, { call, put }) {
      const response = yield call(riskExamine, payload);
      return response;
    },
    *billDetail({ payload }, { call, put }) {
      const response = yield call(billDetail, payload);
      return response;
    },
    *billExamine({ payload }, { call, put }) {
      const response = yield call(billExamine, payload);
      return response;
    },
    *riskRefundDetail({ payload }, { call, put }) {
      const response = yield call(riskRefundDetail, payload);
      return response;
    },
    *riskRefundExamine({ payload }, { call, put }) {
      const response = yield call(riskRefundExamine, payload);
      return response;
    },
    *billRefundDetail({ payload }, { call, put }) {
      const response = yield call(billRefundDetail, payload);
      return response;
    },
    *billRefundExamine({ payload }, { call, put }) {
      const response = yield call(billRefundExamine, payload);
      return response;
    },
    *advanceRefundDetail({ payload }, { call, put }) {
      const response = yield call(advanceRefundDetail, payload);
      return response;
    },
    *advanceRefundExamine({ payload }, { call, put }) {
      const response = yield call(advanceRefundExamine, payload);
      return response;
    },
  },
};
