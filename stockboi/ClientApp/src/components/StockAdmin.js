import React from 'react';
import axios from 'axios';
import {Tabs, Tab} from "react-bootstrap";
import {EditItem} from './EditItem.js';
import {StockAdminAddItem} from './StockAdminAddItem.js';
import {DamageItem} from './DamageItem.js';

export class StockAdmin extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            allItems: [],
            loading: true
        };

        this.renderErrorMessage = this.renderErrorMessage.bind(this);
        this.getAllItems = this.getAllItems.bind(this);
    }

    componentDidMount(){
        this.getAllItems();
    }

    getAllItems(){
        this.setState({loading: true});
        axios.get('api/StockAdmin/GetAllItems')
            .then(response =>{
                this.setState({loading: false, allItems: response.data});
            });
    }

    renderErrorMessage(add){
        let UPCRepeating = add ? this.state.addUPCRepeating : this.state.editUPCRepeating;
        let nameRepeating = add ? this.state.addNameRepeating : this.state.editNameRepeating;

        if (UPCRepeating || nameRepeating){
            let errorString = nameRepeating ? "Name" : "UPC";
            if (nameRepeating && UPCRepeating) errorString.concat(" and UPC");
            return(<p style={{marginTop: "10px", color: "#c90000"}}>{errorString} already taken.</p>);
        } 
    }

   render(){
       return(
           this.state.loading
            ?<p><em>Loading...</em></p>
            :<div className="content">
                <Tabs id="stockAdminTabs" defaultActiveKey={1}>
                    <Tab eventKey={1} title="Add Item">
                        <StockAdminAddItem allItems={this.state.allItems} 
                            renderErrorMessage={this.renderErrorMessage}
                            getAllItems ={this.getAllItems}/>
                    </Tab>
                    <Tab eventKey={2} title="Damage Item">
                        <DamageItem allItems={this.state.allItems}/>
                    </Tab>
                    <Tab eventKey={3} title="Edit Stock">
                        <EditItem allItems={this.state.allItems} 
                            renderErrorMessage={this.renderErrorMessage}
                            getAllItems ={this.getAllItems}/>
                    </Tab>
                </Tabs> 
           </div>
       )
   }
} 