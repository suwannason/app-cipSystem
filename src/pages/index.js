

import React, { Component } from 'react';

import Login from './login/index.component';
import Navbar from '../navbar/index.component';

export default class Page extends Component {
    render() {
        let element;

        if (!localStorage.getItem('token')) {
            element = <Login />
        } else {
            element = <Navbar />
        }
        return (
            <>
                {element}
            </>
        );
    }
}
