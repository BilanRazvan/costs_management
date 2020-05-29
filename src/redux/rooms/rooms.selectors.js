import {createSelector} from 'reselect';

const selectRooms = state => state.rooms;


export const selectCurrentRooms = createSelector(
    [selectRooms],
    (rooms) => rooms.currentRooms
);

export const selectCreateHidden = createSelector(
    [selectRooms],
    (rooms) => rooms.hidden
)