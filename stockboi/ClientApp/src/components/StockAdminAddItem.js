import React from 'react';
import axios from 'axios';

export class StockAdminAddItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            UPC: "",
            description: "",
            itemType: "Produce",
            addNameRepeating: false,
            addUPCRepeating: false,
            addingItem: false,
            addingItemFailed: false
        };

        this.addItemValid = this.addItemValid.bind(this);
        this.onAddCancel = this.onAddCancel.bind(this);
        this.onAddSave = this.onAddSave.bind(this);
    }

    onAddCancel() {
        this.setState({
            UPC: "",
            description: "",
            itemType: "",
            name: ""
        });
    }

    onAddSave() {
        this.setState({ addingItem: true });
        axios.post('api/StockAdmin/AddItem',
            {
                UPC: this.state.UPC,
                ProductDescription: this.state.description,
                ProductName: this.state.name,
                ItemType: this.state.itemType
            })
            .then(response => {
                this.setState({ addingItem: true, addingItemFailed: false }, this.onAddCancel);
                this.props.getAllItems();
            })
            .catch(e => {
                console.log(e);
                this.setState({ addingItemFailed: true });
            });
    }

    addItemValid() {
        let index = this.props.allItems.findIndex(item =>
            item.upc === this.state.UPC);
        let UPCNotRepeating = index === -1;

        index = this.props.allItems.findIndex(item =>
            item.productName.toLowerCase() === this.state.name.toLowerCase());
        let nameNotRepeating = index === -1;

        if (this.state.addNameRepeating === nameNotRepeating || this.state.addUPCRepeating === UPCNotRepeating) {
            this.state.addNameRepeating = !nameNotRepeating;
            this.state.addUPCRepeating = !UPCNotRepeating;
        }
        return UPCNotRepeating && this.state.UPC.length > 0 && nameNotRepeating
            && this.state.name.length > 0 && this.state.description.length > 0
            && this.state.UPC.match(/^[0-9]+$/) != null && this.UPC.length > 11 && this.UPC.length < 15;
    }

    render() {
        return (
            <div>
                <div style={{ marginLeft: "2px", marginTop: "20px" }}>
                    <p style={{ display: "inline", verticalAlign: "top" }}>Item Name: </p>
                    <input style={{ width: "300px", height: "30px", marginBottom: "20px" }}
                        value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })}
                        disabled={this.state.addingItem} />
                </div>
                <div style={{ marginLeft: "40px" }}>
                    <p style={{ display: "inline", verticalAlign: "top" }}>UPC: </p>
                    <input style={{ width: "300px", height: "30px", marginBottom: "20px" }}
                        value={this.state.UPC} onChange={(e) => this.setState({ UPC: e.target.value })}
                        disabled={this.state.addingItem} />
                </div>
                <div>
                    <p style={{ display: "inline", verticalAlign: "top" }}>Description: </p>
                    <textarea style={{ width: "300px", height: "120px" }} value={this.state.description}
                        onChange={(e) => this.setState({ description: e.target.value })}
                        disabled={this.state.addingItem} />
                </div>
                <div style={{ marginLeft: "10px", marginTop: "20px" }}>
                    <p style={{ display: "inline", verticalAlign: "top" }}>Item type: </p>
                    <select
                        onChange={(e) => this.setState({ itemType: e.target.value })}
                        disabled={this.state.addingItem}>
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
                <div style={{ marginLeft: "75px", width: "300px" }}>
                    <button type="button" className="btn btn-secondary"
                        onClick={this.onAddCancel}
                        style={{ marginTop: "20px", width: "100px" }}
                        disabled={this.state.addingItem}>
                        Cancel
                    </button>
                    {!this.state.addingItem
                        ? <button type="button" className="btn btn-secondary"
                            onClick={this.onAddSave}
                            disabled={!this.addItemValid()}
                            style={{ marginTop: "20px", width: "100px", float: "right" }}>
                            Save
                    </button>
                        : <p style={{ float: "right" }}><em>Loading...</em></p>}
                    <br />
                    {this.props.renderErrorMessage(true)}
                    {this.state.addingItemFailed &&
                        <p style={{ marginTop: "10px", color: "#c90000" }}>Failed to add item. Please try again.</p>}
                </div>
            </div>
        );
    }
}