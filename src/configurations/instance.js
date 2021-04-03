

import axios from 'axios';

export const app_jsonInstance = () => {
    const instance = axios.create({
        baseURL: process.env.REACT_APP_API,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' }
    });

    return instance;
};


export const none_headersInstance = () => {
    const instance = axios.create({
        baseURL: process.env.REACT_APP_API,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, }
    });
    return instance;
};

export const form_dataInstance = () => {
    const instance = axios.create({
        baseURL: process.env.REACT_APP_API,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'multipart/form-data' }
    });

    return instance;
};

export const blob_response = () => {
    const instance = axios.create({
        baseURL: process.env.REACT_APP_API,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, },
        responseType: 'blob'
    });

    return instance;
};