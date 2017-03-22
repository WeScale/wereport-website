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
                if(json){
                    this.clients = json;
                } else {
                    this.clients = []
                }
                this.emit("change")
            });
    }
}

const clientsStore = new ClientsStore();

export default clientsStore;