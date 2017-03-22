import React from "react";
import ConsultantsStore from '../store/ConsultantsStore';
import Consultant from '../layout/Consultant';

export default class Consultants extends React.Component {
  constructor() {
    super();

    this.state = {
      consultants: [],
      firstname: 'firstname',
      lastname: 'lastname',
    }

    ConsultantsStore.getConsultants();
  }

  componentWillMount() {
    console.log("will mount consultant")
    ConsultantsStore.on("change", () => {
      this.setState({
        consultants: ConsultantsStore.getAll()
      })
    })
    ConsultantsStore.on("create", () => {
      this.setState({
        consultants: ConsultantsStore.getAll()
      })
    })
  }

  createConsultant() {
    var consultant = {
      FirstName: this.state.firstname,
      LastName: this.state.lastname,
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

    const ConsultantsComponents = this.state.consultants.map((consultant) => {
      return <Consultant key={consultant.id} {...consultant} />;
    })


    return (
      <div className="content">
        <section>
          <div className="container">

            <div className="row">
              <div className="col-md-12">
                <h1>Consultants</h1>
                <ul>{ConsultantsComponents}</ul>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <input type="text" name="firstname" value={this.state.firstname} onChange={this.handleInputChange.bind(this)} />
                <input type="text" name="lastname" value={this.state.lastname} onChange={this.handleInputChange.bind(this)} />
                <button onClick={this.createConsultant.bind(this)}>Create consultant</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
