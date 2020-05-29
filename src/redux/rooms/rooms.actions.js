import {RoomsActionTypes} from '../rooms/rooms.types';

export const setCurrentRooms = rooms => ({
    type : RoomsActionTypes.SET_CURRENT_ROOMS,
    payload: rooms
});

export const resetCurrentRooms = rooms =>({
    type : RoomsActionTypes.RESET_CURRENT_ROOMS,
    payload: rooms
});

export const toggleCreateHidden = () => ({
    type: RoomsActionTypes.TOGGLE_CREATE_HIDDEN
});

export const addOneRoom = room =>({
    type : RoomsActionTypes.ADD_ONE_ROOM,
    payload: room
});

export const deleteOneRoom = room =>({
    type : RoomsActionTypes.DELETE_ONE_ROOM,
    payload: room
});


