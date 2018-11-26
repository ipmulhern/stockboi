import React from 'react';
import { Typeahead } from './Typeahead.js';
import { formatDate } from '../helpers/DateFormatHelper.js';
import axios from 'axios';

export class DamageItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loadingBatches: false,
            typeaheadKey: 1,
            itemSelected: null,
            batches: [],
            batchSelected: null,
            valid: false, 
            amountDamaged: 0,
            saving: false,
            savingFailed: false
        };
        this.renderBatches = this.renderBatches.bind(this);
        this.onValid = this.onValid.bind(this);
        this.batchClicked = this.batchClicked.bind(this);
        this.getBatches = this.getBatches.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    onValid(item) {
        this.setState({ valid: true, itemSelected: item}, this.getBatches);
    }

    batchClicked(batch) {
        console.log(this.state.batches);
        console.log(batch);
        this.setState({
            batchSelected: batch
        });
    }

    getBatches(){
        this.setState({loadingBatches: true})
        axios.post('api/StockAdmin/GetAllBatches', {Keyword: this.state.itemSelected.upc})
        .then(response =>{
            this.setState({batches: response.data, loadingBatches: false});
        })
        .catch(e => {
            console.log(e);
            this.getBatches();
        });
    }

    onSave(){
        this.state.batchSelected.weight = Math.max(this.state.batchSelected.weight - this.state.amountDamaged, 0);
        this.state.batchSelected.units = Math.round(Math.max(this.state.batchSelected.units - this.state.amountDamaged, 0));
        this.state.batchSelected.damaged += this.state.amountDamaged;
        this.setState({saving: true, batchSeleced: this.state.batchSelected});
        axios.post('api/StockAdmin/SaveBatch', this.state.batchSelected)
        .then(response => {
            this.setState({saving: false, savingFailed: false}, this.onCancel);
        })
        .catch(e => {
            console.log(e);
            this.setState({savingFailed: true, saving: false});
        });
    }

    onCancel(){
        this.setState({
            typeaheadKey: this.state.typeaheadKey + 1,
            batchSelected: null,
            valid: false, 
            amountDamaged: 0
        })
    }

    saveValid(){
        return this.state.amountDamaged.match(/^[0-9]+$/);
    }

    renderBatches() {
        return (
            this.state.loadingBatches
                ? <p><em>Loading...</em></p>
                : <div>
                    <p style={{fontWeight: "bold"}}>Select batch: </p>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>
                                    Batch Number
                                </th>
                                <th>
                                    Date Received
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.batches.map((batch) =>
                                <tr className={"past-batches" + (this.state.batchSelected
                                    && this.state.batchSelected.batchNumber == batch.batchNumber ? "-selected" : "")}
                                    key={batch.batchNumber}
                                    onClick={() => this.batchClicked(batch)}>
                                    <td>{batch.batchNumber}</td>
                                    <td>{formatDate(batch.dateReceived)}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {this.state.batchSelected
                    ?<div>
                        <p style={{ display: "inline", verticalAlign: "top" }}>Enter amount damaged: </p>
                        <input style={{ width: "300px", height: "30px", marginBottom: "20px" }}
                        onChange={(e) => this.setState({amountDamaged: e.target.value})}/>
                        <button type="button" className="btn btn-secondary"
                            onClick={this.onCancel}
                            style={{ marginTop: "20px", width: "100px" }}
                            disabled={this.state.saving}>
                            Cancel
                        </button>
                    {!this.state.saving
                        ? <button type="button" className="btn btn-secondary"
                                onClick={this.onSave}
                                style={{ marginTop: "20px", width: "100px", float: "right" }}>
                                Save
                        </button>
                        :<p style={{float: "right", marginTop: "10px" }}><em>Loading...</em></p>}
                    </div>
                    :<div></div>}
                     {this.state.savingFailed &&
                        <p style={{ marginTop: "10px", color: "#c90000" }}>Failed to remove items. Please try again.</p>}
                </div>
        );
    }

    render() {
        return (
            <div>
                <div style={{ marginLeft: "54px", marginBottom: "40px", width: "324px" }}>
                    <Typeahead key={this.state.typeaheadKey} allItemChoices={this.props.allItems}
                        invalid={() => this.setState({ valid: false })}
                        valid={this.onValid}
                        defaultText={'Enter item name or UPC.'}
                        displayProperty={'productName'}
                        primarySearchProperty={'productName'}
                        secondarySearchProperty={'upc'}
                    />
                    {this.state.valid && this.renderBatches()}
                </div>
            </div>
        );
    }
}