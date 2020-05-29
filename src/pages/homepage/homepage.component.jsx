import React from 'react';

import './homepage.styles.scss';

import RoomHall from '../../components/rooms-hall/rooms-hall.component';
import { connect } from 'react-redux';

import {withRouter} from 'react-router-dom';

import {setCurrentRoom} from '../../redux/room/room.actions';

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


export default withRouter(connect(null,mapDispatchToProps)(HomePage));