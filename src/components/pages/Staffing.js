import React, { Component } from 'react';
import ClientReport from '../layout/ClientReport';
import ReportsStore from '../store/ReportsStore';
import ConsultantsStore from '../store/ConsultantsStore';

class Staffing extends Component {
  constructor() {
    super();

    this.getReports = this.getReports.bind(this);
    this.getDaysInMonth = this.getDaysInMonth.bind(this);

    this.state = {
      reports_all: [],
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    }

    ReportsStore.setYear(this.state.year);
    ReportsStore.setMonth(this.state.month);
  }

  componentWillMount() {
    ReportsStore.on("change_all", this.getReports);
    ReportsStore.getReportsAllConsultants();
  }

  getReports() {
    this.setState({
      reports_all: ReportsStore.getAllReports()
    })
  }

  componentWillUnmount() {
    ReportsStore.removeListener("change_all", this.getReports);
  }

  getDaysInMonth() {
    var date = new Date(this.state.year, this.state.month, 1);
    var days = [];
    while (date.getMonth() === this.state.month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  render() {
    var DaysComponents = this.getDaysInMonth().map((day) => {
      return <th key={day.getDate()}>{day.getDate()}</th>;
    })

    var nonworkdayList = null;
    if (this.state.reports_all.length > 0) {
      for (var j = 0; j < this.state.reports_all[0].length; j++) {
        if (this.state.reports_all[0][j].contrat.name === "nonworkday") {
          nonworkdayList = this.state.reports_all[0][j].list_days;
        }
      }
    }

    var i = 0;
    var EachConsultantBlock = this.state.reports_all.map((report) => {
      return report.map((client) => {
        i++;
        var consultant = ConsultantsStore.getOneConsultant(report.consultant);
        if (client.contrat.name !== "nonworkday") {
          return <ClientReport key={i} nonworkday={nonworkdayList} {...client} showonly="true" consultant={consultant} />;
        } else {
          return null;
        }
      }, this);
    }, this);

    return (
      <div className="content">
        <section>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="title">Le mois en cours</h1>
                <table className="table">
                  <thead>
                    <tr>
                      <th className="col-md-2">Consultant</th>
                      <th className="col-md-1">Contrat</th>
                      {DaysComponents}
                    </tr>
                  </thead>
                  <tbody>
                    {EachConsultantBlock}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}


export default Staffing;
