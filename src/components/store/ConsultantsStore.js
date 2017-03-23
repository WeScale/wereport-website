import { EventEmitter } from "events";
import ConnectStore from './ConnectStore';
import AppStore from './AppStore';

import dispatcher from '../dispatcher';

import * as ConsultantsActions from "../actions/ConsultantsActions";

class ConsultantsStore extends EventEmitter {
    constructor() {
        super();
        this.consultants = [
        ]

        this.ws = new WebSocket('ws://'+AppStore.getBackendWS()+'/consultants');
        console.log("websocket", this.ws)
        this.ws.onmessage = this.onMessage.bind(this);
        this.ws.onopen = this.onOpen.bind(this);
        this.ws.onerror = this.onError.bind(this);
        this.ws.onclose = this.onClose.bind(this);
    }

    onOpen(){
        console.log("On open");
    }

    onError(error){
        console.error(error);
    }

    onClose(data){
        console.log("on close", data);
    }

    onMessage(data) {
        let result = JSON.parse(data.data);
        ConsultantsActions.createConsultant(result);
    }

    getAll() {
        return this.consultants;
    }

    createConsultant(consultantData) {
        fetch('http://'+AppStore.getBackendAPI()+'/consultants', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ConnectStore.getToken(),
            },
            body: JSON.stringify(consultantData),
        }).then(response => response.json())
            .then(json => {
                //this.consultants.push(json);
                //this.emit("create")
                console.log("consultant create")
            });
    }

    getConsultants() {
        fetch('http://'+AppStore.getBackendAPI()+'/consultants', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ConnectStore.getToken(),
            }
        }).then(response => response.json())
            .then(json => {
                if (json == null) {
                    this.consultants = [];
                } else {
                    this.consultants = json;
                }
                this.emit("change")
            });
    }

    handleActions(event) {
        switch (event.type) {
            case 'CREATE_CONSULTANT':
                this.consultants.push(event.text);
                this.emit("create");
                break;

            default:
                console.log("default case");

        }
    }
}

const consultantsStore = new ConsultantsStore();
dispatcher.register(consultantsStore.handleActions.bind(consultantsStore));

export default consultantsStore;