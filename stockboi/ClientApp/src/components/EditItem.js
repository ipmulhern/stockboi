import React from 'react';
import {Typeahead} from './Typeahead.js';
import axios from 'axios';

export class EditItem extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            itemID: 0,
            valid: false,
            editName: "",
            editUPC: "",
            editDescription: "",
            editItemType: "",
            typeaheadKey: 1,
            editUPCRepeating: false,
            savingItem: false,
            savingItemFailed: false
        };

        this.onValid = this.onValid.bind(this);
        this.editItemValid = this.editItemValid.bind(this);
        this.onEditCancel = this.onEditCancel.bind(this);
        this.onEditSave = this.onEditSave.bind(this);
    }

    onValid(item){
        this.setState({
            valid: true,
            editUPC: item.upc,
            editName: item.productName,
            editDescription: item.productDescription,
            editItemType: item.itemType,
            itemID: item.itemID
        });
    }

    editItemValid(){
        let index = this.props.allItems.findIndex(item => 
            item.productName.toLowerCase() === this.state.editName.toLowerCase());
        let nameNotRepeating = index === -1 || 
            (index !== -1 
                && this.props.allItems[index].upc.toLowerCase() === this.state.editUPC.toLowerCase());
        if (this.state.editNameRepeating === nameNotRepeating){
            this.state.editNameRepeating = !nameNotRepeating;
        }
        return nameNotRepeating && this.state.editName.length > 0 && this.state.valid 
        && this.state.editDescription.length > 0;
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
        this.setState({savingItem: true});
        axios.post('api/StockAdmin/EditItem',
            {
                UPC: this.state.editUPC,
                ProductDescription: this.state.editDescription,
                ProductName: this.state.editName,
                ItemID: this.state.itemID
            }
        )
        .then(response => {
            this.setState({savingItem: false, savingItemFailed: false}, this.onEditCancel);
            this.props.getAllItems();
        })
        .catch(e =>{
            console.log(e);
            this.setState({savingItem: false, savingItemFailed: true});
        })
    }

    render(){
        return(
            <div>
                <div style={{marginLeft: "78px", width: "300px", height: "30px", marginBottom: "40px"}}>
                    <Typeahead id={'EditTypeahead'} key={this.state.typeaheadKey} allItemChoices={this.props.allItems}
                        invalid={() => this.setState({valid: false})}
                        valid={this.onValid}
                        disabled={this.state.savingItem}
                    />
                </div>
                {this.state.valid &&
                    <div>
                        <div style={{ marginLeft: "40px"}}>
                            <p id="editName" style={{display: "inline", verticalAlign: "top"}}>Name: </p>
                            <input style={{width: "300px", height:"30px", marginBottom: "20px"}}
                                value={this.state.editName} onChange={(e) => this.setState({editName: e.target.value})}
                                disabled={this.state.savingItem}/>
                        </div>
                        <div> 
                            <p id="editDescription"
                            style={{display: "inline", verticalAlign: "top"}}>
                                Description: </p>
                            <textarea style={{width: "300px", height:"120px"}} value={this.state.editDescription}
                                onChange={(e) => this.setState({editDescription: e.target.value})}
                                disabled={this.state.savingItem}/>
                        </div>
                        <div style={{marginLeft: "75px", width: "300px"}}>
                            <button type="button" className="btn btn-secondary" 
                                onClick={this.onEditCancel} 
                                style={{marginTop: "20px", width: "100px"}}
                                disabled={this.state.savingItem}>
                                Cancel
                            </button>
                            {!this.state.savingItem
                            ?<button type="button" className="btn btn-secondary" 
                                onClick={this.onEditSave}
                                disabled={!this.editItemValid()} 
                                style={{marginTop: "20px", width: "100px", float: "right"}}>
                                Save
                            </button>
                            :<p style={{float: "right", marginTop: "10px" }}><em>Loading...</em></p>}
                            <br/>
                            {this.props.renderErrorMessage(false)}
                            {this.state.savingItemFailed &&
                               <p style={{marginTop: "10px", color: "#c90000"}}>Failed to add item. Please try again.</p>}
                        </div>
                    </div>
                }
            </div>
        );
    }
}