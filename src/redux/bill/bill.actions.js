import {BillActionTypes} from '../bill/bill.types';

export const setCurrentBills = bill => ({
    type : BillActionTypes.SET_CURRENT_BILLS,
    payload: bill
});

export const setCurrentBillMembers = billMembers => ({
    type : BillActionTypes.SET_CURRENT_BILL_MEMBERS,
    payload: billMembers
});

export const deletememberfromthebill = member => ({
    type : BillActionTypes.DELETE_MEMBER_FROM_THE_BILL,
    payload: member
});

export const setAmountMember= amount_and_member => ({
    type : BillActionTypes.SET_AMOUNT_MEMBER,
    payload: amount_and_member
});

export const setBillAmount= amount => ({
    type : BillActionTypes.SET_BILL_AMOUNT,
    payload: amount
});

export const setMemberProcent= procent => ({
    type : BillActionTypes.SET_MEMBER_PROCENT,
    payload: procent
});

export const resetBillMembers= members => ({
    type : BillActionTypes.RESET_BILL_MEMBERS,
    payload: members
});