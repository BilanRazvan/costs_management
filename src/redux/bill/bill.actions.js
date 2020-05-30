import {BillActionTypes} from '../bill/bill.types';

export const setCurrentBills = bill => ({
    type : BillActionTypes.SET_CURRENT_BILLS,
    payload: bill
});