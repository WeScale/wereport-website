import React from "react";
import ClientsStore from '../store/ClientsStore';
import Client from '../layout/Client';


export default class Clients extends React.Component {
  constructor() {
    super();

    this.getClients = this.getClients.bind(this);

    this.state = {
      clients: [],
      name: 'name',
      service: 'service',
    }

    ClientsStore.getClients();
  }

  componentWillMount() {
    ClientsStore.on("change", this.getClients)
    ClientsStore.on("create", this.getClients)
  }


  getClients() {
    this.setState({
      clients: ClientsStore.getAll()
    })
  }

  componentWillUnmount() {
    ClientsStore.removeListener("change", this.getClients);
    ClientsStore.removeListener("create", this.getClients);
  }

  createClient() {
    var client = {
      Name: this.state.name,
      Service: this.state.service,
    }
    ClientsStore.createClient(client);
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

    var ClientsComponents = this.state.clients.map((client) => {
      return <Client key={client.id} {...client} />;
    })

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
                      <th>Id</th>
                      <th>Name</th>
                      <th>Service</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ClientsComponents}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <h1 className="title">Ajouter un client</h1>
                <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange.bind(this)} />
                <input type="text" name="service" value={this.state.service} onChange={this.handleInputChange.bind(this)} />
                <button onClick={this.createClient.bind(this)}>Create Client</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
