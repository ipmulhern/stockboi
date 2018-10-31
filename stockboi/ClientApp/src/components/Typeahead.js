import React, { Component } from 'react';

export class Typeahead extends React.Component {
    render(){
        return (
            <input onChange={this.handlePastOrderSearch} style={{width: "300px", height: "30px", marginTop: "20px"}}/>
        );
    }
}