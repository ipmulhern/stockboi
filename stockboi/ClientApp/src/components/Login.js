import React from 'react';
import axios from 'axios';

export class Login extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            authenticated: false,
            loading: false,
            showErrorMessage: false
        };

        this.verifyUsernameAndPassword = this.verifyUsernameAndPassword.bind(this);
        this.verifyPin = this.verifyPin.bind(this);
        this.showError = this.showError.bind(this);
    }

    renderPin(){
        if(this.state.authenticated){
            return (
                <div>
                    <input id="pin" maxlength={50} placeholder="pin" style={{marginBottom: "10px"}}/>
                    <br/>
                </div>
            );
        }
    }

    verifyUsernameAndPassword(){
        this.setState({loading: true});
        let request ={
            Username: document.getElementById("username").value,
            Password: document.getElementById("password").value
        };
        axios.post('api/Login/VerifyUsernameAndPassword', request)
            .then(response => {
                if(response.data.valid){
                    this.props.setPermissionLevel(response.data.permissionLevel);
                    this.setState({
                        authenticated: true,
                        showErrorMessage: false,
                        loading: false
                    });
                }
                else {
                    this.setState({loading: false, showErrorMessage: true});
                }
            });
    }

    verifyPin(){
        this.setState({loading: true});
        axios.post('api/Login/VerifyPin', { Keyword: document.getElementById("pin").value.toString()})
            .then(response => {
                if(response.data.valid){
                    this.props.setLoggedIn(true);
                }
                else {
                    this.setState({loading: false, showErrorMessage: true});
                }
            });
    }

    showError(){
        if (this.state.showErrorMessage){
            return(<p style={{marginTop: "10px", color: "#c90000"}}>Something went wrong. Please try again.</p>);
        }
    }

    render(){
        return(
            <div>
                <div className="login shadow">
                    <div style={{marginLeft: "auto", marginRight:"auto", width: "73%", marginTop: "150px", marginBottom: "10px"}}>
                        <h1 className="stockboi-title" style={{marginRight: "0px"}}>STOCKBO</h1>
                        <h1 className="stockboi-title red" style={{marginLeft: "0px"}}>I</h1>
                    </div>
                    <div style={{marginLeft: "auto", marginRight:"auto", width: "38%", textAlign: "center"}}>
                        <input id="username" maxlength={50} placeholder="username" style={{marginBottom: "10px"}}/>
                        <br/>
                        <input id="password" type="password" maxlength={50} placeholder="password" style={{marginBottom: "10px"}}/>
                        <br/>
                        {this.renderPin()}
                        {!this.state.loading?
                        <button onClick={!this.state.authenticated 
                            ?this.verifyUsernameAndPassword
                            :this.verifyPin}>
                                Login
                            </button>
                        : <p><em>Loading...</em></p>}
                         {this.showError()}
                    </div>
                    <a style={{position: "absolute", bottom: "15px"}}>Forgot your password?</a>
                </div>
            </div>
        ); 
    }
} 