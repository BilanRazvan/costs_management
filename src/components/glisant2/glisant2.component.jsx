import React from 'react';
import { connect } from 'react-redux';
import CustomButton from '../custom-button/custom-button.component';
import PaymentItem from '../payment-item/payment-item.component';
import './glisant2.styles.scss'

import {withRouter} from 'react-router-dom';

import {createStructuredSelector} from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import {selectCurrentMembers} from '../../redux/members/members.selectors';
import {selectCurrentRoom} from '../../redux/room/room.selectors';
import {selectCurrentPayments} from '../../redux/payment/payment.selectors';

import {addOneMember} from '../../redux/members/members.actions';
import {setCurrentPayments} from '../../redux/payment/payment.actions';
import Axios from 'axios';

class Glisant2 extends React.Component {

    constructor(){
        super();
        this.state={
            selectedValue: ''
        }
    }

    componentDidMount(){
        const {currentUser,currentRoom,setCurrentPayments} = this.props
        Axios({
            url:'http://localhost:8080/payment/list',
            method: 'POST',
            data:({
                creator:{
                    id:currentUser.id
                },
                room: {
                    id:currentRoom.id
                }
            }),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response=>
            setCurrentPayments(response.data)
        )
    }

    handleClick1 = event => {
        const { match, history} = this.props;
        history.push(match.url + '/bill')
    }

    render(){
        const {name, currentPayments} = this.props;
        return (
            <div className= 'all'>
                <div className='componenta'>
                    <h2>{name}</h2>
                    <div className = 'glisant'>
                    {
                        currentPayments.length===0 ? (
                            <span className = 'empty-message'>There are no {name.toLowerCase()}</span>
                        ) : (
                            currentPayments.map(payment=>(
                                payment!==null ?
                                (<PaymentItem key={payment.id} payment={payment}>
                                </PaymentItem>): null
                            ))
                        )
                    }
                    </div>
                    <CustomButton onClick={this.handleClick1}>
                    ADD {name}</CustomButton>
                </div>
         </div>
        )
    }  
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    currentMembers: selectCurrentMembers,
    currentRoom: selectCurrentRoom,
    currentPayments: selectCurrentPayments

});

const mapDispatchToProps = dispatch => ({
    addOneMember: member => dispatch(addOneMember(member)),
    setCurrentPayments : payments => dispatch(setCurrentPayments(payments))
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Glisant2));