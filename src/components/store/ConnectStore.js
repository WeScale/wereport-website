import { EventEmitter } from "events";

class ConnectStore extends EventEmitter {
    constructor() {
        super();
        this.token_id = '';
        this.username = '';
        this.connect = false;
    }

    getUserInfo(token) {
        this.token_id = token;
        fetch('http://localhost:8080/connect', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.token_id,
            }
        }).then(response => response.json())
            .then(json => {
                console.log(json);
                this.username = json.name;
                this.connect = true;
                this.emit("connect");
            });
    }

    getUsername(){
        return this.username;
    }

    getToken(){
        return this.token_id;
    }

    isConnected(){
        return this.connect;
    }
}

const connectStore = new ConnectStore();

export default connectStore;