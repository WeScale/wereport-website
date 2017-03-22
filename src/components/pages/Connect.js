import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import 'whatwg-fetch';
import ConnectStore from '../store/ConnectStore'

class Connect extends Component {
    constructor() {
        super();

        this.state = {
            token_id: '',
            username: '',
            connect: false,
            data: []
        }
    }

    componentWillMount() {
        ConnectStore.on("connect", () => {
            this.setState({
                connect: true,
                username: ConnectStore.getUsername(),
                token_id: ConnectStore.getToken(),
            })
        })
    }

    successResponseGoogle = (response) => {
        console.log("Success")
        ConnectStore.getUserInfo(response.tokenId)
    }

    failResponseGoogle = (response) => {
        console.log("Failed")
        this.setState({ connect: false })
        console.log(response);
    }


    render() {
        let login = null;
        if (!this.state.connect) {
            login = <GoogleLogin
                clientId="472198434245-m5mjauvu8ddf9fo874bj14v4v60oghu5.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.successResponseGoogle}
                onFailure={this.failResponseGoogle}
            />;
        }
        else {
            login = <p>Hello, {this.state.username}</p>
        }
        return (
            <div>
                {login}
            </div>
        );
    }
}

export default Connect;

// 7qQtmW380lQFCgTZBUcBjAZb