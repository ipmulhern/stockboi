import React, { Component } from 'react';
import {formatDate} from '../helpers/DateFormatHelper.js';
import axios from 'axios';
import {PageSelector} from './PageSelector.js';

export class CurrentStock extends Component {
  displayName = CurrentStock.name

  constructor(props) {
    super(props);
    this.state = { 
      foodItems: [], 
      loading: true, 
      searchText: "",
      sortButtonStyles: {
        ItemName: {cursor: "pointer", color: "black"},
        Count: {cursor: "pointer", color: "grey"},
        Damaged: {cursor: "pointer", color: "grey"},
        DateReceived: {cursor: "pointer", color: "grey"},
        Expiration: {cursor: "pointer", color: "grey"}
      },
      numberOfPages: 0,
      page: 1,
      sortBy: ""
    };

    this.getItems(1, "ItemName");

    this.getItems = this.getItems.bind(this);
    this.renderStockTable = this.renderStockTable.bind(this);   
  }

  getItems(page, sortBy){
    this.getSortButtonStyles(sortBy);
    axios.post('api/PerishableItem/GetAllItems', {
      NumberOfItemsPerPage: 50,
      PageSelected: page,
      SortBy: sortBy
    })
      .then(response => {
        this.setState({ loading: false, foodItems: response.data.data, numberOfPages: response.data.numberOfPages});
      });
  }

  getSortButtonStyles(sortBy){
    let sortButtonStyles = {
      ItemName: {cursor: "pointer", color: "grey"},
      Count: {cursor: "pointer", color: "grey"},
      Damaged: {cursor: "pointer", color: "grey"},
      DateReceived: {cursor: "pointer", color: "grey"},
      Expiration: {cursor: "pointer", color: "grey"}
    };
    sortButtonStyles[sortBy].color = "black";
    this.setState({
      sortBy: sortBy,
      sortButtonStyles: sortButtonStyles
    });
  }

  changePage(page, canChange=true){
    if(page !== this.state.page && canChange){
      this.setState({
        page: page,
        loading: true
      }, this.getItems(page, this.state.sorBy));
    }
  }

  renderStockTable(foodItems) {
    return (
      <div>
      <table className='table'>
        <thead>
          <tr>
            <th onClick={() => this.setState({loading: true}, this.getItems(this.state.page, "ItemName"))}
            style={this.state.sortButtonStyles.ItemName}>
              Item Name
            </th>
            <th onClick={() => this.setState({loading: true}, this.getItems(this.state.page, "Count"))}
            style={this.state.sortButtonStyles.Count}>
              Current Stock
            </th>
            <th onClick={() => this.setState({loading: true}, this.getItems(this.state.page, "Damaged"))} 
            style={this.state.sortButtonStyles.Damaged}>
              Amount Damaged
            </th>
            <th onClick={() => this.setState({loading: true}, this.getItems(this.state.page, "DateReceived"))}  
            style={this.state.sortButtonStyles.DateReceived}>
              Date Received
            </th>
            <th onClick={() => this.setState({loading: true}, this.getItems(this.state.page, "Expiration"))}  
            style={this.state.sortButtonStyles.Expiration}>
              Expires
            </th>
          </tr>
        </thead>
        <tbody>
          {foodItems.filter(item => 
            item.itemName.toLowerCase().indexOf(this.state.searchText.toLowerCase()) === 0).map(item =>
            <tr key={item.itemName}>
              <td>{item.itemName}</td>
              <td>{item.units ? item.units : item.weight} {item.units ? 'Units' : 'Lbs'}</td>
              <td>{item.damaged} {item.weight ? 'Lbs' : ''}</td>
              <td>{formatDate(item.dateReceived)}</td>
              <td>{formatDate(item.expiration)}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {this.state.numberOfPages > 1 && PageSelector(this.state.page, this.state.numberOfPages, this.changePage)}
      </div>
      </div>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderStockTable(this.state.foodItems);

    return (
      <div className="content">
        <h1>Current Stock</h1>
        {contents}
      </div>
    );
  }
}
