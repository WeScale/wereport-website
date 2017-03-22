import React from "react";

export default class Client extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const { id, name, service } = this.props;

    return (
      <li>
        <span>{id}</span>:<span>{name}</span> <span>{service}</span>
      </li>
    );
  }
}