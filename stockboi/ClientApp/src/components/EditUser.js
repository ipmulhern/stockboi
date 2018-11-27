import React from 'react';
import axios from 'axios';
import { AccessLevel } from '../Enums/AccessLevel.js';
import { Typeahead } from './Typeahead.js';

export class EditUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedUser: null,
            username: "",
            password: "",
            name: "",
            accessLevel: "Employee",
            addingUser: false,
            addingUserFailed: false,
            valid: false,
            typeaheadKey: 1
        };

        this.addUser = this.addUser.bind(this);
        this.addUserValid = this.addUserValid.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onValid = this.onValid.bind(this);
    }

    onCancel() {
        this.setState({
            username: "",
            password: "",
            name: "",
            typeaheadKey: this.state.typeaheadKey + 1,
            valid: false
        });
    }

    addUser() {
        this.setState({ addingUser: true });
        axios.post('api/UserAdmin/SaveUser', {
            Username: this.state.username,
            Password: this.state.password,
            Name: this.state.name,
            AccessLevel: AccessLevel[this.state.accessLevel],
            employeeId: this.state.selectedUser.employeeId
        })
            .then(response => {
                if (response.data) {
                    this.setState({ addingUser: false, addingUserFailed: false });
                    this.onCancel();
                    this.props.getUsers();
                }
            })
            .catch(e => {
                console.log(e);
                this.setState({ addingUser: false, addingUserFailed: true });
            });
    }

    addUserValid() {
        let usernameUnique = !this.props.allUsers
            .map(x => x.username === this.state.selectedUser.username ? "" : x.username)
            .includes(this.state.username);

        return usernameUnique && this.state.username.length > 0 
        && this.state.password.length > 0 && this.state.name.length > 0;
    }

    onValid(user) {
        this.setState({
            selectedUser: user,
            valid: true,
            username: user.username,
            password: user.password,
            name: user.name,
            accessLevel: AccessLevel[user.accessLevel]
        });
    }

    render() {
        let usernameTaken = false;
        if (this.state.selectedUser){
            usernameTaken = this.props.allUsers
                .map(x => x.username === this.state.selectedUser.username ? "" : x.username)
                .includes(this.state.username)
            && this.state.username.length > 0;
        }
        

        return (
            <div>
                <div style={{marginLeft: "63px"}}>  
                    <Typeahead id={'EditTypeahead'} key={this.state.typeaheadKey} allItemChoices={this.props.allUsers}                            invalid={() => this.setState({ valid: false })}
                        valid={this.onValid}
                        disabled={this.state.addingUser}
                        defaultText={'Enter username.'}
                        displayProperty={'username'}
                        primarySearchProperty={'username'}
                    />
                </div>
                {!this.state.valid
                    ? <div></div>
                    : <div>
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
                        <div style={{ marginLeft: "20px" }}>
                            <p style={{ display: "inline", verticalAlign: "top" }}>Password: </p>
                            <input style={{ width: "300px", height: "30px" }} value={this.state.password}
                                onChange={(e) => this.setState({ password: e.target.value })}
                                disabled={this.state.addingUser} />
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <p style={{ display: "inline", verticalAlign: "top" }}>Access Level: </p>
                            <select
                                onChange={(e) => this.setState({ accessLevel: e.target.value })}
                                disabled={this.state.addingUser}
                                value={this.state.accessLevel}>
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
                            {usernameTaken &&
                                <p style={{ marginTop: "10px", color: "#c90000" }}>Username already taken. Please choose another.</p>}
                        </div>
                    </div>}
            </div>
        );
    }
}