import React from 'react';

import'./bill-member.styles.scss';
import { connect } from 'react-redux';
import { deletememberfromthebill, setAmountMember, setMemberProcent} from '../../redux/bill/bill.actions';
import {createStructuredSelector} from 'reselect';
import {selectCurrentBillAmount} from '../../redux/bill/bill.selectors';



class BillMember extends React.Component {
  constructor(){
    super();
    this.state = {
      procent:''
    }
  }
  

  handleClick = event=> {
    const {billMember, deletememberfromthebill} = this.props;
    deletememberfromthebill(billMember);
  }

  handleChange = event => {
    const { value, name } = event.target;
    const {setAmountMember, billMember, currentBillAmount, setMemberProcent} = this.props;
    console.log(name)
    if((/^\d+$/.test(value)===true || value==='')&&(value<=100)){
      this.setState({ [name] : value})
      setMemberProcent({...billMember, procent: value})
      setAmountMember({...billMember, amount:(currentBillAmount*value)/(100)})
    }
}
    render(){
      const {billMember}=this.props
      const {name, amount} = billMember;
      return(
        <div className='bill-member'>
          <span className='name'>{name}</span>
          <input className = 'form-input' 
          name="procent" 
          type="text" 
          onChange ={this.handleChange}
          value = {this.state.procent} 
          required />
          <span className='amount'>{amount+'$'}</span>
          <div className='remove-button' onClick={this.handleClick}>&#10005;</div>
        </div>
      );
    } 
};

const mapStateToProps = createStructuredSelector ({
  currentBillAmount: selectCurrentBillAmount
});

const mapDispatchToProps = dispatch => ({
  deletememberfromthebill: member => dispatch(deletememberfromthebill(member)),
  setAmountMember: member=> dispatch(setAmountMember(member)),
  setMemberProcent: member => dispatch(setMemberProcent(member))
});


export default connect(mapStateToProps,mapDispatchToProps)(BillMember);