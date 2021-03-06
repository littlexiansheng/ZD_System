/**
 * Created by Administrator on 2018/6/25 0025.
 * 车险选项
 */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './offer.less';
import { Divider } from 'antd';

const CarInsurance = () => {
  return (
   <div>
      <div className={styles.header}>
        <img src="/ghef_03.png"/>
        <span style={{marginLeft:'5px',fontSize:'15px',fontweight:'bold'}}>车险选项</span>
      </div>
      <div>
        <div className="useInfoRow">
          <p>投保公司：</p> <p>太保</p><p>区域：</p><p>苏州 平安1</p>
        </div>
          <Divider dashed style={{backgroundColor:'#E2E4E8',marginBottom:'15px',marginTop:'15px'}}/>
        <div className="useInfoRow">
          商业险
        </div>
        <div style={{backgroundColor:'#F5FBFF'}}>
          <div className="useInfoRow">
            <p>商业险折扣：</p> <p>0.54</p><p>风险保费：</p><p>12211.00</p>
          </div>
          <div className="useInfoRow">
            <p>车辆损失险：</p> <p>4.81万573.00</p><p>第三者责任险：</p><p>4.81万573.00</p>
          </div>
          <div className="useInfoRow">
            <p>不计免赔险：</p> <p>1.96.00 车损/三责</p><p> </p><p> </p>
          </div>
        </div>
        <div className="useInfoRow">
          <li>交强险</li>
        </div>
        <div style={{backgroundColor:'#F5FBFF'}}>
          <div className="useInfoRow">
            <p>车船税：</p> <p>4.81万573.00</p><p>交强险：</p><p>4.81万573.00</p>
          </div>
        </div>
      </div>
     </div>
  )
}

export default CarInsurance
