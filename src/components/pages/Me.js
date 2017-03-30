import React, { Component } from 'react';
import ConnectStore from '../store/ConnectStore';
import ContratsStore from '../store/ContratsStore';
import Contrat from '../layout/Contrat';
import ClientReport from '../layout/ClientReport';
import ReportsStore from '../store/ReportsStore';

class Me extends Component {
  constructor() {
    super();

    this.getContrats = this.getContrats.bind(this);
    this.getReports = this.getReports.bind(this);
    this.getDaysInMonth = this.getDaysInMonth.bind(this);

    this.state = {
      contrats: [],
      days_month: [],
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    }

    ContratsStore.getContratsOneConsultant();
    ReportsStore.setYear(this.state.year);
    ReportsStore.setMonth(this.state.month);
    ReportsStore.getReports();
  }

  componentWillMount() {
    ContratsStore.on("change_me", this.getContrats);
    ReportsStore.on("change", this.getReports);
  }


  getContrats() {
    this.setState({
      contrats: ContratsStore.getOneConsultant()
    })
  }

  getReports() {
    this.setState({
      days_month: ReportsStore.getAll()
    })
  }

  componentWillUnmount() {
    ContratsStore.removeListener("change_me", this.getContrats);
    ReportsStore.removeListener("change", this.getReports);
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
    var ContratsComponents = this.state.contrats.map((contrat) => {
      return <Contrat key={contrat.id} {...contrat} />;
    })

    var DaysComponents = this.getDaysInMonth().map((day) => {
      return <th key={day.getDate()}>{day.getDate()}</th>;
    })

    var nonworkdayList = null;
    for(var j= 0; j < this.state.days_month.length; j++)
    {
        if(this.state.days_month[j].contrat.name==="nonworkday"){
          nonworkdayList = this.state.days_month[j].list_days;
        }
    }

    var i = 0;
    var ReportDayComponents = this.state.days_month.map((day) => {
      i++;
      if(day.contrat.name!=="nonworkday") {
        return <ClientReport key={i} nonworkday={nonworkdayList} {...day} showonly="false" consultant="me" />;
      } else {
        return null;
      }
    }, this);

    return (
      <div className="content">
        <section>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="title">{ConnectStore.getUsername()}</h1>
                <div>
                  <p>Email: {ConnectStore.getEmail()}</p>
                  <p>WeReportID: {ConnectStore.getWeReportID()}</p>
                </div>
                <h1 className="title">Mon mois en cours</h1>
                <table className="table">
                  <thead>
                    <tr>
                      <th className="col-md-1">Kind</th>
                      {DaysComponents}
                    </tr>
                  </thead>
                  <tbody>
                    {ReportDayComponents}
                  </tbody>
                </table>
                <h1 className="title">Mes contrats en cours</h1>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Client</th>
                      <th>Consultant</th>
                      <th>Tjm</th>
                      <th>Bdc</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ContratsComponents}
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


export default Me;
