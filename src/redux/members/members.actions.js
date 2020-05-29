import {MembersActionTypes} from '../members/members.types';

export const setCurrentRoom = members => ({
    type : MembersActionTypes.SET_CURRENT_MEMBERS,
    payload: members
});