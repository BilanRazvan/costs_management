import React from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import BillMember from '../bill-member/bill-member.component';
import { selectCurrentBillMembers} from '../../redux/bill/bill.selectors';

import './bill-item.styles.scss';

const BillItem = ({currentBillMembers}) => (
    
    <div className = 'bill-item'>
        <div className = 'bill-item-header'>
            <div className = 'header-block1'>
                <span>NAME</span>
            </div>
            <div className = 'header-block2'>
                <span>%</span>
            </div>
            <div className = 'header-block3'>
                <span>AMOUNT</span>
            </div>
            <div className = 'header-block2'>
                <span>REMOVE</span>
            </div>
        </div>
        <div className='items'>
        {
            currentBillMembers.map(billMember=>(
                <BillMember key={billMember.id} billMember={billMember}/>
            ))}
        </div>
    </div>
);

const mapStateToProps = createStructuredSelector({
    currentBillMembers: selectCurrentBillMembers
});

export default connect(mapStateToProps)(BillItem);