import React from 'react';

export class Typeahead extends React.Component {
    constructor(props){
        super(props);

        this.state={
            selected: [],
            valid: false
        };
        
        this.handleTyping = this.handleTyping.bind(this);
        this.listItemClick = this.listItemClick.bind(this);
    }

    handleTyping(e){
        let selected= this.props.allItemChoices.filter(item => {
            if (e.target.value === "") return false;
            return item.upc.toString() === e.target.value ||
            item.productName.toLowerCase().indexOf(e.target.value.toLowerCase()) === 0;
        });    
        let valid = selected.length === 1 && 
            e.target.value.toLowerCase() === selected[0].productName.toLowerCase();

        this.setState({
            selected: valid ? [] : selected,
            valid: valid 
         });

         if(valid){
             this.props.valid(selected[0]);
         }
         else {
             this.props.invalid();
         }
    }

    listItemClick(e){
        document.getElementById(this.props.id ? this.props.id : "typeaheadInput").value = e.target.innerHTML;
        this.setState({
            selected: [],
            valid: true
        });

        this.props.valid(this.props.allItemChoices.find(x => x.productName === e.target.innerHTML));
    }

    renderChoices(){
        let itemsDisplayed = 0;
        return (
            <ul className="typeahead-dropdown typeahead-shadow">
                {this.state.selected.map(item =>{
                    if (itemsDisplayed >= 5){
                        return null;
                    }
                    else {
                        ++itemsDisplayed;
                        return (
                            <li className="typeahead-dropdown" 
                            onClick={this.listItemClick} 
                            key={item.productName}>
                                {item.productName}
                            </li>
                        );
                    }
                })}
            </ul>
        );
    }

    render(){
        return (
            <div>
                <input 
                    id={this.props.id ? this.props.id : "typeaheadInput"}
                    onChange={this.handleTyping} 
                    style={{width: "300px", height: "30px", marginTop: "20px"}}
                    placeholder="Enter Item Name or UPC Number"
                    disabled={this.props.disabled}
                />
                {this.renderChoices()}
            </div>
        );
    }
}