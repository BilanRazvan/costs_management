import {RoomsActionTypes} from './rooms.types';
import {initRooms, addRoom, deleteRoom} from './rooms.utils';

const INITIAL_STATE = {
    hidden: true,
    currentRooms: [{
        name: 'New room',
        imageUrl: "https://i.ibb.co/ZdxM6Sr/empty-room.jpg",
        id: 1,
        empty: true,
        linkUrl: `/createroom`,
        creator: ''
      }]
}

const roomsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case RoomsActionTypes.SET_CURRENT_ROOMS:
            return {
                ...state,
                currentRooms: initRooms(INITIAL_STATE.currentRooms[0],action.payload)
            }
        case RoomsActionTypes.RESET_CURRENT_ROOMS:
            return {
                ...state,
                currentRooms: INITIAL_STATE.currentRooms
            }
        case RoomsActionTypes.TOGGLE_CREATE_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }
        case RoomsActionTypes.ADD_ONE_ROOM:
            return{
                ...state,
                currentRooms: addRoom(state.currentRooms,action.payload)
            }
        case RoomsActionTypes.DELETE_ONE_ROOM:
            return{
                ...state,
                currentRooms: deleteRoom(state.currentRooms, action.payload)
            }
        default:
            return state;
    }
};

export default roomsReducer;