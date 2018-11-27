import React, { Component } from 'react';
import {formatDate} from '../helpers/DateFormatHelper.js';
import {objectSearch} from '../helpers/ObjectSearcher.js';
import {Tabs, Tab} from "react-bootstrap";
import {Modal} from 'react-bootstrap';
import {AddItem} from './AddItem.js';
import axios from 'axios';
import {PageSelector} from './PageSelector.js';

export class AddStock extends Component {
  displayName = "Add New Order"

  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      orders: [],
      newOrder: [],
      show: false,
      currentBatch: {},
      page: 1,
      loadingOrders: true,
      numberOfPages: null,
      savingOrder: false,
      savingOrderFailed: false,
      allItemChoices: []
    };

    this.getPastOrders(1);
    this.getItemDescriptions();

    this.handlePastOrderSearch = this.handlePastOrderSearch.bind(this);
    this.handleAddItemClick = this. handleAddItemClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.makeChangesToBatch = this.makeChangesToBatch.bind(this);
    this.addBatchToOrderDisabled = this.addBatchToOrderDisabled.bind(this);
    this.handleAddBatchToOrder = this.handleAddBatchToOrder.bind(this);
    this.removeBatchFromOrder = this.removeBatchFromOrder.bind(this);
    this.handleSaveOrderClick = this.handleSaveOrderClick.bind(this);
    this.getPastOrders = this.getPastOrders.bind(this);
    this.changePage = this.changePage.bind(this);
    this.saveOrder = this.saveOrder.bind(this);
    this.getItemDescriptions = this.getItemDescriptions.bind(this);
  }

  handlePastOrderSearch(e){
    this.setState({
      searchText: e.target.value
    });
  }

  getPastOrders(page){
    axios.post('api/Orders/GetPastOrders', {
      NumberOfItemsPerPage: 50,
      PageSelected: page,
      SortBy: ""
    })
    .then(response => {
      this.setState({
        orders: response.data.data,
        numberOfPages: response.data.NumberOfPages,
        loadingOrders: false
      });
    });
  }

  changePage(page){
    if (page != this.state.page){
      this.setState({
        page: page,
        loadingOrders: true,
      }, this.getPastOrders(page));
    }
  }

  renderPastOrders(){
    return(
      <div>
        <div style={{width: "100%", marginTop: "20px"}}>
        {this.state.loadingOrders 
          ? <p><em>Loading...</em></p>
          : <table className='table'>
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
            {this.state.orders.map((order) =>
            <tr className="past-orders" key={order.OrderNumber}>
              <td>{"Order #" + order.orderNumber}</td>
              <td>{order.description}</td>
              <td>{formatDate(order.datePlaced.toString())}</td>
            </tr>
            )}
          </tbody>
          </table> }
         {this.state.numberOfPages > 1 && PageSelector(this.state.page, this.state.numberOfPages, this.changePage)}
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
    if (this.state.savingOrder){
      let newOrder = this.state.newOrder.filter(batch => {
        return batch !== batchToRemove;
      });

      this.setState({
        newOrder: newOrder
      });
    }
  }

  handleSaveOrderClick(){
    this.setState({
      savingOrder: true
    }, this.saveOrder());
  }

  saveOrder(){
    axios.post('api/Orders/SaveOrder', this.state.newOrder)
      .then(response => {
        this.setState({
          savingOrder: false,
          savingOrderFailed: false,
          newOrder: [],
          loadingOrders: true
        }, this.getPastOrders(1));
      })
      .catch(e => {
        console.log(e);
        this.setState({
          savingOrder: false,
          savingOrderFailed: true
        });
      });
  }

  getItemDescriptions(){
    axios.get('api/Orders/GetAllProductDescriptions')
      .then(response => {
        this.setState({
          allItemChoices: response.data
        });
      });
  }

  renderNewOrder(){
    return(
      <div>
        <button type="button" className="btn btn-secondary" 
          onClick={this.handleAddItemClick} 
          disabled={this.state.savingOrder}
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
              allItemChoices={this.state.allItemChoices}/>
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
         {!this.state.savingOrder
         ?<button type="button" className="btn btn-secondary" 
          onClick={this.handleSaveOrderClick} 
          style={{marginTop: "20px", width: "100px", float: "right"}}>
          Save Order
        </button> 
        :<p style={{float: "right", marginTop: "10px" }}><em>Loading...</em></p>}
        {this.state.savingOrderFailed &&
        <p style={{marginTop: "10px", color: "#c90000"}}>Failed to save order. Please try again.</p>}
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

