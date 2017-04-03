import React from "react";

export default class Client extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const { id, name, service } = this.props;

    return (
      <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{service}</td>
      </tr>
    );
  }
}