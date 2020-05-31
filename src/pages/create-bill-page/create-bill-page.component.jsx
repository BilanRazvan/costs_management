import React from 'react';
import './create-bill-page.styles.scss';
import { connect } from 'react-redux';

import FormInput from '../../components/form-input/form-input.component';
import BillItem from '../../components/bill-item/bill-item.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import {selectCurrentRoom} from '../../redux/room/room.selectors'
import {selectCurrentMembers} from '../../redux/members/members.selectors';
import {selectCurrentBillMembers} from '../../redux/bill/bill.selectors';
import {selectCurrentUser} from '../../redux/user/user.selectors';

import {setHiddenDelete} from '../../redux/room/room.actions';
import {setCurrentBillMembers, setBillAmount} from '../../redux/bill/bill.actions';

import {createStructuredSelector} from 'reselect';
import Select from 'react-select';
import { ReactComponent as Logo} from '../../assets/plus.svg';
import {withRouter} from 'react-router-dom';

import Axios from 'axios';


class CreateBillPage extends React.Component{
    constructor(){
        super();
        this.state = {
            billName:'',
            billAmount: '',
            errorMessage: '',
            selectedValue: {
                id:'',
                name:''
            }
        }
    }

    componentDidMount(){
        const {setHiddenDelete} = this.props
        setHiddenDelete(true)

    }

    handleClick1 = async event =>{
        event.preventDefault();
        const {setHiddenDelete, history, currentBillMembers, currentUser, currentRoom} = this.props
        const {billName, billAmount}= this.state
        setHiddenDelete(true)
        if(billName===''){
            this.setState({errorMessage: 'You need to set one nam!'})
            setTimeout(()=>this.setState({errorMessage:''}),5000)
            return
        }else if(billAmount===''){
            this.setState({errorMessage: 'You need to set the amount'})
            setTimeout(()=>this.setState({errorMessage:''}),5000)
            return
        }else if(currentBillMembers.length===0){
            this.setState({errorMessage: 'You need to add members to bill'})
            setTimeout(()=>this.setState({errorMessage:''}),5000)
            return
        }else{
            var sum=0;
            var ver=0;
            currentBillMembers.map(member=> sum = sum + parseInt(member.procent))
            currentBillMembers.map(member=>member.procent===0 ? ver=1: null)
            if(sum>100){
                this.setState({errorMessage: 'The total is bigger than the initial amount'})
                setTimeout(()=>this.setState({errorMessage:''}),5000)
                return
            }else if(ver===1){
                this.setState({errorMessage: 'One or more members has the amount equal to 0'})
                setTimeout(()=>this.setState({errorMessage:''}),5000)
                return
            }else{
                Axios({
                    url:'http://localhost:8080/bill/save',
                    method: 'POST',
                    data:({
                        name: billName,
                        price: billAmount,
                        creator: {
                            id:currentUser.id
                        },
                        room: {
                            id:currentRoom.id
                        },
                        status: false
                    }),
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then(response=>{
                    currentBillMembers.map(member=>(
                        Axios({
                            url:'http://localhost:8080/payment/save',
                            method: 'POST',
                            data:({
                                name: billName,
                                price: member.amount,
                                member: {
                                    id:member.id
                                },
                                bill: {
                                    id:response.data.id
                                },
                                status: false
                            }),
                            headers:{
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            }
                        }).then(response=>{
                            console.log(response.data)
                            history.push('/room')
                        })
                    ))
                })
            }
        }
    }

    handleChange2 = event => {
        const { value, name } = event.target;

        if(name==='billAmount'){
            if(/^\d+$/.test(value)===true || value===''){
                this.setState({ [name] : value})
                const {setBillAmount} = this.props;
                setBillAmount(value)
            }
        }else{
            this.setState({ [name] : value})
        }
    }

    handleClick2 = event =>{
        const {selectedValue} = this.state
        const{setCurrentBillMembers} = this.props
        setCurrentBillMembers(selectedValue)
    }


    render(){
        const {currentMembers} = this.props
        return (
            <div className ='create-bill'>
                <div className='title' >CREATE A BILL</div>
                <div className='bill-name'>
                    <FormInput 
                    name="billName" 
                    type="text" 
                    handleChange ={this.handleChange2}
                    value = {this.state.billName} 
                    label="BILL NAME"
                    required/>
                </div>
                <div className='bill-amount'>
                    <FormInput 
                    name="billAmount" 
                    type="text" 
                    handleChange ={this.handleChange2}
                    value = {this.state.billAmount} 
                    label="AMOUNT"
                    required/>
                </div>
                <div className='members'>
                    <div className = 'option1'>
                        <label className='label'>MEMBERS</label>
                        <Select
                            name='selectedValue'
                            options={currentMembers.map(member=>(
                                member!==null ? {label:member.name, value:member.id} :null
                            ))}
                            onChange={opt =>{
                                this.setState({selectedValue: {id:opt.value, name:opt.label}})
                                console.log(opt.label+ opt.value)
                            }}
                        />
                    </div>
                    <div className = 'option2'>
                        <Logo className = 'logo' onClick={this.handleClick2}/>
                    </div>
                </div>
                <div className='option3'>
                    <BillItem></BillItem>
                </div>
                
                <span className='errorMessage'>{this.state.errorMessage}</span>
                <div className='button'>
                    <CustomButton onClick={this.handleClick1}>ADD BILL</CustomButton>
                </div>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector ({
    currentRoom: selectCurrentRoom,
    currentMembers: selectCurrentMembers,
    currentBillMembers: selectCurrentBillMembers,
    currentUser: selectCurrentUser
  });

  const mapDispatchToProps = dispatch => ({
    setHiddenDelete: hidden => dispatch(setHiddenDelete(hidden)),
    setCurrentBillMembers: billMembers => dispatch(setCurrentBillMembers(billMembers)),
    setBillAmount: amount => dispatch(setBillAmount(amount))
  });

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CreateBillPage));