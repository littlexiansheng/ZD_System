/**
 * Created by Administrator on 2018/6/26 0026.
 * 最终报价
 */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './offer.less';

const ExpressInformation = () => {
  return (
    <div>
      <div className={styles.header}>
        <img src="/ghef_03.png"/>
        <span style={{marginLeft:'5px',fontSize:'15px',fontweight:'bold'}}>最终报价</span>
      </div>
      <div>
        <div className="useInfoRow">
          <p>商业险金额：</p> <p>2566.00</p><p>交强险金额：</p><p>1260.00</p>
        </div>
        <div className="useInfoRow">
          <p>车船税：</p> <p>300.00</p><p>开单保费：</p><p>5211.00</p>
        </div>
        <div className="useInfoRow">
          <p>优惠额度：</p> <p>300.00</p><p>实收金额：</p><p>5000.00</p>
        </div>
        <div className="useInfoRow">
        </div>
      </div>
    </div>
  )
};

export default ExpressInformation
