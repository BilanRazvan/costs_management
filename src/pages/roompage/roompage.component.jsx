import React from 'react';

import './roompage.styles.scss';
import { connect } from 'react-redux';

import {selectCurrentRoom} from '../../redux/room/room.selectors'
import {selectAllUsers} from '../../redux/user/user.selectors';
import {selectCurrentMembers} from '../../redux/members/members.selectors';

import {createStructuredSelector} from 'reselect';

import Glisant from '../../components/glisant/glisant.component';
import Glisant2 from '../../components/glisant2/glisant2.component';


class RoomPage extends React.Component{

    render(){
        const {currentRoom, allUsers} = this.props
        return (
            <div className ='roompage'>
            <div className= 'title'>{currentRoom.name}</div>
            <div className = 'components'>
                <Glisant2 name= "PAYMENTS" ></Glisant2>
                <Glisant name= "MEMBERS" users={allUsers} ></Glisant>
            </div>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector ({
    currentRoom: selectCurrentRoom,
    allUsers: selectAllUsers,
    currentMembers: selectCurrentMembers
  });

export default connect(mapStateToProps)(RoomPage);