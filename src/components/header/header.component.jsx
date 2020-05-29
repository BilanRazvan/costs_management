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


import {selectCurrentUser} from '../../redux/user/user.selectors';
import {selectCurrentRoom} from '../../redux/room/room.selectors';
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

  render(){
    const {currentUser, setCurrentUser, resetCurrentRooms, setCurrentRoom, currentRoom}=this.props
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
          currentRoom && currentUser.id===currentRoom.creator.id ? (
            <div className = 'delete-room' onClick={(this.handleClick)} >
            DELETE ROOM
            </div>
            ) : null
        }
          {currentUser ? (
                <Link className='option' to = '/signin' onClick ={()=>{
                  setCurrentUser(null)
                  resetCurrentRooms(null)
                  setCurrentRoom(null)
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
    currentRoom: selectCurrentRoom
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  resetCurrentRooms:rooms => dispatch(resetCurrentRooms(rooms)),
  setCurrentRoom: room => dispatch(setCurrentRoom(room)),
  deleteOneRoom: room => dispatch(deleteOneRoom(room))
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Header));