import React, { Component } from 'react';
import Facture from '../layout/Facture';
import FacturesStore from '../store/FacturesStore';

class Factures extends Component {
  constructor() {
    super();

    this.getFactures = this.getFactures.bind(this);

    this.state = {
      factures: [],
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    }

    FacturesStore.setYear(this.state.year);
    FacturesStore.setMonth(this.state.month);
  }

  componentWillMount() {
    FacturesStore.on("change", this.getFactures);
    FacturesStore.getFactures();
  }

  getFactures() {
    this.setState({
      factures: FacturesStore.getAll()
    })
  }

  componentWillUnmount() {
    FacturesStore.removeListener("change", this.getFactures);
  }

  render() {
    var i = 0;
    var FacturesComponents = this.state.factures.map((facture) => {
      i++;
      return <Facture key={i} {...facture} />;
    }, this);

    return (
      <div className="content">
        <section>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="title">Clients</h1>
                <table className="table">
                  <thead>
                    <tr>
                      <th>BDC</th>
                      <th>Client</th>
                      <th>Jours</th>
                      <th>A facturer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FacturesComponents}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}


export default Factures;
