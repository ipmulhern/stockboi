import React from 'react';
import axios from 'axios';
import {AccessLevel} from '../Enums/AccessLevel.js';

export class AddUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            name: "",
            accessLevel: "Employee",
            addingUser: false,
            addingUserFailed: false,
            phoneNumber: "",
            email: ""
        };

        this.addUser = this.addUser.bind(this);
        this.addUserValid  = this.addUserValid.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    onCancel(){
        this.setState({
            username: "",
            password: "",
            name: "",
            phoneNumber: "",
            email: ""
        });
    }

    addUser(){
        this.setState({addingUser: true});
        axios.post('api/UserAdmin/AddUser', {
            Username: this.state.username,
            Password: this.state.password,
            Name: this.state.name,
            AccessLevel: AccessLevel[this.state.accessLevel],
            Email: this.state.email,
            PhoneNumber: this.state.phoneNumber
        })
        .then(response => {
            if (response.data){
                this.setState({ addingUser: false, addingUserFailed: false});
                this.onCancel();
                this.props.getUsers();
            }
        })
        .catch(e => {
            console.log(e);
            this.setState({ addingUser: false, addingUserFailed: true});
        });
    }

    addUserValid(){
        return !this.props.allUsers.map(x => x.username).includes(this.state.username) 
        && this.state.username.length > 0 && this.state.password.length > 0 && this.state.name.length > 0;
    }

    render() {
        return (
            <div>
                <div style={{ marginLeft: "44px", marginTop: "20px" }}>
                    <p style={{ display: "inline", verticalAlign: "top" }}>Name: </p>
                    <input style={{ width: "300px", height: "30px", marginBottom: "20px" }}
                        value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })}
                        disabled={this.state.addingUser} />
                </div>
                <div style={{ marginLeft: "17px" }}>
                    <p style={{ display: "inline", verticalAlign: "top" }}>Username: </p>
                    <input style={{ width: "300px", height: "30px", marginBottom: "20px" }}
                        value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })}
                        disabled={this.state.addingUser} />
                </div>
                <div style={{marginLeft: "20px"}}>
                    <p style={{ display: "inline", verticalAlign: "top" }}>Password: </p>
                    <input type="password" style={{ width: "300px", height: "30px" }} value={this.state.password}
                        onChange={(e) => this.setState({ password: e.target.value })}
                        disabled={this.state.addingUser} />
                </div>
                <div style={{ marginLeft: "44px", marginTop: "20px" }}>
                    <p style={{ display: "inline", verticalAlign: "top" }}>Email: </p>
                    <input style={{ width: "300px", height: "30px", marginBottom: "20px" }}
                        value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })}
                        disabled={this.state.addingUser} />
                </div>
                <div style={{ marginLeft: "44px", marginTop: "20px" }}>
                    <p style={{ display: "inline", verticalAlign: "top" }}>Phone: </p>
                    <input style={{ width: "300px", height: "30px", marginBottom: "20px" }}
                        value={this.state.phoneNumber} type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" onChange={(e) => this.setState({ phoneNumber: e.target.value })}
                        disabled={this.state.addingUser} />
                    <span style={{marginLeft: "20px"}}>Format: 123-456-7890</span>
                </div>
                <div style={{marginTop: "20px" }}>
                    <p style={{ display: "inline", verticalAlign: "top" }}>Access Level: </p>
                    <select
                        onChange={(e) => this.setState({ accessLevel: e.target.value })}
                        disabled={this.state.addingUser}>
                        <option value="Employee">
                            Employee
                        </option>
                        <option value="Manager">
                            Manager
                        </option>
                        <option value="Admin">
                            Admin
                        </option>
                    </select>
                </div>
                <div style={{ marginLeft: "90px", width: "300px" }}>
                    <button type="button" className="btn btn-secondary"
                        onClick={this.onCancel}
                        style={{ marginTop: "20px", width: "100px" }}
                        disabled={this.state.addingUser}>
                        Cancel
                    </button>
                    {!this.state.addingUser
                        ? <button type="button" className="btn btn-secondary"
                            onClick={this.addUser}
                            disabled={!this.addUserValid()}
                            style={{ marginTop: "20px", width: "100px", float: "right" }}>
                            Save
                    </button>
                        : <p style={{ float: "right", marginTop: "10px" }}><em>Loading...</em></p>}
                    <br />
                    {this.state.addingUserFailed &&
                        <p style={{ marginTop: "10px", color: "#c90000" }}>Failed to add user. Please try again.</p>}
                    {this.props.allUsers.map(x => x.username).includes(this.state.username) &&
                        <p style={{ marginTop: "10px", color: "#c90000" }}>Username already taken. Please choose another.</p>}
                </div>
            </div>
        );
    }
}