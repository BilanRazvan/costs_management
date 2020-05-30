import {UserActionTypes} from './user.types';
import {setUsers, addUser} from './user.utils';

const INITIAL_STATE = {
    currentUser: null,
    allUsers: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        case UserActionTypes.SET_ALL_USERS:
            return{
                ...state,
                allUsers: setUsers(action.payload)
            }
        case UserActionTypes.ADD_ONE_USER:
            return{
                ...state,
                allUsers: addUser(this.state.users, action.payload)
            }
        default:
            return state;
    }
};

export default userReducer;