import { EventEmitter } from "events";
import ConnectStore from './ConnectStore';
import AppStore from './AppStore';


class FacturesStore extends EventEmitter {
    constructor() {
        super();
        this.factures = [
        ]
        this.year = new Date().getFullYear();
        this.month = new Date().getMonth();

        this.getFactures = this.getFactures.bind(this);
    }


    setYear(year) {
        this.year = year;
    }

    setMonth(month) {
        this.month = month;
    }

    getAll() {
        if (this.factures.length === 0) {
            this.getFactures();
        }
        return this.factures;
    }

    getFactures() {
        fetch('http://' + AppStore.getBackendAPI() + '/factures/'+this.year+'/'+(this.month + 1)+'/', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ConnectStore.getToken(),
            }
        }).then(response => response.json())
            .then(json => {
                if (json == null) {
                    this.factures = [];
                } else {
                    this.factures = json;
                }
                this.emit("change")
            });
    }
}

const facturesStore = new FacturesStore();

export default facturesStore;