import React, { Component } from 'react';
import {formatDate} from '../helpers/DateFormatHelper.js';

export class AddStock extends Component {
  displayName = "Add New Order"

  constructor(props) {
    super(props);
    this.state = { 
    };

    
  }

 

  render() {
    return (
      <div>
        <div style={{marginLeft: "auto", marginRight: "auto", width: "80%"}}>
          <h2 className="page-header">ENTER ITEM NAME: </h2>
          <input style={{width: "385px", height: "50px"}}/>
        </div>
      
      </div>

    );
  }
}