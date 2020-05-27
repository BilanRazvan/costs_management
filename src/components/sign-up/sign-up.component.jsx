import React from 'react';
import './sign-up.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

class SignUp extends React.Component {
    constructor(){
        super();

        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {firstName, lastName, username, password, confirmPassword} = this.state;

        if(password !== confirmPassword){
            alert("password don't match");
            return;
        }
        try{
            
            this.setState({
                firstName: '',
                lastName: '',
                username: '',
                password: '',
                confirmPassword: ''
            });

        }catch(error){
            console.log(error);
        }
    }

    handleChange = event =>{
        const {name, value} = event.target;

        this.setState({[name]:value});
    };

    render () {
        const {firstName, lastName, username, password, confirmPassword} = this.state;
        return(
            <div className = 'sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span >Sign up with your username and passsword</span>
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

export default SignUp;