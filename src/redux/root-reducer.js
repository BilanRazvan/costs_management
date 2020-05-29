import { combineReducers } from 'redux';
import {persistReducer} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import roomsReducer from './rooms/rooms.reducer';
import roomReducer from './room/room.reducer';
import memberReducer from './members/members.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user','rooms','room', 'members']
}

const rootReducer = combineReducers({
    user: userReducer,
    rooms: roomsReducer,
    room: roomReducer,
    members: memberReducer
});

export default persistReducer(persistConfig, rootReducer);