import {MembersActionTypes} from './members.types';
import {addMember, deleteMember} from './members.utils'

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
        case MembersActionTypes.ADD_ONE_MEMBER:
            return{
                ...state,
                currentMembers: addMember(state.currentMembers, action.payload)
            }
        case MembersActionTypes.DELETE_MEMBER:
            return{
                ...state,
                currentMembers: deleteMember(state.currentMembers, action.payload)
            }
        default:
            return state;
    }
};

export default roomsReducer;