import { EventEmitter } from "events";
import ConnectStore from './ConnectStore';
import AppStore from './AppStore';
import dispatcher from '../dispatcher';

import * as ContratsActions from "../actions/ContratsActions";

class ContratsStore extends EventEmitter {
    constructor() {
        super();
        this.contrats = [
        ]


        this.connectWebSocket = this.connectWebSocket.bind(this);
        AppStore.on("config_receive", this.connectWebSocket);
    }

    connectWebSocket(){
        this.ws = new WebSocket('ws://'+AppStore.getBackendWS()+'/contrats');
        console.log("websocket", this.ws)
        this.ws.onmessage = this.handleData.bind(this);
    }

    handleData(data) {
        console.log(data.data);
        let result = JSON.parse(data.data);
        ContratsActions.createContrat(result);
    }

    getAll() {
        return this.contrats;
    }

    createContrat(contratData) {
        fetch('http://'+AppStore.getBackendAPI()+'/contrats', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ConnectStore.getToken(),
            },
            body: JSON.stringify(contratData),
        }).then(response => response.json())
            .then(json => {
                console.log("client create")
            });
    }

    getContrats() {
        fetch('http://'+AppStore.getBackendAPI()+'/contrats', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ConnectStore.getToken(),
            }
        }).then(response => response.json())
            .then(json => {
                if (json == null) {
                    this.contrats = [];
                } else {
                    this.contrats = json;
                }
                this.emit("change")
            });
    }


    handleActions(event) {
        switch (event.type) {
            case 'CREATE_CONTRAT':
                this.contrats.push(event.text);
                this.emit("create");
                break;

            default:
                console.log("default case");

        }
    }
}

const contratsStore = new ContratsStore();
dispatcher.register(contratsStore.handleActions.bind(contratsStore));

export default contratsStore;