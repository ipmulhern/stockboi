import React from 'react';
import axios from 'axios';
import {Tabs, Tab} from "react-bootstrap";
import {Typeahead} from './Typeahead.js';

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
            valid: false,
            editName: "",
            editUPC: "",
            editDescription: "",
            editItemType: "",
            typeaheadKey: 1,
            name: "",
            UPC: "",
            description: "",
            itemType: "",
            addNameRepeating: false,
            addUPCRepeating: false,
            editUPCRepeating: false
        };

        this.renderEditStock = this.renderEditStock.bind(this);
        this.renderAddItem = this.renderAddItem.bind(this);
        this.onValid = this.onValid.bind(this);
        this.editItemValid = this.editItemValid.bind(this);
        this.onEditCancel = this.onEditCancel.bind(this);
        this.onEditSave = this.onEditSave.bind(this);
        this.renderErrorMessage = this.renderErrorMessage.bind(this);
        this.addItemValid = this.addItemValid.bind(this);
        this.onAddCancel = this.onAddCancel.bind(this);
        this.onAddSave = this.onAddSave.bind(this);
        this.renderDamageItem = this.renderDamageItem.bind(this);
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

    onValid(item){
        this.setState({
            valid: true,
            editUPC: item.UPC,
            editName: item.ItemName,
            editDescription: item.Description,
            editItemType: item.ItemType
        });
    }

    editItemValid(){
        let index = this.state.allItems.findIndex(item => 
            item.UPC.toLowerCase() === this.state.editUPC.toLowerCase());
        let UPCNotRepeating = index === -1 || 
            (index !== -1 
                && this.state.allItems[index].ItemName.toLowerCase() === this.state.editName.toLowerCase());
        if (this.state.editUPCRepeating === UPCNotRepeating){
            this.state.editUPCRepeating = !UPCNotRepeating;
        }
        return UPCNotRepeating && this.state.editUPC.length > 0 && this.state.valid && this.state.editDescription.length > 0;
    }

    onEditCancel(){
        this.setState({
            valid: false,
            editUPC: "",
            editDescription: "",
            editItemType: "",
            editName: "",
            typeaheadKey: this.state.typeaheadKey + 1
        });
    }
    
    onEditSave(){
        //save item
        console.log(this.state);
        this.onEditCancel();
    }

    renderEditStock(){
        return(
            <div>
                <div style={{marginLeft: "78px", width: "300px", height: "30px", marginBottom: "40px"}}>
                    <Typeahead key={this.state.typeaheadKey} allItemChoices={this.state.allItems}
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
                        <div style={{marginLeft: "10px", marginTop: "20px"}}>
                            <p style={{display: "inline", verticalAlign: "top"}}>Item type: </p>
                            <select 
                            onChange={(e) => this.setState({editItemType: e.target.value})}
                            defaultValue={this.state.editItemType}>
                                <option value="Produce">
                                    Produce
                                </option>
                                <option value="Perishable">
                                    Perishable
                                </option>
                                <option value="NonPerishable">
                                    Non Perishable
                                </option>
                            </select>
                        </div>
                        <div style={{marginLeft: "75px", width: "300px"}}>
                            <button type="button" className="btn btn-secondary" 
                                onClick={this.onEditCancel} 
                                style={{marginTop: "20px", width: "100px"}}>
                                Cancel
                            </button>
                            <button type="button" className="btn btn-secondary" 
                                onClick={this.onEditSave}
                                disabled={!this.editItemValid()} 
                                style={{marginTop: "20px", width: "100px", float: "right"}}>
                                Save
                            </button>
                            <br/>
                            {this.renderErrorMessage(false)}
                        </div>
                    </div>
                }
            </div>
        );
    }

    onAddCancel(){
        this.setState({
            UPC: "",
            description: "",
            itemType: "",
            name: ""
        });
    }
    
    onAddSave(){
        //save item
        console.log(this.state);
        this.onAddCancel();
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

    addItemValid(){
        let index = this.state.allItems.findIndex(item => 
            item.UPC.toLowerCase() === this.state.UPC.toLowerCase());
        let UPCNotRepeating = index === -1;
        
        index = this.state.allItems.findIndex(item => 
            item.ItemName.toLowerCase() === this.state.name.toLowerCase());
        let nameNotRepeating = index === -1;

        if (this.state.addNameRepeating === nameNotRepeating || this.state.addUPCRepeating === UPCNotRepeating){
            this.state.addNameRepeating = !nameNotRepeating;
            this.state.addUPCRepeating = !UPCNotRepeating;
        }
        return UPCNotRepeating && this.state.UPC.length > 0 && nameNotRepeating 
            && this.state.name.length > 0 && this.state.description.length > 0;
    }

    renderAddItem(){
        return(
            <div>
                <div style={{ marginLeft: "2px", marginTop: "20px"}}> 
                    <p style={{display: "inline", verticalAlign: "top"}}>Item Name: </p>
                    <input style={{width: "300px", height:"30px", marginBottom: "20px"}}
                    value={this.state.name} onChange={(e) => this.setState({name: e.target.value})}/>                    
                </div>    
                <div style={{ marginLeft: "40px"}}> 
                    <p style={{display: "inline", verticalAlign: "top"}}>UPC: </p>
                    <input style={{width: "300px", height:"30px", marginBottom: "20px"}}
                    value={this.state.UPC} onChange={(e) => this.setState({UPC: e.target.value})}/>                    
                </div>    
                <div>
                    <p style={{display: "inline", verticalAlign: "top"}}>Description: </p>
                    <textarea style={{width: "300px", height:"120px"}} value={this.state.description}
                    onChange={(e) => this.setState({description: e.target.value})}/>
                </div>
                <div style={{marginLeft: "10px", marginTop: "20px"}}>
                    <p style={{display: "inline", verticalAlign: "top"}}>Item type: </p>
                    <select 
                    onChange={(e) => this.setState({itemType: e.target.value})}>
                        <option value="Produce">
                            Produce
                        </option>
                        <option value="Perishable">
                            Perishable
                        </option>
                        <option value="NonPerishable">
                            Non Perishable
                        </option>
                    </select>
                </div>
                <div style={{marginLeft: "75px", width: "300px"}}>
                    <button type="button" className="btn btn-secondary" 
                        onClick={this.onAddCancel} 
                        style={{marginTop: "20px", width: "100px"}}>
                            Cancel
                    </button>
                    <button type="button" className="btn btn-secondary" 
                    onClick={this.onAddSave}
                    disabled={!this.addItemValid()} 
                    style={{marginTop: "20px", width: "100px", float: "right"}}>
                        Save
                    </button>
                    <br/>
                    {this.renderErrorMessage(true)}
                </div>
            </div>
        );
    }

   render(){
       return(
           <div className="content">
                <Tabs id="stockAdminTabs" defaultActiveKey={1}>
                    <Tab eventKey={1} title="Add Item">
                        {this.renderAddItem()}
                    </Tab>
                    <Tab eventKey={2} title="Damage Item">
                        {this.renderDamageItem()}
                    </Tab>
                    <Tab eventKey={3} title="Edit Stock">
                        {this.renderEditStock()}
                    </Tab>
                </Tabs> 
           </div>
       )
   }
} 