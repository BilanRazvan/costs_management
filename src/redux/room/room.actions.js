import {RoomActionTypes} from '../room/room.types';

export const setCurrentRoom = room => ({
    type : RoomActionTypes.SET_CURRENT_ROOM,
    payload: room
});

export const setHiddenDelete = hidden => ({
    type : RoomActionTypes.SET_HIDDEN_DELETE,
    payload: hidden
});