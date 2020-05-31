import {PaymentActionTypes} from './payment.types';

import {updateStatus} from './payment.utils';

const INITIAL_STATE = {
    currentPayments: []
}

const paymentsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case PaymentActionTypes.SET_CURRENT_PAYMENTS:
            return {
                ...state,
                currentPayments: action.payload
            }
        case PaymentActionTypes.UPDATE_THE_STATUS:
            return{
                ...state,
                currentPayments: updateStatus(state.currentPayments, action.payload)
            }
        default:
            return state;
    }
};

export default paymentsReducer;