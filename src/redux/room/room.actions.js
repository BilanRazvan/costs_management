import {RoomActionTypes} from '../room/room.types';

export const setCurrentRoom = room => ({
    type : RoomActionTypes.SET_CURRENT_ROOM,
    payload: room
});