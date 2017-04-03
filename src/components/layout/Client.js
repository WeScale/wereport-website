import React from "react";

export default class Client extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const { name, service } = this.props;

    return (
      <tr>
        <td>{name}</td>
        <td>{service}</td>
      </tr>
    );
  }
}