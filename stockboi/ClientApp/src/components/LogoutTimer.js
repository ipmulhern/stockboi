import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';

export class LogoutTimer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            fiveSecondsLeft: false,
            timerStopped: false, 
            showModal: false,
            secondsLeft: 0
        };

        this.fiveSecondsLeft = this.fiveSecondsLeft.bind(this);
        this.fiveAndUnderTimer = this.fiveAndUnderTimer.bind(this);
        this.renderFiveSecondsLeft = this.renderFiveSecondsLeft.bind(this);
    }

    componentDidMount(){
        this.setState({
            timer: setTimeout(this.fiveSecondsLeft, 5000)
        })
        this.props.emitter.on('userAction', ()=>{
            clearTimeout(this.state.timer);
            this.setState({
                timer: setTimeout(this.fiveSecondsLeft, 5000),
                timerStopped: true,
                showModal: false
            });
        });
    }

    fiveAndUnderTimer(sec){
        this.setState({secondsLeft: sec})
        if (sec == 0){
            this.setState({timerStopped: true});
            this.props.logout();
        }
        if (this.state.timerStopped){
            this.setState({timerStopped: false});
        }
        else {
            console.log('else');
            setTimeout(() => this.fiveAndUnderTimer(sec - 1), 1000);
        }
    }

    fiveSecondsLeft(){
        this.setState({
            fiveSecondsLeft: true,
            showModal: true
        }, () => this.fiveAndUnderTimer(5));
    }

    renderFiveSecondsLeft(){
        return(
        <Modal show={this.state.showModal}>
          <Modal.Body>
              <h1>You will be logged out in {this.state.secondsLeft} seconds.</h1>
          </Modal.Body> 
        </Modal>);
    }

    render(){
        return(
            this.state.fiveSecondsLeft
            ?this.renderFiveSecondsLeft()
            :<div></div>
        )
    }
}