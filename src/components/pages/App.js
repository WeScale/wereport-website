import React, { Component } from 'react';
import logo from '../img/logo.svg';
import Connect from './Connect';

class App extends Component {
  render() {
    return (
      <div className="content">
        <section>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>WeReport app page</h2>
                <Connect />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}


export default App;
