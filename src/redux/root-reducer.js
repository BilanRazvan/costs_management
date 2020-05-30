import { combineReducers } from 'redux';
import {persistReducer} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import roomsReducer from './rooms/rooms.reducer';
import roomReducer from './room/room.reducer';
import memberReducer from './members/members.reducer';
import billsReducer from './bill/bill.reducer';
import paymentsReducer from './payment/payment.reducer'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user','rooms','room', 'members','bills', 'payments']
}

const rootReducer = combineReducers({
    user: userReducer,
    rooms: roomsReducer,
    room: roomReducer,
    members: memberReducer,
    bills: billsReducer,
    payments: paymentsReducer
});

export default persistReducer(persistConfig, rootReducer);