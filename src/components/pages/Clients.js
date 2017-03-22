import React from "react";
import ClientsStore from '../store/ClientsStore';
import Client from '../layout/Client';

export default class Clients extends React.Component {
  constructor() {
    super();

    this.state = {
      clients: [],
      name: 'name',
      service: 'service',
    }

    ClientsStore.getClients();
  }

  componentWillMount() {
    ClientsStore.on("change", () => {
      this.setState({
        clients: ClientsStore.getAll()
      })
    })
    ClientsStore.on("create", () => {
      console.log("refresh client")
      this.setState({
        clients: ClientsStore.getAll()
      })
    })
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

    const ClientsComponents = this.state.clients.map((client) => {
      return <Client key={client.id} {...client} />;
    })

    return (
      <div className="content">
        <section>
          <div className="container">

            <div className="row">
              <div className="col-md-12">
                <h1>Clients</h1>
                <ul>{ClientsComponents}</ul>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
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
