import {createSelector} from 'reselect';

const selectPayments = state => state.payments;


export const selectCurrentPayments = createSelector(
    [selectPayments],
    (payments) => payments.currentPayments
);
