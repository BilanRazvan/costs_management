import React from 'react';
import {withRouter} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';

import {connect} from 'react-redux';
import PageDropDown from '../page-dropdown/page-dropdown.component';
import {selectCreateHidden} from '../../redux/rooms/rooms.selectors'
import {toggleCreateHidden} from '../../redux/rooms/rooms.actions';
import {setCurrentRoom} from '../../redux/room/room.actions';
import './room-preview.styles.scss';

const RoomPreview = ({room, history,hidden, toggleCreateHidden, setCurrentRoom}) => (
    <div className = 'room-preview' >
        <div className = 'background-image' style={{
            backgroundImage: `url(${room.imageUrl})`
        }}/>
        {
            room.empty ? (
            <div className = 'content' onClick ={ toggleCreateHidden}>
                <h1 className = 'name'> {room.name.toUpperCase()} </h1>
                <span className = 'subtitle'> CREATE </span>
            </div>)
            : (
            <div className = 'content' onClick={async () => {
                await setCurrentRoom(room)
                history.push('/room')
                }}>
                <h1 className = 'name'> {room.name.toUpperCase()} </h1>
                <span className = 'subtitle'> ENTER</span>
            </div>)
        }
    
        {
            hidden ? 
            <PageDropDown/> : null
        }
    </div>
);

const mapDispatchToProps  = dispatch => ({
    toggleCreateHidden: () => dispatch(toggleCreateHidden()),
    setCurrentRoom: room => dispatch(setCurrentRoom(room))
});

const mapStateToProps = createStructuredSelector({
    hidden: selectCreateHidden
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(RoomPreview));