import React from 'react';
import './sign-up.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import Axios from 'axios';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import {setCurrentUser} from '../../redux/user/user.actions';

class SignUp extends React.Component {
    constructor(){
        super();

        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            confirmPassword: '',
            errorMessage:''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {username, password, lastName, firstName, confirmPassword} = this.state;
        const{setCurrentUser, history} = this.props;

        if(password !== confirmPassword){
            this.setState({errorMessage:'The confirmation password does not match'})
            this.setState({username:'',password:'', lastName:'', firstName:'', confirmPassword:''})
            setTimeout(()=>this.setState({errorMessage:''}),5000)
            return;
        }
        Axios({
            url:'http://localhost:8080/user/save',
            method: 'POST',
            data:({
                username: username,
                password: password,
                firstName: firstName,
                lastName: lastName
            }),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            setCurrentUser({id: response.data.id,
                            ...response.data})
            history.push('/')
            this.setState({username:'',password:'', lastName:'', firstName:'', confirmPassword:''})
        })
        .catch(error=>{
            this.setState({errorMessage:error.response.data.message})
            this.setState({username:'',password:'', lastName:'', firstName:'', confirmPassword:''})
            setTimeout(()=>this.setState({errorMessage:''}),5000)
            
        })
    }

    handleChange = event =>{
        const {name, value} = event.target;

        this.setState({[name]:value});
    };

    render () {
        const {firstName, lastName, username, password, confirmPassword, errorMessage} = this.state;
        return(
            <div className = 'sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span >Sign up with your username and passsword</span>
                <span className= 'errorMessage'>{errorMessage}</span>
                <form 
                className ='sign-up-form'
                onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name='firstName'
                        value={firstName}
                        onChange = {this.handleChange}
                        label='First Name'
                        required/>
                    <FormInput
                        type='text'
                        name='lastName'
                        value={lastName}
                        onChange = {this.handleChange}
                        label='Last Name'
                        required/>
                    <FormInput
                        type='text'
                        name='username'
                        value={username}
                        onChange = {this.handleChange}
                        label='Username'
                        required/>
                    <FormInput
                        type='password'
                        name='password'
                        value={password}
                        onChange = {this.handleChange}
                        label='Password'
                        required/>
                    <FormInput
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange = {this.handleChange}
                        label='Confirm Password'
                        required/>
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default withRouter(connect(null,mapDispatchToProps)(SignUp));