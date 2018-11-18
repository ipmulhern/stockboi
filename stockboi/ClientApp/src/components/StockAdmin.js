import React from 'react';
import axios from 'axios';
import {Tabs, Tab} from "react-bootstrap";
import {Typeahead} from './Typeahead.js';
import {EditItem} from './EditItem.js';
import {StockAdminAddItem} from './StockAdminAddItem.js';

const testItems = [
    {ItemName: "Milk Gallons", ItemType: "Perishable", UPC: "1254", Description: "milk from an animal and especially a cow used as food by people"},
    {ItemName: "Apples", ItemType: "Produce", UPC: "5432", Description: "the fleshy, usually rounded red, yellow, or green edible pome fruit of a usually cultivated tree (genus Malus) of the rose family"},
    {ItemName: "Lays Potato Chips", ItemType: "Perishable", UPC: "2452", Description: "a thin slice of white potato that has been cooked until crisp and then usually salted"},
    {ItemName: "Mangos", ItemType: "Produce", UPC: "5436", Description: "a tropical usually large ovoid or oblong fruit with a firm yellowish-red skin, hard central stone, and juicy aromatic pulp"}
  ];

export class StockAdmin extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            allItems: testItems,
            loading: true
        };

        this.renderErrorMessage = this.renderErrorMessage.bind(this);
        this.renderDamageItem = this.renderDamageItem.bind(this);
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

    renderDamageItem(){
        return(
            <div>
                <div style={{marginLeft: "78px", width: "300px", height: "30px", marginBottom: "40px"}}>
                    <Typeahead key={this.state.typeaheadKey} allItemChoices={this.state.allItems}
                        invalid={() => this.setState({valid: false})}
                        valid={this.onValid}
                    />
                </div>
            </div>
        );    
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
                        {this.renderDamageItem()}
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