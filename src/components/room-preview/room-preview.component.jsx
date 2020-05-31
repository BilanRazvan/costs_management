import React from 'react';
import {withRouter} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';

import {connect} from 'react-redux';
import PageDropDown from '../page-dropdown/page-dropdown.component';

import {selectCreateHidden} from '../../redux/rooms/rooms.selectors';
import {selectCurrentUser} from '../../redux/user/user.selectors';
 
import {toggleCreateHidden} from '../../redux/rooms/rooms.actions';
import {setCurrentRoom} from '../../redux/room/room.actions';
import {setCurrentMembers} from '../../redux/members/members.actions';
import {setHiddenDelete} from '../../redux/room/room.actions';

import './room-preview.styles.scss';

import Axios from 'axios';

class RoomPreview extends React.Component {

    handleSubmit = async event => {
        event.preventDefault();
        const {room, history, setCurrentRoom, setCurrentMembers, setHiddenDelete}= this.props;
        
        setCurrentRoom(room)
        setHiddenDelete(false)
        history.push('/room')

        Axios({
            url:'http://localhost:8080/member/list',
            method: 'POST',
            data:({
                id: room.id
            }),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => setCurrentMembers(response.data))

        

    }

    render(){
        const {room,hidden, toggleCreateHidden}= this.props
        return(
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
                <div className = 'content' onClick={this.handleSubmit}>
                    <h1 className = 'name'> {room.name.toUpperCase()} </h1>
                    <span className = 'subtitle'> ENTER</span>
                </div>)
            }
        
            {
                hidden ? 
                <PageDropDown/> : null
            }
        </div>
        )
    }
   
};

const mapDispatchToProps  = dispatch => ({
    toggleCreateHidden: () => dispatch(toggleCreateHidden()),
    setCurrentRoom: room => dispatch(setCurrentRoom(room)),
    setCurrentMembers: members => dispatch(setCurrentMembers(members)),
    setHiddenDelete: hidden => dispatch(setHiddenDelete(hidden))
});

const mapStateToProps = createStructuredSelector({
    hidden: selectCreateHidden,
    currentUser: selectCurrentUser
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(RoomPreview));