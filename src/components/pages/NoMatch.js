import React, { Component } from 'react';
import logo from '../img/logo.svg';
import '../css/App.css';

class NoMatch extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>NoMatch</h2>
        </div>
      </div>
    );
  }
}


export default NoMatch;
