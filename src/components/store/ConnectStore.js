import { EventEmitter } from "events";
import AppStore from './AppStore';

class ConnectStore extends EventEmitter {
    constructor() {
        super();
        this.token_id = '';
        this.username = '';
        this.email = '';
        this.wereportid = '';
        this.connect = false;
    }

    getUserInfo(token) {
        this.token_id = token;
        fetch('http://'+AppStore.getBackendAPI()+'/connect', {
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
                this.email = json.email;
                this.wereportid = json.wereportid;
                this.emit("connect");
            });
    }


    getEmail(){
        return this.email;
    }
    
    getWeReportID(){
        return this.wereportid;
    }

    setDisconnect(){
        this.connect = false;
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