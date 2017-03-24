import React from "react";
import ContratsStore from '../store/ContratsStore';
import ClientsStore from '../store/ClientsStore';
import ConsultantsStore from '../store/ConsultantsStore';
import Contrat from '../layout/Contrat';


export default class Contrats extends React.Component {
  constructor() {
    super();

    this.getContrats = this.getContrats.bind(this);

    this.state = {
      contrats: [],
      tjm: 900.33,
      bdc: '1234ABC',
      client_id: '1',
      consultant_id: '1',
    }

    ContratsStore.getContrats();
  }

  componentWillMount() {
    ContratsStore.on("change", this.getContrats)
    ContratsStore.on("create", this.getContrats)
  }


  getContrats() {
    this.setState({
      contrats: ContratsStore.getAll()
    })
  }

  componentWillUnmount() {
    ContratsStore.removeListener("change", this.getContrats);
    ContratsStore.removeListener("create", this.getContrats);
  }

  createContrat() {
    var contrat = {
      tjm: this.state.tjm,
      bdc: this.state.bdc,
      client_id: this.state.client_id,
      consultant_id: this.state.consultant_id,
    }
    ContratsStore.createContrat(contrat);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {

    var ContratsComponents = this.state.contrats.map((contrat) => {
      return <Contrat key={contrat.id} {...contrat} />;
    })

    var ClientsListComponent = ClientsStore.getAll().map((client) => {
      return <option key={client.id} value={client.id}>{client.name} {client.service}</option>;
    })

    var ConsultantsListComponent = ConsultantsStore.getAll().map((consultant) => {
      return <option key={consultant.id} value={consultant.id}>{consultant.firstname} {consultant.lastname}</option>;
    })

    return (
      <div className="content">
        <section>
          <div className="container">

            <div className="row">
              <div className="col-md-12">
                <h1 className="title">Contrats</h1>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Client</th>
                      <th>Consultant</th>
                      <th>Tjm</th>
                      <th>Bdc</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ContratsComponents}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <h1 className="title">Ajouter un Contrat</h1>
                <input type="text" name="tjm" value={this.state.tjm} onChange={this.handleInputChange.bind(this)} />
                <input type="text" name="bdc" value={this.state.bdc} onChange={this.handleInputChange.bind(this)} />
                <select name="client_id" value={this.state.client_id} onChange={this.handleInputChange.bind(this)}>
                  {ClientsListComponent}
                </select>
                <select name="consultant_id" value={this.state.consultant_id} onChange={this.handleInputChange.bind(this)}>
                  {ConsultantsListComponent}
                </select>
                <button onClick={this.createContrat.bind(this)}>Create Contrat</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
