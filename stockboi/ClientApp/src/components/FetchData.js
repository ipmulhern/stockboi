import React, { Component } from 'react';

export class FetchData extends Component {
  displayName = FetchData.name

  constructor(props) {
    super(props);
    this.state = { foodItems: [], loading: true };

    fetch('api/SampleData/WeatherForecasts')
      .then(response => response.json())
      .then(data => {
        this.setState({ foodItems: data, loading: false });
      });
  }

  static renderForecastsTable(forecasts) {
    return (
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
          {forecasts.map(item =>
            <tr>
              <td>{item.Name}</td>
              <td>{item.Count + "units"}</td>
              <td>{item.ExpirationDate}</td>
              <td>{item.Damaged}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderForecastsTable(this.state.foodItems);

    return (
      <div>
        <h1>Current Stock</h1>
        {contents}
      </div>
    );
  }
}
