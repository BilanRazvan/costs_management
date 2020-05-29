import React from 'react';
import { connect } from 'react-redux';
import CustomButton from '../custom-button/custom-button.component';

import {withRouter} from 'react-router-dom';

import {createStructuredSelector} from 'reselect';

import {selectCurrentRooms} from '../../redux/rooms/rooms.selectors';

const Glisant = ({name}) =>(
    <div className='component'>
        <h2>{name}</h2>
        <div className = 'glisant'>
            <span className = 'empty-message'>There are no {name.toLowerCase()}</span>
        </div>
        <CustomButton>
        ADD {name}</CustomButton>
    </div>
);

const mapStateToProps = createStructuredSelector({
    currentRooms: selectCurrentRooms
});

export default withRouter(connect(mapStateToProps)(Glisant));