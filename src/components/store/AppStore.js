import { EventEmitter } from "events";

class AppStore extends EventEmitter {
    constructor() {
        super();
        this.backend_api = 'wereport-backend-service:31080';
        this.backend_wso = 'wereport-backend-service:31081';
    }

    getBackendAPI(){
        return this.backend_api;
    }

    getBackendWS(){
        return this.backend_wso;
    }
}

const appStore = new AppStore();

export default appStore;

