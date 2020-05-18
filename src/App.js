import React from 'react';
import './App.css';
import { Switch, Route} from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import Header from './components/header/header.component';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path="/" component = {HomePage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
