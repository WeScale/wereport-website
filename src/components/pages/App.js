import React, { Component } from 'react';
import Connect from './Connect';

class App extends Component {
  render() {
    return (
      <section className="home-top">
        <div className="container">
          <div className="row">
            <div className="col-md-8 home-content">
              <h1>WeReport app page</h1>
              <p>
                <Connect />
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}


export default App;
