import React from 'react';
import './App.css';
import { Switch, Route, Redirect} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';

import { connect } from 'react-redux';

import HomePage from './pages/homepage/homepage.component';
import SignInAndSignUpPage from './pages/sig-in-and-sign-up/sig-in-and-sign-up.component';
import RoomPage from './pages/roompage/roompage.component.jsx';

import Header from './components/header/header.component';
import {withRouter} from 'react-router-dom';

import {selectCurrentUser} from "./redux/user/user.selectors";
import {selectCurrentRoom} from './redux/room/room.selectors';




class App extends React.Component {

  componentDidMount() {
    const{currentUser,history } = this.props;
    if(currentUser===null){
      history.push('/signin')
    }

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
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser,
  currentRoom: selectCurrentRoom
});


export default withRouter(connect(mapStateToProps)(App));
