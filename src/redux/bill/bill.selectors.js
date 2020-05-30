import {createSelector} from 'reselect';

const selectBills = state => state.bills;


export const selectCurrentBills = createSelector(
    [selectBills],
    (bills) => bills.currentBills
);
