import React, { Component } from 'react';
import {formatDate} from '../helpers/DateFormatHelper.js';
import {objectSearch} from '../helpers/ObjectSearcher.js';
import {Tabs, Tab} from "react-bootstrap";
import {Modal} from 'react-bootstrap';
import {AddItem} from './AddItem.js';

const testItems = [
  {ItemName: "Milk Gallons", UPC: 1254},
  {ItemName: "Apples", UPC: 5432},
  {ItemName: "Lays Potato Chips", UPC: 2452},
  {ItemName: "Mangos", UPC: 5436}
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
    this.addBatchToOrderDisabled = this.addBatchToOrderDisabled.bind(this);
    this.handleAddBatchToOrder = this.handleAddBatchToOrder.bind(this);
    this.removeBatchFromOrder = this.removeBatchFromOrder.bind(this);
    this.handleSaveOrderClick = this.handleSaveOrderClick.bind(this);
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

  handleAddBatchToOrder(){
    let newOrder = this.state.newOrder;
    newOrder.push(this.state.currentBatch);
    this.setState({
      newOrder: newOrder,
      show: false
    });
  }

  addBatchToOrderDisabled(){
    let batchValid = this.state.currentBatch.UPC && this.state.currentBatch.ItemName 
      && this.state.currentBatch.Expiration && this.state.currentBatch.DateReceived
      && (this.state.currentBatch.Units || this.state.currentBatch.Weight);
    return !batchValid;  
  }

  removeBatchFromOrder(batchToRemove){
    let newOrder = this.state.newOrder.filter(batch => {
      return batch !== batchToRemove;
    });

    this.setState({
      newOrder: newOrder
    });
  }

  handleSaveOrderClick(){
    this.setState({
      newOrder: []
    });
  }

  renderNewOrder(){
    return(
      <div>
        <button type="button" className="btn btn-secondary" 
          onClick={this.handleAddItemClick} 
          style={{marginTop: "20px", width: "100px"}}>
          Add Item
        </button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddItem key={this.state.addItemKey} 
              newItem={this.makeChangesToBatch} 
              allItemChoices={testItems}/>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-secondary"
              onClick={this.handleAddBatchToOrder} 
              style={{float: "right", marginRight: "20px"}}
              disabled={this.addBatchToOrderDisabled()}>Add</button>
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
            <tr key={batch.UPC + batch.Expiration}>
              <td>{batch.UPC}</td>
              <td>{batch.ItemName}</td>
              <td style={{marginRight: "0px"}}>{batch.Units ? batch.Units + " units" : batch.Weight + " Lbs"}
                <p style={{display: "inline", float: "right", cursor: "pointer"}} 
                onClick={()=> this.removeBatchFromOrder(batch)}>
                  &#x2716;
                </p>
              </td>
            </tr>
            )}
          </tbody>
         </table>
         <button type="button" className="btn btn-secondary" 
          onClick={this.handleSaveOrderClick} 
          style={{marginTop: "20px", width: "100px", float: "right"}}>
          Save Order
        </button> 
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="content">
          <Tabs id="addStockTabs" defaultActiveKey={2}>
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

