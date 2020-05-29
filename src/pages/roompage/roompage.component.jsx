import React from 'react';

import './roompage.styles.scss';
import { connect } from 'react-redux';
import {selectCurrentRoom} from '../../redux/room/room.selectors'
import {createStructuredSelector} from 'reselect';
import Glisant from '../../components/glisant/glisant.component';


const RoomPage = ({currentRoom}) => (
    <div className ='roompage'>
        <div className= 'title'>{currentRoom.name}</div>
        <div className = 'components'>
            <Glisant name= "PAYMENTS"></Glisant>
            <Glisant name= "MEMBERS"></Glisant>
        </div>
    </div>
);

const mapStateToProps = createStructuredSelector ({
    currentRoom: selectCurrentRoom
  });

export default connect(mapStateToProps)(RoomPage);