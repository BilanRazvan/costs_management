import React from 'react';
import './member-item.styles.scss';
import {connect} from 'react-redux';
import {deleteMember} from '../../redux/members/members.actions';

import {selectCurrentRoom} from '../../redux/room/room.selectors';
import {createStructuredSelector} from 'reselect';

import Axios from 'axios';

class MemberItem extends React.Component{
    handleClick = async event =>{
        event.preventDefault()
        const {member, deleteMember, currentRoom} = this.props
        if(member.user.id===currentRoom.creator.id){
            return
        }

        Axios({
            url:'http://localhost:8080/member/delete',
            method: 'DELETE',
            data:({
                id: member.id
            }),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response=>
                console.log(response)
            )
        deleteMember(member)

    };

    render(){
        const {member}=this.props
        return(
        <div className='member-item'>
            <span className='name'>{member.name}</span>
            <div className='remove-button' onClick={this.handleClick}>&#10005;</div>
        </div>
        );
    }
};

const mapStateToProps = createStructuredSelector ({
    currentRoom: selectCurrentRoom
  });

const mapDispatchToProp = dispatch => ({
  deleteMember: member => dispatch(deleteMember(member))
});


export default connect(mapStateToProps,mapDispatchToProp)(MemberItem);