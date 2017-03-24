import React, { Component } from 'react';
import ConnectStore from '../store/ConnectStore';

class Me extends Component {
  render() {
    return (
      <section className="home-top">
        <div className="container">
          <div className="row">
            <div className="col-md-8 home-content">
              <h1>{ConnectStore.getUsername()}</h1>
              <div>
                <p>Email: {ConnectStore.getEmail()}</p>
                <p>WeReportID: {ConnectStore.getWeReportID()}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}


export default Me;
