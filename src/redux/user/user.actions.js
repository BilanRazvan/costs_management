import {UserActionTypes} from './user.types';

export const setCurrentUser = user => ({
    type : UserActionTypes.SET_CURRENT_USER,
    payload: user
});

export const setAllUsers = users => ({
    type : UserActionTypes.SET_ALL_USERS,
    payload: users
});

export const addOneUser = user => ({
    type : UserActionTypes.ADD_ONE_USER,
    payload: user
});