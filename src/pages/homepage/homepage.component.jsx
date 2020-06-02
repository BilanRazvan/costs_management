import React from 'react';

import './homepage.styles.scss';

import RoomHall from '../../components/rooms-hall/rooms-hall.component';
import { connect } from 'react-redux';

import {withRouter} from 'react-router-dom';

import {setCurrentRoom} from '../../redux/room/room.actions';
import {setCurrentPayments} from '../../redux/payment/payment.actions';
import {setCurrentBillMembers, setBillAmount} from '../../redux/bill/bill.actions';
import {selectCurrentRooms} from '../../redux/rooms/rooms.selectors';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {createStructuredSelector} from 'reselect';

class HomePage extends React.Component {

    componentDidMount(){
        const {setCurrentRoom,setCurrentBillMembers,setBillAmount,setCurrentPayments, currentUser,history} = this.props
        if(currentUser===null){
            history.push('/signin')
        }
        setCurrentRoom(null)
        setCurrentBillMembers([])
        setBillAmount(0)
        setCurrentPayments([])
    }
    render() {
        return(
            <div className = 'homepage'>
                <RoomHall/>
            </div>
        )
    }
};

const mapDispatchToProps = dispatch => ({
    setCurrentRoom: room => dispatch(setCurrentRoom(room)),
    setCurrentBillMembers: members => dispatch(setCurrentBillMembers(members)),
    setBillAmount: amout => dispatch(setBillAmount(amout)),
    setCurrentPayments: payment => dispatch(setCurrentPayments(payment)),
});

const mapStateToProps = createStructuredSelector ({
    currentRooms: selectCurrentRooms,
    currentUser: selectCurrentUser
  });


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(HomePage));