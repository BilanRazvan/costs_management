import React from 'react';

import './rooms-hall.styles.scss';

import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';
import RoomPreview from '../room-preview/room-preview.component';

import {selectCurrentRooms} from '../../redux/rooms/rooms.selectors';

class RoomHall extends React.Component{
    render() {
        return (
        <div className = 'room-hall'>
            {
                this.props.currentRooms.map((room) => (
                    <RoomPreview key ={ room.id } room= {room}/>
                ))
            }
        </div>
        )
    }
}

const mapStateToProps = createStructuredSelector ({
  currentRooms: selectCurrentRooms
});


export default connect(mapStateToProps)(RoomHall);