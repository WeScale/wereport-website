import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import 'whatwg-fetch';
import ConnectStore from '../store/ConnectStore'

class Connect extends Component {
    constructor() {
        super();

        this.state = {
            connect: false,
        }
    }

    componentWillMount() {
        ConnectStore.on("connect", () => {
            this.setState({
                connect: true,
            })
        })
    }

    successResponseGoogle = (response) => {
        ConnectStore.getUserInfo(response.tokenId)
    }

    failResponseGoogle = (response) => {
        ConnectStore.setDisconnect();
        this.setState({
                connect: false
        });
        console.log(response);
    }


    render() {
        let login = null;
        if (!ConnectStore.isConnected()) {
            login = <GoogleLogin
                clientId="472198434245-m5mjauvu8ddf9fo874bj14v4v60oghu5.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.successResponseGoogle}
                onFailure={this.failResponseGoogle}
            />;
        }
        else {
            login = <div><p>Hello, {ConnectStore.getUsername()}</p>
                <p>Role: {ConnectStore.getProfil()}</p></div>;
        }
        return (
            <div>
                {login}
            </div>
        );
    }
}

export default Connect;
