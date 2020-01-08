// import React, { Component } from 'react';

import React from 'react';
import { Redirect } from "react-router-dom";
import auth from "./models/auth.js";
import buyStock from "./models/buy-stock.js";
import io from "socket.io-client";
import input from "./components/socket-stocks";
const axios = require('axios');



class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputAccount: 0,
            account: 0,
            isOk: false,
            stockportfolio: [],
            saabamount: 0,
            volvoamount: 0,
            fordamount: 0,
            fiatamount: 0,
            saabcurrentvalue: 0,
            volvocurrentvalue: 0,
            fordcurrentvalue: 0,
            fiatcurrentvalue: 0,
            messages: [],
            setpage: false,
            // stockportfolio2: {}

        };
        this.handleInputChange = this.handleInputChange.bind(this);
        // const filterObject = (obj, filter, filterValue) =>
        // Object.keys(obj).reduce((acc, val) =>
        // (obj[val][filter] === filterValue ? acc : {
        //     ...acc,
        //     [val]: obj[val]
        //     }
        // ), {});
        //
        // var payload = filterObject(this.state.stockportfolio2, "amount", 0);
        // console.log(payload);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
      }

handleChange = (event) => {
  event.preventDefault();
  const { name, value } = event.target;
  this.setState({
    [name]: parseInt(value)
  });

}

handleSubmit = (event) => {
  event.preventDefault();
  const { name, value } = event.target;
  this.setState({[name]: parseInt(value)});
  buyStock.addToAccount((this.state.inputAccount + this.state.account), localStorage.getItem('currentuser'))

  this.setState({setpage: true});


  // console.log(this.state.inputAccount);
  //  console.log(this.state.account);

 // if(validateForm(this.state.errors) && this.state.fullName !== null) {
 //      this.setState({formValidation: 'Giltigt registreringsformulär!'});
 //      this.setState({inLogged: "inloggad"});
 //      auth.registrer(auth.htmlEntities(this.state.fullName),
 //          auth.htmlEntities(this.state.email),
 //          auth.htmlEntities(this.state.yearChoice),
 //          auth.htmlEntities(this.state.monthChoice),
 //          auth.htmlEntities(this.state.dayChoice),
 //          auth.htmlEntities(this.state.password),
 //          );
 //  }else{
 //     this.setState({formValidation: 'Ogiltigt registreringsformulär!'});
 //  }

}

componentDidMount() {
    axios.get(`https://project-api.teachmeapp.me/reports/`+localStorage.getItem('currentuser'))
      .then(res => {
        const stockportfolio1 = res.data.filter( test =>{
            return test.status === "Action";
        });

        const utan = res.data.filter( test =>{
            return test.status === false;
        });
        const account = res.data.filter( test =>{
            return test.status === "account";
        });
        // console.log(account);
        // console.log(stockportfolio1.data[0]["saab"].amount);
        // ourStorage.cabinet["top drawer"].folder2
        this.setState({ stockportfolio: stockportfolio1});
        this.setState({ account: account.length ? account[0].amount : 0});
        this.setState({ saabamount: utan.length ? utan[0].saabamount : 0});
        this.setState({ volvoamount: utan.length ? utan[0].volvoamount : 0});
        this.setState({ fordamount: utan.length ? utan[0].fordamount : 0});
        this.setState({ fiatamount: utan.length ? utan[0].fiatamount : 0});
        this.setState({ saabcurrentvalue: this.state.saabamount ? (input.saabLast.startingPoint * this.state.saabamount): 0});
        this.setState({ volvocurrentvalue: this.state.volvoamount ? (input.volvoLast.startingPoint * this.state.volvoamount): 0});
        this.setState({ fordcurrentvalue: this.state.fordamount ? (input.fordLast.startingPoint * this.state.fordamount): 0});
        this.setState({ fiatcurrentvalue: this.state.fiatamount ? (input.fiatLast.startingPoint * this.state.fiatamount): 0});
      })
      this.socket = io('localhost:9000');
      // this.socket = io('https://socket.teachmeapp.me');
      // const socket = io('https://socket.teachmeapp.me');
      this.socket.on('connect', () => {
     console.log("Connected");
      });

      this.socket.on('disconnect', () => {
          console.log("Disconnected");
      });


      this.socket.on('stocks', (message) => {
          for (var i = 0; i < message.length; i++) {
            addMessage(message[i]);
          }
                      });
                      const addMessage = data => {

                          this.setState({messages: [...this.state.messages, data]});
                          // console.log(this.state.messages);
                          // console.log(this.state.saab);
                      };
      // console.log(this.state.stockportfolio);
}





