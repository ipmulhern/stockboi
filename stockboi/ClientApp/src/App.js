import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { CurrentStock } from './components/CurrentStock';
import { AddStock } from './components/AddStock';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={CurrentStock} />
        <Route exact path='/AddStock' component={AddStock} />
      </Layout>
    );
  }
}
