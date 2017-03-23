import React from "react";

export default class Consultant extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const { id, firstname, lastname } = this.props;

    return (
      <tr>
        <td>{id}</td><td>{firstname}</td><td>{lastname}</td>
      </tr>
    );
  }
}