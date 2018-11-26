import React from 'react';
import axios from 'axios';
import { Typeahead } from './Typeahead.js';

export class RemoveUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedUser: null,
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
        axios.post('api/UserAdmin/RemoveUser', this.state.selectedUser)
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
        return this.state.selectedUser;
    }

    onValid(user) {
        this.setState({
            selectedUser: user,
            valid: true,
        });
    }

    render() {
        return (
            <div>
                <div style={{marginLeft: "63px"}}>  
                    <Typeahead id={'RemoveTypeahead'} key={this.state.typeaheadKey} allItemChoices={this.props.allUsers}                            invalid={() => this.setState({ valid: false })}
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
                                    Remove
                                </button>
                                : <p style={{ float: "right", marginTop: "10px" }}><em>Loading...</em></p>}
                            <br />
                            {this.state.addingUserFailed &&
                                <p style={{ marginTop: "10px", color: "#c90000" }}>Failed to remove user. Please try again.</p>}
                        </div>
                    </div>}
            </div>
        );
    }
}