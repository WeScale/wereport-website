import React from "react";
import ContratsStore from '../store/ContratsStore';
import ConnectStore from '../store/ConnectStore';
import ReportsStore from '../store/ReportsStore';

export default class ClientReport extends React.Component {
  constructor(props) {
    super();
    this.state = {
      contrat_id: props.contrat.id,
      list_days: props.list_days,
      contrat: props.contrat,
      report_id: props.id,
      nonworkdayList: props.nonworkday,
      showonly: props.showonly,
      consultant: props.consultant,
    }

    this.getContrat = this.getContrat.bind(this);
  }


  getContrat() {
    this.setState({
      contrat: ContratsStore.getCurrentContrat(),
    })
  }

  componentWillMount() {
    //ContratsStore.on("get_contrat", this.getContrat);
  }


  componentWillUnmount() {
    //ContratsStore.removeListener("get_contrat", this.getContrat);
  }

  handleChangeContrat(event) {
    const target = event.target;
    const value = target.value;
    ContratsStore.getContrat(value);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    var tmpArr = this.state.list_days;
    tmpArr[target.name - 1] = value

    ReportsStore.createReportDay({
      Contrat: this.state.contrat.id,
      Report: this.state.report_id,
      Owner: ConnectStore.getWeReportID(),
      Day: Math.floor(target.name),
      Time: parseFloat(value),
    });
  }

  render() {
    var i = -1;
    var listTd = this.state.list_days.map(function (valueDay) {
      i++;
      var name = i + 1;
      var inputid = "input-field";
      if (this.state.list_days[i] == 0.5) {
        inputid = "input-field-middle";
      } else if (this.state.list_days[i] == 1) {
        inputid = "input-field-one";
      }

      if (this.state.nonworkdayList[i] == 0) {
        if (this.state.showonly === "true") {
          return <td key={i} id={inputid}>{this.state.list_days[i]}</td>;
        } else {
          return <td key={i} >
            <input type="text" name={name} id={inputid} value={this.state.list_days[i]} onChange={this.handleInputChange.bind(this)} />
          </td>;
        }
      } else {
        return <td key={i} id="input-field-we"> </td>
      }
    }, this);

    let consultantName = null;
    if (this.state.showonly == "true") {
      consultantName = <td key="-1" className="col-md-2">{this.state.consultant.firstname} {this.state.consultant.lastname}</td>;
    }

    return (
      <tr>
        {consultantName}
        <td key="0" className="col-md-1">{this.state.contrat.name}</td>
        {listTd}
      </tr>
    );
  }
}