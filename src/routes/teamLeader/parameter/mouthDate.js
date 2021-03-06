/**
 * Created by Administrator on 2018/7/5 0005.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form } from 'antd';
import { DropOption } from 'components';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import styles from './List.less';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span:5,
  },
  wrapperCol: {
    span: 18,
  },
  style:{
    marginBottom: 0,
    borderRadius:'15px',
  }
};

const Mouth = ({...mouthProps, mouthDate, currentItem, choseDesId,
  form:{
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  }
}) => {
  return (
    <div className={classnames(styles.MouthDate)}>
    <Row>
      <FormItem {...formItemLayout}>
      {getFieldDecorator('mouth',{})(
        <div className="templateItem">
          <span style={{color:'#8f9090'}}>请选择月份：</span>
      {
        mouthDate.map((item,i)=>{
          return(
              <span className={currentItem.id===item.id?'active':''}  key={i} onClick={()=>choseDesId(item)} >{`${item.date}`}</span>
          )
        })
      }
        </div>
        )}
        </FormItem>
    </Row>
  </div>
  )
}

Mouth.propTypes = {
  location: PropTypes.object,
}

export default Form.create()(Mouth)
