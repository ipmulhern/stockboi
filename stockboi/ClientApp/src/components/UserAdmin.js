import React from 'react';
import axios from 'axios';
import { Tabs, Tab } from "react-bootstrap";
import { AddUser } from './AddUser.js';
import { EditUser } from './EditUser.js';
import { RemoveUser } from './RemoveUser.js';

export class UserAdmin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            allUsers: []
        };

        this.getUsers = this.getUsers.bind(this);
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers() {
        this.setState({ loading: true });

        axios.get('api/UserAdmin/GetAllUsers')
            .then(response => {
                this.setState({ loading: false, allUsers: response.data });
            })
            .catch(e => {
                console.log(e);
                this.getUsers();
            });
    }

    render() {
        return (
            this.state.loading
                ? <p><em>Loading...</em></p>
                : <div className="content">
                    <Tabs id="userAdminTabs" defaultActiveKey={1}>
                        <Tab eventKey={1} title="Add User">
                            <AddUser allUsers={this.state.allUsers} getUsers={this.getUsers} />
                        </Tab>
                        <Tab eventKey={2} title="Edit User">
                            <EditUser allUsers={this.state.allUsers} getUsers={this.getUsers} />
                        </Tab>
                        <Tab eventKey={3} title="Remove User">
                            <RemoveUser allUsers={this.state.allUsers} getUsers={this.getUsers} />
                        </Tab>
                    </Tabs>
                </div>
        );
    }
}