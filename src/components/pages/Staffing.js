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
    console.log("refresh report all")
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

   handleMonthChange(event) {
    const target = event.target;
    const value = Math.floor(target.value);

    console.log("change month: ", value);
    ReportsStore.setMonth(value - 1);
    ReportsStore.getReportsAllConsultants();
    this.setState({
      month: (Math.floor(value) - 1)
    });
  }

   handleYearChange(event) {
    const target = event.target;
    const value = target.value;
    console.log("change year: ", value);
    ReportsStore.setYear(Math.floor(value));
    ReportsStore.getReportsAllConsultants();
    this.setState({
      year: Math.floor(value)
    });
  }

  render() {
    console.log("render", this.state.year, this.state.month);

    var DaysComponents = this.getDaysInMonth().map((day) => {
      return <th key={day.getDate()}>{day.getDate()}</th>;
    })

    var nonworkdayList = null;
    if (this.state.reports_all.length > 0) {
      for (var j = 0; j < this.state.reports_all[0].length; j++) {
        if (this.state.reports_all[0][j].contrat.name === "nonworkday") {
          nonworkdayList = this.state.reports_all[0][j].list_days;
          console.log(nonworkdayList.length, nonworkdayList);
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

    var MonthListComponent = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((nbMonth) => {
      return <option key={nbMonth} value={nbMonth}>{nbMonth}</option>;
    })

    var YearListComponent = [(new Date().getFullYear() - 1), (new Date().getFullYear()), (new Date().getFullYear() + 1)].map((year) => {
      return <option key={year} value={year}>{year}</option>;
    })

    return (
      <div className="content">
        <section>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="title">Le mois</h1>
                <div className="form-group">
                  <label htmlFor="mois">Mois:</label>
                  <select name="mois" id="mois" className="form-control" value={this.state.month + 1} onChange={this.handleMonthChange.bind(this)}>
                    <option key="0" value="0">Please select</option>
                    {MonthListComponent}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="year">Year:</label>
                  <select name="year" id="year" className="form-control" value={this.state.year} onChange={this.handleYearChange.bind(this)}>
                    <option key="0" value="0">Please select</option>
                    {YearListComponent}
                  </select>
                </div>
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
