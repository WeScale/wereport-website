import React from "react";

export default class Contrat extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const { id, tjm, bdc, client, consultant } = this.props;

    return (
      <tr>
        <td>{id}</td>
        <td>{client.name} {client.service}</td>
        <td>{consultant.firstname} {consultant.lastname}</td>
        <td>{tjm}</td>
        <td>{bdc}</td>
      </tr>
    );
  }
}