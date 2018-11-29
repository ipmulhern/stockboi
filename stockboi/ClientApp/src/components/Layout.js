import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { NavMenu } from './NavMenu';
import {LogoutTimer} from './LogoutTimer.js';
// import {EventEmitter} from 'event-emitter';


const EventEmitter = require('events');
export class Layout extends Component {
  displayName = Layout.name
  constructor(props){
    super(props);

    this.state ={
      emitter: new EventEmitter()
    };
  }

  render() {
    return (
      <div onMouseMove={() => this.state.emitter.emit('userAction')}
        onKeyDown={() => this.state.emitter.emit('userAction')}
      >
        <LogoutTimer logout={this.props.logout} emitter={this.state.emitter}/>
        <Grid fluid>
          <Row>
            <Col sm={3}>
              <NavMenu permissionLevel={this.props.permissionLevel} />
            </Col>
            <Col sm={8}>
              {this.props.children}
            </Col>
            <Col sm={1}>
              <br />
              <a style={{ cursor: "pointer" }}
                onClick={() => this.props.logout()}>
                Logout
              </a>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
