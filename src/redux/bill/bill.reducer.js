import {BillActionTypes} from './bill.types';
import {addBillMember, deleteMember, setMemberAmount, setMemberProcent, modifyAmount} from './bill.utils';

const INITIAL_STATE = {
    currentBills: null,
    billMembers: [],
    billAmount:0
}

const billsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case BillActionTypes.SET_CURRENT_BILLS:
            return {
                ...state,
                currentBills: action.payload
            }
        case BillActionTypes.SET_CURRENT_BILL_MEMBERS:
            return {
                ...state,
                billMembers: addBillMember(state.billMembers, action.payload)
            }
        case BillActionTypes.DELETE_MEMBER_FROM_THE_BILL:
            return{
                ...state,
                billMembers: deleteMember(state.billMembers, action.payload)
            }
        case BillActionTypes.SET_AMOUNT_MEMBER:
            return{
                ...state,
                billMembers: setMemberAmount(state.billMembers, action.payload)
            }
        case BillActionTypes.SET_BILL_AMOUNT:
            return{
                ...state,
                billMembers: modifyAmount(state.billMembers,action.payload),
                billAmount: action.payload
            }
        case BillActionTypes.SET_MEMBER_PROCENT:
            return{
                ...state,
                billMembers: setMemberProcent(state.billMembers, action.payload)
            }
        case BillActionTypes.RESET_BILL_MEMBERS:
            return{
                ...state,
                billMembers: []
            }
        default:
            return state;
    }
};

export default billsReducer;