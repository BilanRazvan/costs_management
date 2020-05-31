import {createSelector} from 'reselect';

const selectRoom = state => state.room;

const selectHidden = state => state.room;

export const selectCurrentRoom = createSelector(
    [selectRoom],
    (room) => room.currentRoom
);

export const selectHiddenDelete = createSelector(
    [selectHidden],
    (room) => room.hidden
);