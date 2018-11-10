import React from 'react';
import axios from 'axios';
import {Tabs, Tab} from "react-bootstrap";
import {Typeahead} from './Typeahead.js';

const testItems = [
    {ItemName: "Milk Gallons", UPC: 1254, Description: "milk from an animal and especially a cow used as food by people"},
    {ItemName: "Apples", UPC: 5432, Description: "the fleshy, usually rounded red, yellow, or green edible pome fruit of a usually cultivated tree (genus Malus) of the rose family"},
    {ItemName: "Lays Potato Chips", UPC: 2452, Description: "a thin slice of white potato that has been cooked until crisp and then usually salted"},
    {ItemName: "Mangos", UPC: 5436, Description: "a tropical usually large ovoid or oblong fruit with a firm yellowish-red skin, hard central stone, and juicy aromatic pulp"}
  ];

export class StockAdmin extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            allItems: testItems,
            valid: false,
            editName: "",
            editUPC: "",
            editDescription: "",
            name: "",
            UPC: "",
            description: ""
        };

        this.renderEditStock = this.renderEditStock.bind(this);
        this.renderAddItem = this.renderAddItem.bind(this);
        this.onValid = this.onValid.bind(this);
        this.editItemValid = this.editItemValid.bind(this);
    }

    onValid(item){
        this.setState({
            valid: true,
            editUPC: item.UPC,
            editDescription: item.Description
        });
    }

    editItemValid(){
        let index = this.state.allItems.findIndex(item => item.UPC === this.state.editUPC);
        let UPCNotRepeating = index !== -1 || this.state.allItems[index].ItemName === this.state.editName;

        index = this.state.allItems.findIndex(item => item.Name === this.state.editName);
        let nameNotRepeating = index !== -1 || this.state.allItems[index].UPC === this.state.editUPC;

        return UPCNotRepeating && nameNotRepeating && this.state.valid && editDescription.length > 0;
    }
    
    renderEditStock(){
        return(
            <div>
                <div style={{marginLeft: "78px", width: "300px", height: "30px", marginBottom: "40px"}}>
                    <Typeahead allItemChoices={this.state.allItems}
                        invalid={() => this.setState({valid: false})}
                        valid={this.onValid}
                    />
                </div>
                {this.state.valid &&
                    <div>
                        <div style={{ marginLeft: "40px"}}>
                            <p id="editUPC" style={{display: "inline", verticalAlign: "top"}}>UPC: </p>
                            <input style={{width: "300px", height:"30px", marginBottom: "20px"}}
                                value={this.state.editUPC} onChange={(e) => this.setState({editUPC: e.target.value})}
                            />
                        </div>
                        <div> 
                            <p id="editDescription"
                            style={{display: "inline", verticalAlign: "top"}}>
                                Description: </p>
                            <textarea style={{width: "300px", height:"120px"}} value={this.state.editDescription}
                                onChange={(e) => this.setState({editDescription: e.target.value})}/>
                        </div>
                        <div>
                            <p>Item type: </p>
                            <select>
                                <option value=""></option>
                            </select>
                        </div>
                    </div>
                }
            </div>
        );
    }

    renderAddItem(){
        return(
            <div>
                <div style={{ marginLeft: "2px", marginTop: "20px"}}> 
                    <p style={{display: "inline", verticalAlign: "top"}}>Item Name: </p>
                    <input style={{width: "300px", height:"30px", marginBottom: "20px"}}
                    onChange={(e) => this.setState({name: e.target.value})}/>                    
                </div>    
                <div style={{ marginLeft: "40px"}}> 
                    <p style={{display: "inline", verticalAlign: "top"}}>UPC: </p>
                    <input style={{width: "300px", height:"30px", marginBottom: "20px"}}
                    onChange={(e) => this.setState({UPC: e.target.value})}/>                    
                </div>    
                <div>
                    <p style={{display: "inline", verticalAlign: "top"}}>Description: </p>
                    <textarea style={{width: "300px", height:"120px"}}
                    onChange={(e) => this.setState({description: e.target.value})}/>
                </div>
            </div>
        );
    }

   render(){
       return(
           <div className="content">
                <Tabs defaultActiveKey={1}>
                    <Tab eventKey={1} title="Add Item">
                        {this.renderAddItem()}
                    </Tab>
                    <Tab eventKey={2} title="Damage Item">
                    </Tab>
                    <Tab eventKey={3} title="Edit Stock">
                        {this.renderEditStock()}
                    </Tab>
                </Tabs> 
           </div>
       )
   }
} 