/**
 * Created by Administrator on 2018/7/11 0002.
 * 新增话术
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import queryString from 'query-string';
import styles from './index.less';

const AddSpeechCraftList = ({...addSpeechCraftListProps, EditSpeechCraft})=>{
  return (
    <div className={classnames(styles.AddSpeechCraftList)} onClick={()=>EditSpeechCraft()}>
       <img src="../addSpeech.png" alt=""/>
    </div>
  )
};

AddSpeechCraftList.propTypes = {
  EditSpeechCraft:PropTypes.func
}
export default AddSpeechCraftList
