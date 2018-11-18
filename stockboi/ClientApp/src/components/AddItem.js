import React from 'react';
import {Typeahead} from './Typeahead.js';

export class AddItem extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            typeaheadValid: false,
            selectedItem: {},
            amountType: "Weight",
            amount: 0,
            date: null
        };

        this.onInvalid = this.onInvalid.bind(this);
        this.onValid = this.onValid.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleAmount = this.handleAmount.bind(this);
        this.handleAmountType = this.handleAmountType.bind(this);
        this.returnItem = this.returnItem.bind(this);
    }

    onInvalid(){
        this.setState({typeaheadValid: false, selectedItem: {}});
    }

    onValid(item){
        this.setState({typeaheadValid: true, selectedItem: item});
    }

    handleDateChange(e){
        let newDate = null;
        let date = e.target.value.split('/');
        if (date.length === 3 && date[0].length === 2 && date[1].length === 2 && date[2].length === 4){
            let month = parseInt(date[0], 10) - 1;
            let day = parseInt(date[1], 10);
            let year = parseInt(date[2], 10);
            if (month < 12 && day <= new Date(year, month + 1, 0).getDate()){
                newDate = new Date(year, month, day);
            }
        }
        this.setState({date: newDate}, this.returnItem);
    }

    handleAmount(e){
        this.setState({amount: parseInt(e.target.value, 10)}, this.returnItem);
    }

    handleAmountType(e){
        this.setState({amountType: e.target.value}, this.returnItem);
    }

    returnItem(){
        let item = {
            UPC: this.state.selectedItem.upc,
            ItemName: this.state.selectedItem.productName,
            Expiration: this.state.date,
            DateReceived: new Date(),
            Weight: 0.0,
            Units: 0,
            Damaged: 0.0
        };

        item[this.state.amountType] = this.state.amount;

        this.props.newItem(item);
    }

    renderOtherInfo(){
        return(
            <div>
                <div style={{width: "260px", marginLeft:"auto", marginRight: "auto"}}>
                    <p style={{marginBottom: "0px" }}>Amount: </p>
                    <input onChange={this.handleAmount} className="amount"/> 
                    <select onChange={this.handleAmountType} className="amount">
                        <option value="Weight">Lbs</option>
                        <option value="Units">Units</option>
                    </select>
                    <p style={{marginBottom: "0px" }}>Expiration Date: </p>
                    <input placeholder="MM/DD/YYYY" onChange={this.handleDateChange}
                    style={{width: "260px", height: "30px", marginBottom: "20px"}}/> 
                </div>
            </div>
        );
    }

    render(){
        return(
            <div style={{width: "300px", marginLeft: "auto", marginRight: "auto"}}>
                <Typeahead allItemChoices={this.props.allItemChoices}
                    invalid={this.onInvalid}
                    valid={this.onValid}
                />
                {this.state.typeaheadValid? this.renderOtherInfo() : null}
            </div>    
            
        );
    }
}
