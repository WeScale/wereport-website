import { EventEmitter } from "events";

class AppStore extends EventEmitter {
    constructor() {
        super();
        fetch('/config.json', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => response.json())
            .then(json => {
                console.log(json);
                this.backend_api = json.backend_api;
                this.backend_wso = json.backend_wso;
                this.emit("config_receive");
            });

        // this.backend_api = '35.187.90.121:31080';
        // this.backend_wso = '35.187.90.121:31081';
    }

    getBackendAPI() {
        return this.backend_api;
    }

    getBackendWS() {
        return this.backend_wso;
    }
}

const appStore = new AppStore();

export default appStore;

