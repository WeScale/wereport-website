import React from "react";
import ConsultantsStore from '../store/ConsultantsStore';
import Consultant from '../layout/Consultant';

export default class Consultants extends React.Component {
  constructor() {
    super();

    this.getConsultants = this.getConsultants.bind(this);

    this.state = {
      consultants: [],
      firstname: 'firstname',
      lastname: 'lastname',
      email: 'email',
    }

    ConsultantsStore.getConsultants();
  }

  componentWillMount() {
    ConsultantsStore.on("change", this.getConsultants);
    ConsultantsStore.on("create", this.getConsultants);
  }

  getConsultants() {
    this.setState({
      consultants: ConsultantsStore.getAll()
    })
  }

  componentWillUnmount() {
    ConsultantsStore.removeListener("change", this.getConsultants);
    ConsultantsStore.removeListener("create", this.getConsultants);
  }

  createConsultant() {
    var consultant = {
      FirstName: this.state.firstname,
      LastName: this.state.lastname,
      Email: this.state.email,
      Profil: 1,
    }
    ConsultantsStore.createConsultant(consultant);
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

    var ConsultantsComponents = this.state.consultants.map((consultant) => {
      return <Consultant key={consultant.id} {...consultant} />;
    })


    return (
      <div className="content">
        <section>
          <div className="container">

            <div className="row">
              <div className="col-md-12">
                <h1 className="title">Consultants</h1>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>FirstName</th>
                      <th>Lastname</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ConsultantsComponents}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <h1 className="title">Ajouter un consultant</h1>
                <p>
                  Les consultants sont ajoutés dès leur première connexion
                </p>
                <input type="text" name="firstname" value={this.state.firstname} onChange={this.handleInputChange.bind(this)} />
                <input type="text" name="lastname" value={this.state.lastname} onChange={this.handleInputChange.bind(this)} />
                <input type="text" name="email" value={this.state.email} onChange={this.handleInputChange.bind(this)} />
                <button onClick={this.createConsultant.bind(this)}>Create consultant</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
