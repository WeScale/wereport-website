import React from "react";

export default class Contrat extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const { name, tjm, bdc, client, consultant } = this.props;

    return (
      <tr>
        <td>{name}</td>
        <td>{client.name} {client.service}</td>
        <td>{consultant.firstname} {consultant.lastname}</td>
        <td>{tjm}</td>
        <td>{bdc}</td>
      </tr>
    );
  }
}