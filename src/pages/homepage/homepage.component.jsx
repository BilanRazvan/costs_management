import React from 'react';

import './homepage.styles.scss';

import RoomHall from '../../components/rooms-hall/rooms-hall.component';
import { connect } from 'react-redux';

import {withRouter} from 'react-router-dom';

import {setCurrentRoom} from '../../redux/room/room.actions';
import {selectCurrentRooms} from '../../redux/rooms/rooms.selectors';
import {createStructuredSelector} from 'reselect';

class HomePage extends React.Component {

    componentDidMount(){
        const {setCurrentRoom} = this.props
        setCurrentRoom(null)
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
    setCurrentRoom: room => dispatch(setCurrentRoom(room))
});

const mapStateToProps = createStructuredSelector ({
    currentRooms: selectCurrentRooms
  });


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(HomePage));