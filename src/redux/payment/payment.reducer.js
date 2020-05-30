import {PaymentActionTypes} from './payment.types';

const INITIAL_STATE = {
    currentPayments: null
}

const paymentsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case PaymentActionTypes.SET_CURRENT_PAYMENTS:
            return {
                ...state,
                currentPayments: action.payload
            }
        default:
            return state;
    }
};

export default paymentsReducer;