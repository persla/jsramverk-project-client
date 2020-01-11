import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
// import io from "socket.io-client";
import input from "./socket-stocks";
import data from "./chart-design";
import options from "./chart-data";

import {Redirect } from "react-router-dom";
import auth from "../models/auth.js";
import buyStock from "../models/buy-stock.js";
var createReactClass = require("create-react-class");
const axios = require('axios');


export default createReactClass({
  displayName: "Buy-stock",

      getInitialState: function() {
        return {
        message: 'Hello!',
        saabbuy: 0,
        saabbuyvalue: 0,
        sended: false,
        volvobuy: 0,
        fiatbuy: 0,
        fordbuy: 0,
        saabamount: 0,
        volvoamount: 0,
        fordamount: 0,
        fiatamount: 0,
        description: '',
        texten: '',
        stockportfolio: [],
        type: "",
        account: 0,
        saabInStock: 0,
        volvoInStock: 0,
        fordInStock: 0,
        fiatInStock: 0,
};


      },

      handleChange: function(event) {
        const { name, value } = event.target;
        this.setState({[name]: parseInt(value)});
        this.setState({type: "Köp"});
      },


  handleSubmit: function(event) {
      event.preventDefault();
      const { name, value } = event.target;
      this.setState({[name]: parseInt(value)});

      buyStock.addOrder(this.state.type, this.state.saabbuy, input.saabLast.startingPoint,
          this.state.volvobuy, input.volvoLast.startingPoint,
          this.state.fiatbuy, input.fiatLast.startingPoint,
          this.state.fordbuy, input.fordLast.startingPoint, localStorage.getItem('currentuser'))
           this.setState({sended: true});

      buyStock.addToPortfolio((this.state.saabbuy + this.state.saabamount),
           (this.state.volvobuy + this.state.volvoamount),
           (this.state.fiatbuy + this.state.fiatamount),
               (this.state.fordbuy + this.state.fordamount),
               localStorage.getItem('currentuser'));


    buyStock.addToAccount(this.state.account - ((input.saabLast.startingPoint * this.state.saabbuy) +
    (input.volvoLast.startingPoint * this.state.volvobuy) +
    (input.fiatLast.startingPoint * this.state.fiatbuy) +
    (input.fordLast.startingPoint * this.state.fordbuy)).toFixed(2), localStorage.getItem('currentuser'));

    buyStock.addToAll((this.state.saabInStock - this.state.saabbuy),
    (this.state.volvoInStock - this.state.volvobuy),
    (this.state.fordInStock - this.state.fordbuy),
    (this.state.fiatInStock - this.state.fiatbuy),);

  },

componentDidMount() {
    axios.get(`https://project-api.teachmeapp.me/reports/`+localStorage.getItem('currentuser'))
      .then(res => {
          const utan = res.data.filter( test =>{
              return test.status === false;
          });
          // console.log(utan);
          const account = res.data.filter( test =>{
              return test.status === "account";
          });

          this.setState({ account: account.length ? account[0].amount : 0});
          this.setState({ saabamount: utan.length ? utan[0].saabamount : 0});
          this.setState({ volvoamount: utan.length ? utan[0].volvoamount : 0});
          this.setState({ fordamount: utan.length ? utan[0].fordamount : 0});
          this.setState({ fiatamount: utan.length ? utan[0].fiatamount : 0});
      })

      axios.get(`https://project-api.teachmeapp.me/reports/`)
        .then(res => {
            this.setState({ saabInStock: res.data[0].saabInStock});
            this.setState({ volvoInStock: res.data[0].volvoInStock});
            this.setState({ fordInStock: res.data[0].fordInStock});
            this.setState({ fiatInStock: res.data[0].fiatInStock});
        })

},



  render() {
      if (this.state.sended) {
        return <Redirect to="/" />;
        // console.log(sended);
    }

    return (
      <div>
      <form onSubmit={this.handleSubmit} >
      <h2>Köp</h2>
      <div className="flex-container">

      <div className="stock-info">

     <h4>Saab 900 1981</h4>
     <p><b>Kurs(&#8383;):</b> {input.saabLast.startingPoint}</p>
     <p><b>Index:</b> {Math.floor(input.saabLast.startingPoint/20*100)}</p>
     <p><b>Tillgängligt:</b> {this.state.saabInStock}</p>
     <b>Köporder: </b><input type='number' min="0" max={this.state.saabInStock} placeholder="0" name='saabbuy' onChange={this.handleChange}/>
     {this.state.saabInStock < this.state.saabbuy || isNaN(this.state.saabbuy)? <p className="errorstock">OBS! Övertrassering.</p> :
      <p><b>S:a(&#8383;):</b> {(input.saabLast.startingPoint * this.state.saabbuy).toFixed(2)}</p>}

     </div>
     <div className="stock-info">
    <h4>Volvo 740 1984 </h4>
     <p><b>Kurs(&#8383;):</b> {input.volvoLast.startingPoint}</p>
    <p><b>Index:</b> {Math.floor(input.volvoLast.startingPoint/20*100)}</p>
    <p><b>Tillgängligt:</b> {this.state.volvoInStock}</p>
    <b>Köporder: </b><input type='number' min="0" max={this.state.volvoInStock} placeholder="0" name='volvobuy' onChange={this.handleChange}/>
    {this.state.volvoInStock < this.state.volvobuy || isNaN(this.state.volvobuy)? <p className="errorstock">OBS! Övertrassering.</p> :
     <p><b>S:a(&#8383;):</b> {(input.volvoLast.startingPoint * this.state.volvobuy).toFixed(2)}</p>}

    </div>
    <div className="stock-info">
   <h4>Fiat 500 1980 </h4>
    <p><b>Kurs(&#8383;):</b> {input.fiatLast.startingPoint}</p>
   <p><b>Index:</b> {Math.floor(input.fiatLast.startingPoint/20*100)}</p>
   <p><b>Tillgängligt:</b> {this.state.fiatInStock}</p>
   <b>Köporder: </b><input type='number' min="0" max={this.state.fiatInStock} placeholder="0" name='fiatbuy' onChange={this.handleChange}/>
   {this.state.fiatInStock < this.state.fiatbuy || isNaN(this.state.fiatbuy)? <p className="errorstock">OBS! Övertrassering.</p> :
    <p><b>S:a(&#8383;):</b> {(input.fiatLast.startingPoint * this.state.fiatbuy).toFixed(2)}</p>}

    </div>
    <div className="stock-info">
      <h4>Ford Fiesta 1983 </h4>
      <p><b>Kurs(&#8383;):</b> {input.fordLast.startingPoint}</p>
      <p><b>Index:</b> {Math.floor(input.fordLast.startingPoint/20*100)}</p>
      <p><b>Tillgängligt:</b> {this.state.fordInStock}</p>
      <b>Köporder: </b><input type='number' min="0" max={this.state.fordInStock}  placeholder="0" name='fordbuy' onChange={this.handleChange}/>
      {this.state.fordInStock < this.state.fordbuy || isNaN(this.state.fordbuy)? <p className="errorstock">OBS! Övertrassering.</p> :
       <p><b>S:a(&#8383;):</b> {(input.fordLast.startingPoint * this.state.fordbuy).toFixed(2)}</p>}

      </div>

      <h4>Kontosaldo: {Math.floor(this.state.account)}&#8383;</h4>
      {this.state.account < ((input.saabLast.startingPoint * this.state.saabbuy) +
      (input.volvoLast.startingPoint * this.state.volvobuy)+
      (input.fiatLast.startingPoint * this.state.fiatbuy)+
      (input.fordLast.startingPoint * this.state.fordbuy))

          ? <h4 className="errorstock">OBS! Övertrassering.</h4> :
      <h4> Aktuell köporder: {((input.saabLast.startingPoint * this.state.saabbuy) +
      (input.volvoLast.startingPoint * this.state.volvobuy)+
      (input.fiatLast.startingPoint * this.state.fiatbuy)+
      (input.fordLast.startingPoint * this.state.fordbuy)).toFixed(2)}&#8383;</h4>}

      </div>

      {this.state.account < ((input.saabLast.startingPoint * this.state.saabbuy) +
      (input.volvoLast.startingPoint * this.state.volvobuy)+
      (input.fiatLast.startingPoint * this.state.fiatbuy)+
      (input.fordLast.startingPoint * this.state.fordbuy)) ||
      this.state.saabInStock < this.state.saabbuy ||
      this.state.volvoInStock < this.state.volvobuy ||
      this.state.fiatInStock < this.state.fiatbuy ||
      this.state.fordInStock < this.state.fordbuy
          ?
         <button disabled>KÖP</button>
            :
          <button onClick={this.handleSubmit}>KÖP</button>
        }

          </form>
        <Line data={data} options={options} />

      </div>
    );
  }
});
