import React from 'react';
import './payment-item.styles.scss';
import {connect} from 'react-redux';

import {updateStatus} from '../../redux/payment/payment.actions';
import Axios from 'axios';

class PaymentItem extends React.Component{
    handleClick = async event =>{
        event.preventDefault()
        const {updateStatus, payment} = this.props;
        updateStatus({...payment,status: true})
        Axios({
            url:'http://localhost:8080/payment/save',
            method: 'POST',
            data:({
                id: payment.id,
                bill: {
                    id:payment.bill.id,
                    name:payment.bill.name
                },
                member: {
                    id:payment.member.id,
                    name:payment.member.name
                },
                name:payment.name,
                price:payment.price,
                status:true
            }),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => console.log(response.data))

    };

    render(){
        const {payment}=this.props
        return(
        <div className='payment-item'>
            <span className='name'>{payment.name}</span>
            <span className='price'>{payment.price + '$'}</span>
            {
                payment.status===false ? 
                (
                    <div className = 'unpaid' onClick={(this.handleClick)} >
                        UNPAID
                    </div>
                ) : (
                    <div className = 'paid'>
                        PAID
                    </div>
                )
            }
        </div>
        );
    }
};

const mapDispatchToProp = dispatch => ({
    updateStatus: payment => dispatch(updateStatus(payment))
});


export default connect(null,mapDispatchToProp)(PaymentItem);