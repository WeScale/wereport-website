import { EventEmitter } from "events";
import ConnectStore from './ConnectStore';

class ClientsStore extends EventEmitter {
    constructor() {
        super();
        this.clients = [
        ]
    }

    getAll(){
        return this.clients;
    }

    createClient(clientData){
        fetch('http://localhost:8080/clients', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ConnectStore.getToken(),
                },
                body: JSON.stringify(clientData),
            }).then(response => response.json())
            .then(json => {
                console.log(json);
                this.clients.push(json);
                this.emit("create")
            });
    }

    getClients(){
        fetch('http://localhost:8080/clients', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ConnectStore.getToken(),
                }
            }).then(response => response.json())
            .then(json => {
                console.log(json);
                this.clients = json;
                this.emit("change")
            });
    }
}

const clientsStore = new ClientsStore();

export default clientsStore;