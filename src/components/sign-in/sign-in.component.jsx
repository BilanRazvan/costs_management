import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { connect } from 'react-redux';
import {setCurrentUser} from '../../redux/user/user.actions';

import Axios from 'axios';  


import './sign-in.styles.scss';

class SignIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            errorMessage: ''
        }
    }

    handleSubmit = async event =>{
        event.preventDefault();

        const {username, password} = this.state;

        Axios({
            url:'http://localhost:8080/user/login',
            method: 'POST',
            data:({
                username: username,
                password: password
            }),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            setCurrentUser(response.data)
        })
        .catch(error=>{
            this.setState({errorMessage:error.response.data.message})
            this.setState({username:'',password:''})
            setTimeout(()=>this.setState({errorMessage:''}),5000)
            
        })
    }

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name] : value})
    }

    render() {
        return (
            <div className = 'sign-in'>
                <h2>I already have an account</h2>
                <span >Sign in with your username and password</span>
                <span className='errorMessage'>{this.state.errorMessage}</span>
                <form onSubmit={this.handleSubmit} >
                    <FormInput 
                    name="username" 
                    type="username" 
                    handleChange ={this.handleChange}
                    value = {this.state.username} 
                    label="username"
                    required/>
                    <FormInput 
                    name="password" 
                    type="password" 
                    handleChange ={this.handleChange}
                    value = {this.state.password} 
                    label="password"
                    required/>
                    <div className='button'>
                        <CustomButton type='submit'>SIGN IN</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
  });



export default connect(null,mapDispatchToProps)(SignIn);