import {createSelector} from 'reselect';

const selectMembers = state => state.members;


export const selectCurrentMembers = createSelector(
    [selectMembers],
    (members) => members.currentMembers
);
