import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { CurrentStock } from './components/CurrentStock';
import { AddStock } from './components/AddStock';
import { Login } from './components/Login';

export default class App extends Component {
  displayName = App.name
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      permissionLevel: null
    }

    this.setLoggedIn = this.setLoggedIn.bind(this);
    this.setPermissionLevel = this.setPermissionLevel.bind(this);
  }

  setLoggedIn(loggedIn){
    this.setState({
      loggedIn: loggedIn
    });
  }

  
  setPermissionLevel(permissionLevel){
    this.setState({
      permissionLevel: permissionLevel
    });
  }

  render() {
    return (
      this.state.loggedIn 
      ?<Layout>
        <Route exact path='/' component={CurrentStock} />
        <Route exact path='/Orders' component={AddStock} />
      </Layout>
      :<Login setLoggedIn={this.setLoggedIn} setPermissionLevel={this.setPermissionLevel}/>
    );
  }
}
