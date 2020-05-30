import React from 'react';
import { connect } from 'react-redux';
import CustomButton from '../custom-button/custom-button.component';
import './glisant.styles.scss'

import FormInput from '../form-input/form-input.component';
import MemberItem from '../member-item/member-item.component';

import {createStructuredSelector} from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import {selectCurrentMembers} from '../../redux/members/members.selectors';
import {selectCurrentRoom} from '../../redux/room/room.selectors';
import {addOneMember} from '../../redux/members/members.actions';

import Axios from 'axios';

class Glisant extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            users: [],
            allUsers:[],
            userSelected: null,
            errorMessage: ''
        }

    }
    componentDidMount() {
        const{users, currentUser} = this.props;
        if(users!==null){
            this.setState({users: users.filter(user=>
                (user.id!==currentUser.id))})
            this.setState({allUsers: users.filter(user=>
                (user.id!==currentUser.id))})
        }
      }


    handleChange = event => {
        const { value, name } = event.target;
        const {allUsers} = this.state

        this.setState({ [name] : value})
        this.setState({users: allUsers.filter(user=>(
            user.name.includes(value)
        ))})
    }

    handleClick = async event => {
        event.preventDefault();
        const {userSelected} = this.state
        if(userSelected===null){
            this.setState({errorMessage:'You need to select one user'});
            setTimeout(()=>this.setState({errorMessage:''}),5000);
            return;
        }
        const{  currentRoom, addOneMember, currentMembers} = this.props;

        const array = currentMembers.map(member=>(
            member.user.id===userSelected.id))
        if(array.includes(true)){
            this.setState({errorMessage:userSelected.name + ' is already a member'})
            setTimeout(()=>this.setState({errorMessage:''}),5000)
            return;
        }
        Axios({
            url:'http://localhost:8080/member/save',
            method: 'POST',
            data:({
                user: {
                    id: userSelected.id
                },
                room: {
                    id: currentRoom.id
                },
                name:userSelected.name
            }),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response=>
                addOneMember(response.data)
            )
        

    }

    render(){
        const {name, currentMembers, currentUser} = this.props;
        const {users}=this.state
        return (
            <div className= 'all'>
                <div className='component'>
                    <h2>{name}</h2>
                    <div className = 'glisant'>
                    {
                        currentMembers.length===0 ? (
                            <span className = 'empty-message'>There are no {name.toLowerCase()}</span>
                        ) : (
                            currentMembers.map(member=>(
                                member.user.id!==currentUser.id ?
                                (<MemberItem key={member.id} member={member}>
                                </MemberItem>): null
                            ))
                        )
                    }
                    </div>
                    <CustomButton onClick={this.handleClick}>
                    ADD {name}</CustomButton>
                </div>
                <span className='errorMessage'>{this.state.errorMessage}</span>
                    <form  >
                        <FormInput 
                        name="name" 
                        type="text" 
                        handleChange ={this.handleChange}
                        value = {this.state.name} 
                        label="SEARCH USER"
                        required/>
                    </form>
                <div className='component-2'>
                {
                    users.map(user=>(
                        user!==null ?
                            (
                                <div key={user.id} className='label' tabIndex={user.id} onClick={()=>{
                                this.setState({ userSelected : {name:user.name, id:user.id}})
                                }}>
                                {user.name}
                            </div>): null
                    ))
                }
                </div>
         </div>
        )
    }  
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    currentMembers: selectCurrentMembers,
    currentRoom: selectCurrentRoom
});

const mapDispatchToProps = dispatch => ({
    addOneMember: member => dispatch(addOneMember(member))
});

export default connect(mapStateToProps,mapDispatchToProps)(Glisant);