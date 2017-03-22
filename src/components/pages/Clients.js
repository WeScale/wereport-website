import React from "react";
import ClientsStore from '../store/ClientsStore';
import Client from '../layout/Client';

export default class Clients extends React.Component {
  constructor() {
    super();

    this.state = {
      Clients: [],
      firstname: 'firstname',
      lastname: 'lastname',
    }

    ClientsStore.getClients();
  }

  componentWillMount() {
    console.log("will mount Client")
    ClientsStore.on("change", () => {
      this.setState({
        Clients: ClientsStore.getAll()
      })
    })
    ClientsStore.on("create", () => {
      this.setState({
        Clients: ClientsStore.getAll()
      })
    })
  }

  createClient() {
    var Client = {
      FirstName: this.state.firstname,
      LastName: this.state.lastname,
    }
    console.log(Client);
    ClientsStore.createClient(Client);
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

    ClientsStore.getAll();
    console.log(this.state.Clients);
    const ClientsComponents = this.state.Clients.map((Client) => {
      return <Client key={Client.id} {...Client} />;
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
                <input type="text" name="firstname" value={this.state.firstname} onChange={this.handleInputChange.bind(this)} />
                <input type="text" name="lastname" value={this.state.lastname} onChange={this.handleInputChange.bind(this)} />
                <button onClick={this.createClient.bind(this)}>Create Client</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
