/**
 * 名单申请
 */
import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Filter from './Filter';
import { Page } from 'components';
import List from './List';

const Application = ({
     location, dispatch, application, loading,
 }) => {
  location.query = queryString.parse(location.search);
  const { query, pathname } = location;
  const { list, pagination } = application;
  // 重置
  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))
  };

  //查询
  const filterProps = {
    filter: {
      ...query,
    },
    FilterSearch (value) {
      handleRefresh({
        ...value,
        page: 1,
      })
    },
  };


  const listProps = {
    dataSource: list,
    pagination,
    loading: loading.effects['application/query'],
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
  };

  return (
    <Page inner>
      <Filter {...filterProps}/>
      <List {...listProps}/>
    </Page>
  )
}

Application.propTypes = {
  application: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ application, loading }) => ({ application, loading }))(Application)
