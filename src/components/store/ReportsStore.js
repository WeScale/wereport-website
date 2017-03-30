import { EventEmitter } from "events";
import ConnectStore from './ConnectStore';
import AppStore from './AppStore';
import ConsultantsStore from './ConsultantsStore';

import dispatcher from '../dispatcher';

import * as ReportActions from "../actions/ReportsActions";

class ReportsStore extends EventEmitter {
    constructor() {
        super();

        this.reports = [];
        this.reports_all = [];

        this.year = new Date().getFullYear();
        this.month = new Date().getMonth();

        this.connectWebSocket = this.connectWebSocket.bind(this);
        this.getReportsOneConsultant = this.getReportsOneConsultant.bind(this);
        this.getReportsAllConsultants = this.getReportsAllConsultants.bind(this);

        this.getReports = this.getReports.bind(this);
        this.checkStatus = this.checkStatus.bind(this);
        AppStore.on("config_receive", this.connectWebSocket);
        ConsultantsStore.on("change", this.getReportsAllConsultants);
    }

    connectWebSocket() {
        this.ws = new WebSocket('ws://' + AppStore.getBackendWS() + '/reports');
        console.log("websocket", this.ws)
        this.ws.onmessage = this.onMessage.bind(this);
        this.ws.onopen = this.onOpen.bind(this);
        this.ws.onerror = this.onError.bind(this);
        this.ws.onclose = this.onClose.bind(this);
    }

    onOpen() {
        console.log("On open");
    }

    onError(error) {
        console.error(error);
    }

    onClose(data) {
        console.log("on close", data);
    }

    onMessage(data) {
        let result = JSON.parse(data.data);
        ReportActions.createReport(result);
    }

    getAll() {
        return this.reports;
    }

    getAllReports() {
        if (this.reports_all.length === 0) {
            this.getReportsAllConsultants();
        }
        return this.reports_all;
    }

    setYear(year) {
        this.year = year;
    }

    setMonth(month) {
        this.month = month;
    }

    createReport(reportData) {
        fetch('http://' + AppStore.getBackendAPI() + '/reports', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ConnectStore.getToken(),
            },
            body: JSON.stringify(reportData),
        }).then(response => response.json())
            .then(json => {
                //this.consultants.push(json);
                //this.emit("create")
                console.log("Reportday create")
            });
    }

    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }

    createReportDay(reportData) {
        fetch('http://' + AppStore.getBackendAPI() + '/reportsdays', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ConnectStore.getToken(),
            },
            body: JSON.stringify(reportData),
        })
            .then(this.checkStatus)
            .then(response => response.json())
            .then(json => {
                //this.consultants.push(json);
                //this.emit("create")
                console.log("Reportday create");
                this.getReports();
            }).catch(function (error) {
                console.log('request failed', error)
            });
    }

    getReports() {
        fetch('http://' + AppStore.getBackendAPI() + '/reports/' + this.year + '/' + (this.month + 1) + '/consultant/' + ConnectStore.getWeReportID(), {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ConnectStore.getToken(),
            }
        }).then(response => response.json())
            .then(json => {
                if (json == null) {
                    this.reports = [];
                } else {
                    this.reports = json;
                }
                this.emit("change")
            });
    }

    getReportsAllConsultants() {
        ConsultantsStore.getAll().map((consultant) => {
            this.getReportsOneConsultant(consultant.id);
            return consultant;
        })
    }

    getReportsOneConsultant(consultant) {
        fetch('http://' + AppStore.getBackendAPI() + '/reports/' + this.year + '/' + (this.month + 1) + '/consultant/' + consultant, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ConnectStore.getToken(),
            }
        }).then(response => response.json())
            .then(json => {
                var testIsIn = false;
                json.consultant = consultant;
                for (var i = 0; i !== this.reports_all.length; i++) {
                    if (this.reports_all[i].consultant === consultant) {
                        testIsIn = true;
                        this.reports_all[i] = json;
                    }
                }
                if (testIsIn === false) {
                    this.reports_all.push(json);
                }
                this.emit("change_all")
            });
    }

    handleActions(event) {
        switch (event.type) {
            case 'CREATE_REPORT':
                this.reports = event.text;
                this.emit("create");
                break;

            default:
                console.log("default case");

        }
    }
}

const reportsStore = new ReportsStore();
dispatcher.register(reportsStore.handleActions.bind(reportsStore));

export default reportsStore;