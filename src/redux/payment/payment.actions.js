import {PaymentActionTypes} from '../payment/payment.types';

export const setCurrentPayments = payment => ({
    type : PaymentActionTypes.SET_CURRENT_PAYMENTS,
    payload: payment
});