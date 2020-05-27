import React from 'react';
import './App.css';
import { Switch, Route} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';

import { connect } from 'react-redux';

import HomePage from './pages/homepage/homepage.component';
import SignInAndSignUpPage from './pages/sig-in-and-sign-up/sig-in-and-sign-up.component';

import Header from './components/header/header.component';

import {selectCurrentUser} from "./redux/user/user.selectors"
import {setCurrentUser} from './redux/user/user.actions';


class App extends React.Component {

  componentDidMount() {
    const{selectCurrentUser,history} = this.props;
    if(selectCurrentUser===null){
      history.push('/signin')
    }
  }

  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path="/" component = {HomePage}/>
          <Route exact path="/signin" component = {SignInAndSignUpPage}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
