/* global window */
import modelExtend from 'dva-model-extend';
import queryString from 'query-string';
import * as applicationsService from 'services/generalData';
import { pageModel } from '../common';

const { query } = applicationsService;


/**
 * 根据namespace动态加载模块
 * @modelExtend
 * */
export default modelExtend(pageModel, {
  namespace: 'application',
  state: {

  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/application') {
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
    /**
     * 参数 payload = payload || {}
     * @payload = {}
     * */
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



  },
})
