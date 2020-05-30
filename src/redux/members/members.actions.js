import {MembersActionTypes} from '../members/members.types';

export const setCurrentMembers = members => ({
    type : MembersActionTypes.SET_CURRENT_MEMBERS,
    payload: members
});

export const addOneMember = member => ({
    type : MembersActionTypes.ADD_ONE_MEMBER,
    payload: member
});

export const deleteMember = member => ({
    type : MembersActionTypes.DELETE_MEMBER,
    payload: member
});

