import { getList, upload, detail, Examine, Edit, FileList, cancel } from '../service/brans';
import { getFileList } from 'src/utils/tools';
export default {
  state: {},
  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(getList, payload);
      response.list.map((item)=>{
        item.status = parseInt(item.status);
      });
      return response;
    },
    *toupload({ payload }, { call, put }) {
      const response = yield call(upload, payload);
      return response;
    },
    *getdetail({ payload }, { call, put }) {
      const response = yield call(detail, payload);
      if (response.data.fileVoList) {
        let brandFileParams = getFileList(response.data.fileVoList);
        response.data.fileVoList = brandFileParams;
      }
      return response;
    },

    *toExamine({ payload }, { call, put }) {
      const response = yield call(Examine, payload);
      return response;
    },
    *toEdit({ payload }, { call, put }) {
      const response = yield call(Edit, payload);
      return response;
    },
    *getFileList({ payload }, { call, put }) {
      const response = yield call(FileList, payload);
      return response;
    },
    *toCancel({ payload }, { call, put }) {
      const response = yield call(cancel, payload);
      return response;
    },
  },
};
