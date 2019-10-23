import {
  distributorList,
  distributorDetail,
  Examine,
  FileList,
  Edit,
  imports,
  cancel,
  CompanyList,
  addcompany,
  CancelCompany,
  editcompany,
  importscompany,
} from '../service/distributor';

export default {
  state: {
    recordData: {},
  },
  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(distributorList, payload);
      response.list.map((item)=>{
        item.status = parseInt(item.status);
      });
      return response;
    },
    *detail({ payload }, { call, put }) {
      const response = yield call(distributorDetail, payload);
      return response;
    },
    *toExamine({ payload }, { call, put }) {
      const response = yield call(Examine, payload);
      return response;
    },
    *getFileList({ payload }, { call, put }) {
      const response = yield call(FileList, payload);
      return response;
    },
    *getCompanyList({ payload }, { call, put }) {
      const response = yield call(CompanyList, payload);
      return response;
    },
    *toEdit({ payload }, { call, put }) {
      const response = yield call(Edit, payload);
      return response;
    },
    *toimport({ payload }, { call, put }) {
      const response = yield call(imports, payload);
      return response;
    },
    *toCancel({ payload }, { call, put }) {
      const response = yield call(cancel, payload);
      return response;
    },
    *addCompany({ payload }, { call, put }) {
      const response = yield call(addcompany, payload);
      return response;
    },
    *editCompany({ payload }, { call, put }) {
      const response = yield call(editcompany, payload);
      return response;
    },
    *toCancelCompany({ payload }, { call, put }) {
      const response = yield call(CancelCompany, payload);
      return response;
    },
    *importsCompany({ payload }, { call, put }) {
      const response = yield call(importscompany, payload);
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
