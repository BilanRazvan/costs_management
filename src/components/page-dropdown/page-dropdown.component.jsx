import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import './page-dropdown.styles.scss';

import FormInput from '../form-input/form-input.component';

import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {toggleCreateHidden, addOneRoom} from '../../redux/rooms/rooms.actions';
import { ReactComponent as Logo} from '../../assets/cancel.svg';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {createStructuredSelector} from 'reselect';
import Axios from 'axios';

class PageDropDown extends React.Component{ 
    constructor(){
        super();
        this.state ={
            imageUrl: 'https://i.ibb.co/2qkWFCC/room3.jpg',
            roomName: ''
        }
    }

    handleSubmit = async event =>{
        event.preventDefault();

        const {roomName, imageUrl} = this.state;
        const {currentUser, addOneRoom, toggleCreateHidden} = this.props;
        Axios({
            url:'http://localhost:8080/room/save',
            method: 'POST',
            data:({
                creator: {
                    id:currentUser.id
                },
                name: roomName,
                imageUrl: imageUrl
            }),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            addOneRoom(response.data)
            toggleCreateHidden()

        })
    }

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name] : value})
    }

    render() {
        const {toggleCreateHidden} = this.props;
        return (
        <div className='cart-dropdown'>
            <div className = 'background' style={{
            background: `url(${this.state.imageUrl})`
            }}/>
            <Logo className = 'logo' onClick ={toggleCreateHidden}/>
            <h2 className= 'title'>Create a room</h2>
            <span className='errorMessage'>{this.state.errorMessage}</span>
            <form className = 'form' onSubmit={this.handleSubmit}>
                <FormInput 
                name="roomName" 
                type="Room Name" 
                handleChange ={this.handleChange}
                value = {this.state.roomName}
                label="Room Name"
                required/>
                <label className = 'label' >Select the backround</label>
                <select className= 'select' onChange = {(event) => this.setState({imageUrl: event.target.value})}>
                    <option value="https://i.ibb.co/2qkWFCC/room3.jpg">Backround_1</option>
                    <option value="https://i.ibb.co/DMZHhNQ/room5.jpg">Backround_2</option>
                </select>
            <CustomButton  >
            CREATE</CustomButton>
            </form>
        </div>
        );
    }
}

const mapDispatchToProps  = dispatch => ({
    toggleCreateHidden: () => dispatch(toggleCreateHidden()),
    addOneRoom: room => dispatch(addOneRoom(room))
});

const mapStateToProps = createStructuredSelector ({
    currentUser: selectCurrentUser
  });

export default withRouter(connect(
        mapStateToProps,
        mapDispatchToProps)(PageDropDown));