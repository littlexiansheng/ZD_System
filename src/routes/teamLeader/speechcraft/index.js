/**
 * 话术管理
 * Created by Administrator on 2018/7/11 0002.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import queryString from 'query-string';
import styles from './index.less';
import $ from 'jquery';
import { connect } from 'dva';
import { Page } from 'components';
import { Icon } from 'antd';
import SpeechCraftList from './speechCraftList';
import AddSpeechCraftList from './addSpeechCraftList';
import EditSpeechCraftModal from './editSpeechCraftModal';

const SpeechCraft = ({location, dispatch, speechcraft, loading})=>{
   location.query = queryString.parse(location.search);
  const { query, pathname } = location;
  const { speechCraftData, editSpeechCraftModalVisible, currentItem } = speechcraft;

  const EditSpeechCraft = (payload)=>{
    dispatch({
      type:'speechcraft/showModal',
      payload
    })
  };

  const EditSpeechCraftModalProps = {
    visible : editSpeechCraftModalVisible,
    maskClosable: false,
    title:'话术编辑',
    width:'40%',
    closable:false,
    wrapClassName: 'vertical-center-modal',
    currentItem,
    handleCancel(){
      dispatch({
        type:'speechcraft/hideModal'
      })
    },
    handleSubmit(){

    }
  };

  const addSpeechCraftListProps = {
    EditSpeechCraft,
  };

  const speechCraftListProps = {
    EditSpeechCraft,
    //开始
    drag(item){
      let id = item.id;
      dispatch({
        type: 'speechcraft/drag',
        payload: {
          id: id,
        },
      })
    },
    allowDrop(item){
      event.preventDefault();
      let newId = item.id;
      $('.activeCraftList').remove();
      $(`#${newId}`).before('<div style=" border: 1px #0082fe dashed;background: none;" class="SpeechCraftList___2yYt9 activeCraftList"></div>');
      dispatch({
        type: 'speechcraft/allowDrop',
        payload: {
          id: newId,
        },
      })
    },
    endDrop(){
      $('.activeCraftList').remove();
      dispatch({
        type: 'speechcraft/endDrop',
      })
    }
  };

  return (
    <Page>
      <div className={classnames(styles.SpeechCraftListBox)}>
        <div className="toast">
          <Icon type="exclamation-circle-o" style={{marginRight:'10px'}} />
          提示：下列卡片可直接手动拖动调整位置
        </div>
        {
          speechCraftData.map((item,i)=>{
            return (
                <SpeechCraftList key={item.id} item={item} {...speechCraftListProps}/>
            )
          })
        }
        <AddSpeechCraftList {...addSpeechCraftListProps}/>
      </div>
      { editSpeechCraftModalVisible &&  <EditSpeechCraftModal {...EditSpeechCraftModalProps}/>}
    </Page>
  )
};

SpeechCraft.propTypes = {
  speechcraft: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};
export default connect(({ speechcraft, loading }) => ({ speechcraft, loading }))(SpeechCraft)
