import { EventEmitter } from "events";
import ConnectStore from './ConnectStore';

class ConsultantsStore extends EventEmitter {
    constructor() {
        super();
        this.consultants = [
        ]
    }

    getAll(){
        return this.consultants;
    }

    createConsultant(consultantData){
        fetch('http://localhost:8080/consultants', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ConnectStore.getToken(),
                },
                body: JSON.stringify(consultantData),
            }).then(response => response.json())
            .then(json => {
                this.consultants.push(json);
                this.emit("create")
            });
    }

    getConsultants(){
        fetch('http://localhost:8080/consultants', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ConnectStore.getToken(),
                }
            }).then(response => response.json())
            .then(json => {
                this.consultants = json;
                this.emit("change")
            });
    }
}

const consultantsStore = new ConsultantsStore();

export default consultantsStore;