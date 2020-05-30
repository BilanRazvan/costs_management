import React from 'react';
import { connect } from 'react-redux';
import CustomButton from '../custom-button/custom-button.component';
import './glisant2.styles.scss'


import {createStructuredSelector} from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import {selectCurrentMembers} from '../../redux/members/members.selectors';
import {selectCurrentRoom} from '../../redux/room/room.selectors';
import {addOneMember} from '../../redux/members/members.actions';


class Glisant extends React.Component {

    render(){
        const {name} = this.props;
        return (
            <div className= 'all'>
                <div className='componenta'>
                    <h2>{name}</h2>
                    <div className = 'glisant'>
                    <span className = 'empty-message'>There are no {name.toLowerCase()}</span>
                    </div>
                    <CustomButton>
                    ADD {name}</CustomButton>
                </div>
         </div>
        )
    }  
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    currentMembers: selectCurrentMembers,
    currentRoom: selectCurrentRoom
});

const mapDispatchToProps = dispatch => ({
    addOneMember: member => dispatch(addOneMember(member))
});

export default connect(mapStateToProps,mapDispatchToProps)(Glisant);