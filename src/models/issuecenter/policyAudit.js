/* global window */
import modelExtend from 'dva-model-extend';
import queryString from 'query-string';
import * as applicationsService from 'services/generalData';
import { pageModel } from '../common';

const { query } = applicationsService;

export default modelExtend(pageModel, {
  namespace: 'policyAudit',

  state: {
    currentItem:'',
    InsuranceSlipModalVisible:false,
    EntryInfoModalVisible:false,
    ViewPolicyModalVisible:false
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/policyAudit') {
          const payload = queryString.parse(location.search) || { page: 1, pageSize: 10 };
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },

  effects: {
    * query ({ payload = {} }, { call, put }) {
      const data = yield call(query, payload);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      }
    },
  },

  reducers: {

    showModal (state, { payload }) {
      if(payload.auditStatus==='待审核'){
        return { ...state,  InsuranceSlipModalVisible: true ,currentItem:payload }
      }else if(payload.auditStatus==='审核'){
        return { ...state,  EntryInfoModalVisible: true  }
      }else if (payload.auditStatus==='审核通过'||payload.auditStatus==='审核失效'){
        return { ...state,  ViewPolicyModalVisible: true ,currentItem:payload }
      }
    },

    hideModal (state,{payload}) {
      if(payload.modalType==="audit"){
        return { ...state, EntryInfoModalVisible:false }
      }else if(payload.modalType==="policy"){
        return { ...state, InsuranceSlipModalVisible:false }
      }else if (payload.modalType==="view"){
        return { ...state, ViewPolicyModalVisible:false }
      }
    },

  }
})
