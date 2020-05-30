import {BillActionTypes} from './bill.types';

const INITIAL_STATE = {
    currentBills: null
}

const billsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case BillActionTypes.SET_CURRENT_BILLS:
            return {
                ...state,
                currentBills: action.payload
            }
        default:
            return state;
    }
};

export default billsReducer;