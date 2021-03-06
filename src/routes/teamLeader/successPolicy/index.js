/**
 * 成功提交保单页
 * Created by Administrator on 2018/6/25 0025.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {routerRedux} from 'dva/router';
import {connect} from 'dva';
import {Page} from 'components';
import queryString from 'query-string';
import List from './List';
import Filter from './Filter';
import Offermodal from './Modal';   // 报价详情
import styles from './List.less';
import SendModal from './sendModal';
import ChangeSalesman from './changeSalesman';

const SuccessPolicy = ({
  location, dispatch, successPolicy, loading
}) => {
  location.query = queryString.parse(location.search);
  const {query, pathname} = location;
  const {list, TimeData, pagination, modalVisible, visibleRemark, remarkId, isMotion, sendModalVisible, changeSalesVisible
  } = successPolicy;

  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))
  };

  const modalProps = {
    item: {},
    visible: modalVisible,
    remarkId: remarkId,
    maskClosable: false,
    title: '报价详情',
    width: '90%',
    visibleRemark: visibleRemark,
    wrapClassName: 'vertical-center-modal',
    closable: false,
    onCancel () {
      dispatch({
        type: 'successPolicy/hideModal',
        payload: {
          modalType: 'quotation',
        },
      })
    },
    addRemarkFunc(id){
      dispatch({
        type: 'successPolicy/showModal',
        payload: {
          modalType: 'addRemark',
          id: id ? id : '',
        },
      })
    },
    RemarkCancel(){
      dispatch({
        type: 'successPolicy/hideModal',
        payload: {
          modalType: 'addRemark',
        },
      })
    },
    saveRemarkFunc(data){
      dispatch({
        type: 'successPolicy/hideModal',
        payload: {
          modalType: 'addRemark',
          data: data,
        },
      })
    }
  };

  const sendModalProps = {
    TimeData,
    visible: sendModalVisible,
    maskClosable: false,
    title: '派送记录',
    width: '40%',
    closable: false,
    wrapClassName: 'vertical-center-modal',
    onCancel () {
      dispatch({
        type: 'successPolicy/hideModal',
        payload: {
          modalType: 'sendation',
        },
      })
    }
  };

  const listProps = {
    dataSource: list,
    loading: loading.effects['successPolicy/query'],
    pagination,
    location,
    isMotion,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    changeSalesman (item) {
      console.log(item)
      dispatch({
        type: 'successPolicy/showModal',
        payload: {
          modalType: 'changeSalesman',
          currentItem: item,
        },
      })
    },
    seeQuotation (item) {
      dispatch({
        type: 'successPolicy/showModal',
        payload: {
          modalType: 'quotation',
          currentItem: item,
        },
      })
    },
    seeSendation(item) {
      dispatch({
        type: 'successPolicy/showModal',
        payload: {
          modalType: 'sendation',
          currentItem: item,
        },
      })
    }
  };

  const filterProps = {
    isMotion,
    filter: {
      ...query,
    },
    onFilterChange (value) {
      handleRefresh({
        ...value,
        page: 1,
      })
    }
  };

  const changeSalesProps = {
    visible: changeSalesVisible,
    maskClosable: false,
    title: '修改所属',
    width: '30%',
    onOk(data){
      console.log(data)
      dispatch({
        type: 'successPolicy/hideModal',
        payload: {
          modalType: 'changeSalesman',
          datga: data,
        },
      })
    },
    onCancel(){
      dispatch({
        type: 'successPolicy/hideModal',
        payload: {
          modalType: 'changeSalesman',
        },
      })
    }
  };

  return (
    <Page inner>
      <Filter {...filterProps} />
      <div className={styles.totalPrice}>
        保险费用合计：<span>3628.50</span>万元
      </div>
      <List {...listProps} />
      {modalVisible && <Offermodal {...modalProps} />}
      {sendModalVisible && <SendModal {...sendModalProps} />}
      {changeSalesVisible && <ChangeSalesman {...changeSalesProps} />}
    </Page>
  )
};

SuccessPolicy.propTypes = {
  successPolicy: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({successPolicy, loading}) => ({successPolicy, loading}))(SuccessPolicy)
