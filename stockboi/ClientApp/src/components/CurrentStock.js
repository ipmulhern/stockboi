import React, { Component } from 'react';

export class CurrentStock extends Component {
  displayName = CurrentStock.name

  constructor(props) {
    super(props);
    this.state = { foodItems: [], loading: true, searchText: "" };

    fetch('api/SampleData/GetPerishableItems')
      .then(response => response.json())
      .then(data => {
        this.setState({ foodItems: data, loading: false });
      });

    this.renderStockTable = this.renderStockTable.bind(this);   
  }

  renderStockTable(foodItems) {
    return (
      <div>
      <input
            onKeyUp = {() => this.setState({searchText: document.getElementsByTagName('input')[0].value})}
        />
      <table className='table'>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Current Stock</th>
            <th>Expiration Date</th>
            <th>Amount Damaged</th>
          </tr>
        </thead>
        <tbody>
          {foodItems.filter(item => 
            item.name.toLowerCase().indexOf(this.state.searchText.toLowerCase()) === 0).map(item =>
            <tr key={item.name + item.expirationDate}>
              <td>{item.name}</td>
              <td>{item.count} units</td>
              <td>{item.expirationDate}</td>
              <td>{item.damaged}</td>
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
      <div>
        <h1>Current Stock</h1>
        {contents}
      </div>
    );
  }
}