render() {
  if (this.state.setpage) {
    return <Redirect to="/" />;
    // console.log(this.state.stockportfolio);
  }
  // console.log(this.state.inLogged);



  return (


    <div className='wrapper'>
    <h2>Konto</h2>
    <p>Här kan du se aktuellt kontosaldo, värdet på och innehållet i portföljen samt sätta in kapital på kontot.</p><br></br>
    <div className='form-wrapper'>
      <h3>Kontosaldo</h3>
      <p><b>Summa:</b> {Math.round(this.state.account)} &#8383;
      </p>
      <h3>Portfölj</h3>
      {this.state.stockportfolio ?
          <div>
      <p><b>Aktuellt värde:</b> {(this.state.saabcurrentvalue + this.state.volvocurrentvalue+ this.state.fordcurrentvalue + this.state.fiatcurrentvalue ).toFixed(2)} &#8383;</p>
      <p><b>Innehåll:</b></p>
      {this.state.saabamount ? <p>Saab</p>: null}
      {this.state.saabamount ?<span className='time'>
      <b>Antal:</b>  {this.state.saabamount}
      <b> Aktuell kurs:</b>  {input.saabLast.startingPoint}
      <b> Värde:</b>  {(input.saabLast.startingPoint * this.state.saabamount).toFixed(2)}</span>: null}
      {this.state.volvoamount ? <p>Volvo</p>: null}
      {this.state.volvoamount ?<span className='time'>
      <b>Antal:</b> {this.state.volvoamount}
      <b> Aktuell kurs:</b>  {input.volvoLast.startingPoint}
      <b> Värde:</b>  {(input.volvoLast.startingPoint * this.state.volvoamount).toFixed(2)}</span>: null}
      {this.state.fordamount ? <p>Ford</p>: null}
      {this.state.fordamount ?<span className='time'>
      <b>Antal:</b>  {this.state.fordamount}
      <b> Aktuell kurs:</b>  {input.fordLast.startingPoint}
      <b> Värde:</b>  {(input.fordLast.startingPoint * this.state.fordamount).toFixed(2)}</span>: null}
      {this.state.fiatamount ? <p>Fiat</p>: null}
      {this.state.fiatamount ?<span className='time'>
      <b>Antal:</b>  {this.state.fiatamount}
      <b> Aktuell kurs:</b>  {input.fiatLast.startingPoint}
      <b> Värde:</b>  {(input.fiatLast.startingPoint * this.state.fiatamount).toFixed(2)}</span>: null}
      </div>
      : "Ingen portfölj registrerad"}
    </div>


    <div className='form-wrapper'>


    <h2>Transaktioner</h2>
    {this.state.stockportfolio ?
    <div className="messages">

    {this.state.stockportfolio.filter(opt => opt.status).map((result, i) => (
        // <p key={i}>{result.name}</p>,
        <div className="message" key={i}>
        {this.state.stockportfolio ? <span className='time'><b>Datum:</b> {result.timestamp}</span> : null}
        {this.state.stockportfolio ? <p ><b>Åtgärd:</b> {result.type}</p> : null}
        {result.saab.amount ? <p >Saab</p> : null}
        {result.saab.amount ? <span className='time'> - Kurs: {result.saab.rate}</span> : null}
        {result.saab.amount ? <span className='time'>  Antal: {result.saab.amount}</span> : null}
        {result.volvo.amount ? <p >Volvo</p> : null}
        {result.volvo.amount ? <span className='time'> - Kurs: {result.volvo.rate}</span> : null}
        {result.volvo.amount ? <span className='time'>  Antal: {result.volvo.amount}</span> : null}
        {result.ford.amount ? <p >Ford</p> : null}
        {result.ford.amount ? <span className='time'> - Kurs: {result.ford.rate}</span> : null}
        {result.ford.amount ? <span className='time'>  Antal: {result.ford.amount}</span> : null}
        {result.fiat.amount ? <p >Fiat</p> : null}
        {result.fiat.amount ? <span className='time'> - Kurs: {result.fiat.rate}</span> : null}
        {result.fiat.amount ? <span className='time'>  Antal: {result.fiat.amount}</span> : null}
       </div>
    ))}
    </div>
    : "Inga transaktioner registrerade"}
    </div>



      <div className='form-wrapper'>
        <h2>Insättning</h2>
        <span className='intro'>Sätt in pengar på depåkontot.
        </span><br/>
        <form onSubmit={this.handleSubmit}>
        <div className='email'>
          <label htmlFor="email">Summa
            </label>
          <input type='number' name='inputAccount' min="0" onChange={this.handleChange}/>

            </div>

              <div className='submit'>
                <span className='info'>Jag godkänner denna transaktion till depåkontot.</span>
                <input
                name="isOk"
                type="checkbox"
                checked={this.state.isOk}
                onChange={this.handleInputChange} />

                {this.state.isOk === true ?
                    <div className='submit'>
                       <button onClick={this.handleSubmit}>Överför</button>
                     </div> :
                     <div className='submit'>
                        <button disabled>Överför</button>
                      </div>
                }
                  </div>


        </form>
      </div>



        </div>


  );
}
}
export default Account
