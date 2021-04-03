
import React, { Component } from 'react';

import './login.css';

import ErrorBar from '../../components/errorBar/index.component';

import { none_headersInstance } from '../../configurations/instance';

class Login extends Component {

    constructor() {
        super();

        this.state = {
            password: '',
            error: false,
            message: '',
        };
        this.passwordChanged = this.passwordChanged.bind(this);
        this.login = this.login.bind(this);
    }
    passwordChanged(event) {
        if (event.key === 'Enter') {
            this.login();
        }

        this.setState({ password: event.target.value });
    }
    async login() {
        try {
            const body = {
                username: document.getElementById('username').value,
                password: this.state.password
            }
            const response = await none_headersInstance().post(`/user/login`, body);

            console.log(response);
        } catch (error) {
            if (error.response.status === 400) {
                this.setState({
                    message: error.response.data.message || error.response.data.title,
                    error: true,
                });
            }
            setTimeout(() => {
                this.setState({ error: false,})
            }, 3000);
        }
    }
    render() {
        let error;

        if (this.state.error === true) {
            error = <ErrorBar message={this.state.message} />
        }
        return (
            <>
                {error}
                <div className="login">
                    <input type="text" placeholder="Username" id="username" />
                    <input type="password" placeholder="Password" value={this.state.password} onKeyPress={this.passwordChanged} onChange={this.passwordChanged} />
                    <button onClick={this.login}>Login</button>
                </div>
            </>
        );
    }
}

export default Login;