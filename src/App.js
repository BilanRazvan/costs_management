import React from 'react';
import './App.css';
import { Switch, Route, Redirect} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';

import { connect } from 'react-redux';

import HomePage from './pages/homepage/homepage.component';
import SignInAndSignUpPage from './pages/sig-in-and-sign-up/sig-in-and-sign-up.component';
import RoomPage from './pages/roompage/roompage.component.jsx';
import CreateBillPage from './pages/create-bill-page/create-bill-page.component';

import Header from './components/header/header.component';
import {withRouter} from 'react-router-dom';

import {selectCurrentUser} from "./redux/user/user.selectors";
import {selectCurrentRoom} from './redux/room/room.selectors';

import {setAllUsers} from './redux/user//user.actions';
import {setCurrentRoom} from './redux/room/room.actions';




class App extends React.Component {

  componentDidMount() {
    const{currentUser, history, setAllUsers} = this.props;
    if(currentUser===null){
      history.push('/signin')
    }
    fetch('http://localhost:8080/user/list')
    .then(response=> response.json())
    .then(response=> setAllUsers(response))
  }

  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path="/" component = {HomePage}/>
          <Route exact path="/signin" render={() => 
            this.props.currentUser ? ( 
            <Redirect to ='/'/>)
          : (
            <SignInAndSignUpPage/>
          )}/>
          <Route exact path="/room" render={() => 
            this.props.currentRoom ? ( 
              <RoomPage/>)
          : (
            <Redirect to ='/'/>
          )}/>
          <Route exact path="/room/bill" render={() => 
            this.props.currentRoom ? ( 
              <CreateBillPage/>)
          : (
            <Redirect to ='/'/>
          )}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser,
  currentRoom: selectCurrentRoom
});

const mapDispatchToProps = dispatch => ({
  setAllUsers: users => dispatch(setAllUsers(users)),
  setCurrentRoom: room => dispatch(setCurrentRoom(room))
});



export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
