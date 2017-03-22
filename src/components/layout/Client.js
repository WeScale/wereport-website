import React from "react";

export default class Client extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const { id, firstname, lastname } = this.props;

    return (
      <li>
        <span>{id}</span>:<span>{firstname}</span> <span>{lastname}</span>
      </li>
    );
  }
}