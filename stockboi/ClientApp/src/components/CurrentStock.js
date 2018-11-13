import React, { Component } from 'react';
import {formatDate} from '../helpers/DateFormatHelper.js';
import axios from 'axios';

export class CurrentStock extends Component {
  displayName = CurrentStock.name

  constructor(props) {
    super(props);
    this.state = { 
      foodItems: [], 
      loading: true, 
      searchText: "",
      sortButtonStyles: {},
      numberOfPages: 0
    };

    axios.post('api/PerishableItem/GetAllItems', {
      NumberOfItemsPerPage: 50,
      PageSelected: 1,
      SortBy: "ItemName"
    })
      .then(response => {
        this.setState({ loading: false, foodItems: response.data.data, numberOfPages: response.data.numberOfPages });
      });

    this.renderStockTable = this.renderStockTable.bind(this);   
  }

  sortItems(list, sortType){ 
    var compare = (a, b) => {
      if (a[sortType] > b[sortType]){
        return 1;
      }
      if (a[sortType] < b[sortType]){
        return -1;
      }
      return 0;
    };

    let sortButtonStyles = {
      name: {cursor: "pointer", color: "dimGrey"},
      count: {cursor: "pointer", color: "dimGrey"},
      damaged: {cursor: "pointer", color: "dimGrey"}
    };
    sortButtonStyles[sortType].color = "black";

    this.setState ({
      foodItems: list.sort(compare),
      sortBy: sortType,
      sortButtonStyles: sortButtonStyles
    });
  }

  renderStockTable(foodItems) {
    console.log(foodItems);
    return (
      <div>
      <input
            onKeyUp = {() => this.setState({searchText: document.getElementsByTagName('input')[0].value})}
        />
      <table className='table'>
        <thead>
          <tr>
            <th onClick={() => this.sortItems(this.state.foodItems, "name")}
            style={this.state.sortButtonStyles.name}>
              Item Name
            </th>
            <th onClick={() => this.sortItems(this.state.foodItems, "count")}
            style={this.state.sortButtonStyles.count}>
              Current Stock
            </th>
            <th onClick={() => this.sortItems(this.state.foodItems, "damaged")} 
            style={this.state.sortButtonStyles.damaged}>
              Amount Damaged
            </th>
            <th 
            style={this.state.sortButtonStyles.damaged}>
              Date Received
            </th>
            <th 
            style={this.state.sortButtonStyles.damaged}>
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
