
import React, { Component } from 'react';

import './login.css';

import ErrorBar from '../../components/errorBar/index.component';

import { none_headersInstance } from '../../configurations/instance';

import Loading from '../../components/loading/index.component';

import { reload } from '../../middleware/index';

class Login extends Component {

    constructor() {
        super();

        this.state = {
            password: '',
            error: false,
            message: '',
            loading: false,
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

            this.setState({ loading: true, })
            const response = await none_headersInstance().post(`/user/login/test`, body);

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('dept', response.data.data.dept);

            setTimeout(() => {
                this.setState({ loading: false, })
                reload();   
            }, 2000);
            
        } catch (error) {
            this.setState({ loading: false, });
            if (error.response.status === 400) {
                this.setState({
                    message: error.response.data.message,
                    error: true,
                });
            } else if (error.response.status === 401) {
                this.setState({
                    message: error.response.data.message,
                    error: true,
                });
            }
            setTimeout(() => {
                this.setState({ error: false,})
            }, 3000);
        }
    }
    render() {
        let error; let loading;

        if (this.state.error === true) {
            error = <ErrorBar message={this.state.message} />
        }
        if (this.state.loading === true) {
            loading = <Loading />
        }
        return (
            <>
                {error}{loading}
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