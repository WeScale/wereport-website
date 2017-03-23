import { EventEmitter } from "events";
import ConnectStore from './ConnectStore';
import AppStore from './AppStore';
import dispatcher from '../dispatcher';

import * as ClientsActions from "../actions/ClientsActions";

class ClientsStore extends EventEmitter {
    constructor() {
        super();
        this.clients = [
        ]

        this.ws = new WebSocket('ws://'+AppStore.getBackendWS()+'/clients');
        console.log("websocket", this.ws)
        this.ws.onmessage = this.handleData.bind(this);
    }

    handleData(data) {
        console.log(data.data);
        let result = JSON.parse(data.data);
        ClientsActions.createClient(result);
    }

    getAll() {
        return this.clients;
    }

    createClient(clientData) {
        fetch('http://'+AppStore.getBackendAPI()+'/clients', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ConnectStore.getToken(),
            },
            body: JSON.stringify(clientData),
        }).then(response => response.json())
            .then(json => {
                console.log("client create")
            });
    }

    getClients() {
        fetch('http://'+AppStore.getBackendAPI()+'/clients', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ConnectStore.getToken(),
            }
        }).then(response => response.json())
            .then(json => {
                if (json == null) {
                    this.clients = [];
                } else {
                    this.clients = json;
                }
                this.emit("change")
            });
    }


    handleActions(event) {
        switch (event.type) {
            case 'CREATE_CLIENT':
                this.clients.push(event.text);
                this.emit("create");
                break;

            default:
                console.log("default case");

        }
    }
}

const clientsStore = new ClientsStore();
dispatcher.register(clientsStore.handleActions.bind(clientsStore));

export default clientsStore;