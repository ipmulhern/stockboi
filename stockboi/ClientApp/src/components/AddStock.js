import React, { Component } from 'react';
import {formatDate} from '../helpers/DateFormatHelper.js';
import {objectSearch} from '../helpers/ObjectSearcher.js';
import {Tabs, Tab} from "react-bootstrap";
import {Modal} from 'react-bootstrap';
import {AddItem} from './AddItem.js';

const testItems = [
  {itemName: "Milk Gallons", uPC: 1254},
  {itemName: "Apples", uPC: 5432},
  {itemName: "lays potato chips", uPC: 2452}
];



export class AddStock extends Component {
  displayName = "Add New Order"

  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      orders: [
        {OrderNumber: 3, Description: "10 milk gallons, 10 Lbs of apples, 500 lays potato chips", Date: "10/25/18"},
        {OrderNumber: 2, Description: "10 milk gallons, 10 Lbs of apples, 500 lays potato chips", Date: "10/25/18"},
        {OrderNumber: 1, Description: "10 milk gallons, 10 Lbs of apples, 500 lays potato chips", Date: "10/25/18"}
      ],
      newOrder: [],
      show: false,
      currentBatch: {} 
    };

    this.handlePastOrderSearch = this.handlePastOrderSearch.bind(this);
    this.handleAddItemClick = this. handleAddItemClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.makeChangesToBatch = this.makeChangesToBatch.bind(this);
  }

handlePastOrderSearch(e){
  this.setState({
    searchText: e.target.value
  });
}

  renderPastOrders(){
    return(
      <div>
        <input onChange={this.handlePastOrderSearch} style={{width: "300px", height: "30px", marginTop: "20px"}}/>
        <div style={{width: "100%", marginTop: "20px"}}>
          <table className='table'>
            <thead>
            <tr>
              <th>
                Order Number
              </th>
              <th>
               Description
             </th>
              <th>
               Date Placed
             </th>
            </tr>
          </thead>
          <tbody>
            {objectSearch(this.state.orders, this.state.searchText).map((order) =>
            <tr className="past-orders" key={order.OrderNumber}>
              <td>{"Order #" + order.OrderNumber}</td>
              <td>{order.Description}</td>
              <td>{order.Date}</td>
            </tr>
            )}
          </tbody>
         </table> 
        </div>
      </div>
    );
  }

  handleAddItemClick(){
    this.setState({
      show: true
    });
  }
  
  makeChangesToBatch(batch){
    this.setState({currentBatch: batch});
  }

  handleClose(){
    this.setState({
      show: false,
      addItemKey: this.state.addItemKey + 1
    })
  }

  renderNewOrder(){
    return(
      <div>
        <button onClick={this.handleAddItemClick} style={{marginTop: "20px"}}>Add Item</button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddItem key={this.state.addItemKey} 
              makeChangesToItem={this.makeChangesToItem} 
              totalItems={testItems}/>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>    
        </Modal>
        <div style={{width: "100%", marginTop: "20px"}}>
          <table className='table'>
            <thead>
            <tr>
              <th>
                UPC
              </th>
              <th>
               Item Name
             </th>
              <th>
               Quantity
             </th>
            </tr>
          </thead>
          <tbody>
            {this.state.newOrder.map((batch) =>
            <tr key={batch.uPC + batch.expiration}>
              <td>{batch.uPc}</td>
              <td>{batch.itemName}</td>
              <td>{batch.units ? batch.units + " units" : batch.weight + " Lbs"}</td>
            </tr>
            )}
          </tbody>
         </table> 
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div style={{marginTop: "20px", marginLeft: "3%", marginRight: "auto", width: "80%"}}>
          <Tabs defaultActiveKey={2}>
            <Tab eventKey={1} title="New Order">
           {this.renderNewOrder()}
            </Tab>
            <Tab eventKey={2} title="Past Orders">
              {this.renderPastOrders()}
            </Tab>
          </Tabs>  
        </div>
      
      </div>


    );
  }
}

