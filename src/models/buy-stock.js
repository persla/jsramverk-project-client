
// import React from 'react';
// import Login from '../Login.js';
const axios = require('axios');

var buyStock = {
    allReports: [],
    allReports1: [],
    currentReports: [],
    token: "",
    errorMessage: "",

    // addReport: async function(name, description, texten) {
    //     // console.log(this.state.fullName.value);
    //     // console.log(name);
    //     // console.log(description);
    //     var payload = {
    //         name: name,
    //         description: description,
    //         texten: texten
    //     };
    //
    //     let res = await axios.post('https://me-api.teachmeapp.me/reports', payload);

    //     // console.log(res.data);
    //     // console.log(res.data.data.user);
    // },

    addOrder: async function(type, saabamount, saabrate, volvoamount, volvorate,
    fiatamount, fiatrate, fordamount, fordrate, user) {
        let action = "Action"
        // let buy = "Köp"
        var payloadInput = {
            status: action,
            type: type,
            name: user,
            timestamp: new Date().toLocaleDateString('se') + ' ' +new Date().toLocaleTimeString(),
            saab: {amount: saabamount, rate: saabrate},
            volvo: {amount: volvoamount, rate: volvorate},
            fiat: {amount: fiatamount, rate: fiatrate},
            ford: {amount: fordamount, rate: fordrate},
        };

        // const filterObject = (obj, filter, filterValue) =>
        // Object.keys(obj).reduce((acc, val) =>
        // (obj[val][filter] === filterValue ? acc : {
        //     ...acc,
        //     [val]: obj[val]
        //     }
        // ), {});
        //
        // var payload = filterObject(payloadInput, "amount", 0);
        // await axios.post('https://me-api.teachmeapp.me/reports', payload);
        let res = await axios.post('https://project-api.teachmeapp.me/reports', payloadInput);
        console.log(payloadInput);
        console.log(res);
        // console.log(res.data.data.user);
    },

    addToPortfolio: async function(saabamount, volvoamount,
    fiatamount, fordamount, user) {
            let stock = false;
        var payloadInput = {
            name: user,
            status: stock,
            saabamount: saabamount,
            volvoamount: volvoamount,
            fiatamount: fiatamount,
            fordamount: fordamount,
        };

        // const filterObject = (obj, filter, filterValue) =>
        // Object.keys(obj).reduce((acc, val) =>
        // (obj[val][filter] === filterValue ? acc : {
        //     ...acc,
        //     [val]: obj[val]
        //     }
        // ), {});
        //
        // var payload = filterObject(payloadInput, "amount", 0);
        let res = await axios.post('https://project-api.teachmeapp.me/reports', payloadInput);
        console.log(payloadInput);
        // console.log(res);
        // console.log(res.data.data.user);
    },

    addToAccount: async function(amount, user) {
            let stock = "account";
        var payloadInput = {
            name: user,
            status: stock,
            amount: amount,
            amount2: amount
        };

        // const filterObject = (obj, filter, filterValue) =>
        // Object.keys(obj).reduce((acc, val) =>
        // (obj[val][filter] === filterValue ? acc : {
        //     ...acc,
        //     [val]: obj[val]
        //     }
        // ), {});
        //
        // var payload = filterObject(payloadInput, "amount", 0);
            //     let res = await axios.post('https://me-api.teachmeapp.me/reports', payload);
        let res = await axios.post('https://project-api.teachmeapp.me/reports', payloadInput);
        console.log(payloadInput);
        // console.log(res);
        // console.log(res.data.data.user);
    },

    addToAll: async function(saabstock, volvostock,
    fiatstock, fordstock) {
            let stock = "All";
        var payloadInput = {
            type: stock,
            saabInStock: saabstock,
            volvoInStock: volvostock,
            fordInStock: fiatstock,
            fiatInStock: fiatstock,
        };

        // const filterObject = (obj, filter, filterValue) =>
        // Object.keys(obj).reduce((acc, val) =>
        // (obj[val][filter] === filterValue ? acc : {
        //     ...acc,
        //     [val]: obj[val]
        //     }
        // ), {});
        //
        // var payload = filterObject(payloadInput, "amount", 0);
        let res = await axios.post('https://project-api.teachmeapp.me/reports', payloadInput);
        console.log(payloadInput);
        // console.log(res);
        // console.log(res.data.data.user);
    },

    // revReport: async function(name, description, texten, id) {
    //     var payload = {
    //         name: name,
    //         description: description,
    //         texten: texten,
    //         id: id
    //     };
    //
    //     let res = await axios.put('https://me-api.teachmeapp.me/reports', payload);
    //     console.log(res.data);
    //     // console.log(res.data.data.user);
    // },

    // getReport: async function() {
    //     let res = await axios.get('http://localhost:1338/reports');
    //     console.log(res);
    //     console.log("test");
    // },

    // getReport1: async function (url) {
    //     let response = await fetch('http://localhost:1337/reports');
    //     let data = await response.json();
    //     reports.allReports1 = data;
    //     console.log(data);
    //     return data;
    //   },
    //
    // getUsers : async () => {
    //     let res = await axios.get("http://localhost:1337/reports");
    //     // reports.allReports = res.data;
    //     reports.allReports.push(res.data);
    //     // this.setState({ users: data });
    //     // console.log(res.data);
    // },
    //
    // login: async function(email, password) {
    //     // console.log(this.state.fullName.value);
    //     console.log(email);
    //     console.log(password);
    //     var payload = {
    //         email: email,
    //         password: password,
    //         api_key: "e2386b9513c75723e61b80bd23d427d1"
    //     };
    //
    //     let res = await axios.post('http://localhost:1337/login', payload);
    //
    //     console.log(res.data);
    // },


};
export default buyStock;
