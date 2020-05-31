import React from 'react';
import './header.styles.scss';
import {Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import { ReactComponent as Logo} from '../../assets/house.svg';
import {setCurrentUser} from '../../redux/user/user.actions';
import {setCurrentRoom} from '../../redux/room/room.actions';
import {resetCurrentRooms} from '../../redux/rooms/rooms.actions';
import {deleteOneRoom} from '../../redux/rooms/rooms.actions';
import {setHiddenDelete} from '../../redux/room/room.actions';
import {setBillAmount, resetBillMembers} from '../../redux/bill/bill.actions';
import {setCurrentPayments} from '../../redux/payment/payment.actions';


import {selectCurrentUser} from '../../redux/user/user.selectors';
import {selectCurrentRoom} from '../../redux/room/room.selectors';
import {selectHiddenDelete} from '../../redux/room/room.selectors';

import {withRouter} from 'react-router-dom';

import Axios from 'axios';
 
class Header extends React.Component {

  handleClick = async event =>{
    event.preventDefault();
    const {currentUser, currentRoom, history, deleteOneRoom}=this.props
    Axios({
      url:'http://localhost:8080/room/delete',
      method: 'DELETE',
      data:({
          user: {
              id: currentUser.id
          },
          room: {
              id: currentRoom.id
          }
      }),
      headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
  }).then(response => {
    history.push('/')
    deleteOneRoom(currentRoom)
  })

  }

  handleClick2 = event =>{
    const {history} = this.props
    history.push('/room')
  }

  render(){
    const {currentUser, setCurrentUser, resetCurrentRooms, setCurrentRoom, currentRoom, setHiddenDelete, hidden,resetBillMembers,setBillAmount,setCurrentPayments}=this.props
    return (
        <div className = 'header'>
        {currentUser ? (
        <Link className = 'logo-container' to="/">
          <Logo className = 'logo'/>
        </Link> 
        ) : (
          <Link className = 'logo-container' to="/signin">
            <Logo className = 'logo'/>
        </Link>
        )}
        <div className= 'options'>
        {
          currentRoom && currentUser.id===currentRoom.creator.id && hidden===false ? (
            <div className = 'delete-room' onClick={(this.handleClick)} >
            DELETE ROOM
            </div>
            ) : null
        }
        {
          currentRoom && hidden===true ? (
            <div className = 'back-to-room' onClick={(this.handleClick2)} >
            BACK TO THE ROOM
            </div>
            ) : null
        }
          {currentUser ? (
                <Link className='option' to = '/signin' onClick ={()=>{
                  setCurrentUser(null)
                  resetCurrentRooms(null)
                  setCurrentRoom(null)
                  setHiddenDelete(true)
                  setBillAmount(0)
                  resetBillMembers([])
                  setCurrentPayments([])
                }
              }>
                  SIGN OUT
                </Link>
              ) : (
                <Link className='option' to='/signin'>
                  SIGN IN
                </Link>
          )}
        
        </div>
    </div>
    )
  }
    
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    currentRoom: selectCurrentRoom,
    hidden: selectHiddenDelete
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  resetCurrentRooms:rooms => dispatch(resetCurrentRooms(rooms)),
  setCurrentRoom: room => dispatch(setCurrentRoom(room)),
  deleteOneRoom: room => dispatch(deleteOneRoom(room)),
  setHiddenDelete: hidden => dispatch(setHiddenDelete(hidden)),
  setBillAmount: amount =>dispatch(setBillAmount(amount)),
  resetBillMembers: members =>dispatch(resetBillMembers(members)),
  setCurrentPayments: payment => dispatch(setCurrentPayments(payment))
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Header));