import {createSelector} from 'reselect';

const selectBills = state => state.bills;

const selectBillMembers = state => state.bills;

const selectBillAmount = state => state.bills;

export const selectCurrentBills = createSelector(
    [selectBills],
    (bills) => bills.currentBills
);

export const selectCurrentBillMembers = createSelector(
    [selectBillMembers],
    (bills) => bills.billMembers
);

export const selectCurrentBillAmount = createSelector(
    [selectBillAmount],
    (bills) => bills.billAmount
);