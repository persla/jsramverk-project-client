
// import React from 'react';
// import Login from '../Login.js';
const axios = require('axios');
var auth = {
    email: "",
    password: "",
    emailNew: "",
    passwordNew: "",
    token: "",
    errorMessage: "",

    registrer: async function(name, email, year, month, day, password) {
        var payload = {
            name: name,
            email: email,
            year: year,
            month: month,
            day: day,
            password: password
        };

        // let res = await axios.post('http://localhost:1338/register', payload);
        let res = await axios.post('https://project-api.teachmeapp.me/register', payload);

        console.log(res.data);
    },

    login: async function(email, password) {
        // console.log(this.state.fullName.value);
        // console.log(email);
        // console.log(password);
        var payload = {
            email: email,
            password: password,
            api_key: "e2386b9513c75723e61b80bd23d427d1"
        };

        let res = await axios.post('http://localhost:1337/login', payload);

        console.log(res.data.data.token);
        auth.token = res.data.data.token;
        console.log(res.data.data.user.email);
        return auth.token
    },

    htmlEntities: function (str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

};
export default auth;
