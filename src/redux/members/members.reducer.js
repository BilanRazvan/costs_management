import {MembersActionTypes} from './members.types';

const INITIAL_STATE = {
    currentMembers: null
}

const roomsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case MembersActionTypes.SET_CURRENT_MEMBERS:
            return {
                ...state,
                currentMembers: action.payload
            }
        default:
            return state;
    }
};

export default roomsReducer;