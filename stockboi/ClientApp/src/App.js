import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { CurrentStock } from './components/CurrentStock';
import { AddStock } from './components/AddStock';
import { Login } from './components/Login';
import { StockAdmin } from './components/StockAdmin.js';
import { UserAdmin } from './components/UserAdmin.js';
import { Analytics } from './components/Analytics.js';
import axios from 'axios';

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
    this.logout = this.logout.bind(this);
  }

  componentDidMount(){
    axios.get('api/Login/GetUser')
      .then(response => {
        if (response.data.username){
          this.setState({
            loggedIn: true,
            permissionLevel: response.data.accessLevel
          });
        }
      });
  }

  setLoggedIn(loggedIn){
    this.setState({
      loggedIn: loggedIn
    });
  }

  logout(){
    axios.get('api/Login/Logout')
      .then(response => {
        if (response.data){
          this.setState({
            loggedIn: false,
            permissionLevel: null
          });
        }
      });
  }
  
  setPermissionLevel(permissionLevel){
    this.setState({
      permissionLevel: permissionLevel
    });
  }

  render() {
    console.log(this.state.permissionLevel);
    return (
      this.state.loggedIn 
      ?<Layout logout={this.logout} permissionLevel={this.state.permissionLevel}>
        <Route exact path='/' component={CurrentStock} />
        <Route exact path='/Orders' component={AddStock} />
        <Route exact path='/StockAdmin' component={StockAdmin} />
        <Route exact path='/UserAdmin' component={UserAdmin} />
        <Route exact path='/Analytics' component={Analytics} />
      </Layout>
      :<Login setLoggedIn={this.setLoggedIn} setPermissionLevel={this.setPermissionLevel}/>
    );
  }
}
