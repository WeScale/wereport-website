import React from "react";

export default class Facture extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        const { contrat, days, cost, bdc } = this.props;

        return (
            <tr>
                <td>{bdc}</td>
                <td>{contrat.client.name} {contrat.client.service}</td>
                <td>{days}</td>
                <td>{cost}</td>
            </tr>
        );
    }
}