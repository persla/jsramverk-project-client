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
};


      },

      handleChange: function(event) {
        // alert(this.state.message);
        const { name, value } = event.target;
        this.setState({[name]: parseInt(value)});
        this.setState({type: "Köp"});
        // console.log(this.state.saabbuy +"saab");
        // console.log(this.state.volvobuy +"volvo");
        // console.log(this.state.fiatbuy +"fiat");
        // console.log(this.state.fordbuy +"ford");
        // this.setState({saab:{amount: this.state.saabbuy, rate: input.saabLast.startingPoint}});

              // console.log(this.state.saab);
        // this.setState({saab: [this.state.saabbuy, this.state.saabbuyvalue]});

        // this.setState({volvobuy: value});

          // this.setState({name: value});
      },


  // handleChange: (event) => {
  //     event.preventDefault();
  //     // const { name, value } = event.target;
  //     // this.setState({saabbuy: value});
  //     //   console.log(this.state.saabbuy +"test");
  //     //
  //
  //
  // },


  handleSubmit: function(event) {
      event.preventDefault();
      // buyStock.getReport();
        // this.setState({saab:{amount: this.state.saabbuy, rate: input.saabLast.startingPoint}});
      const { name, value } = event.target;
      this.setState({[name]: parseInt(value)});
      // this.setState({saab: [this.state.saabbuy, this.state.saabbuyvalue]});
      // console.log(this.state.saabbuy +" saab " + input.saabLast.startingPoint);
      //
      // console.log(this.state.saab);
      // console.log(this.state.volvobuy +"volvo");
      // console.log(this.state.fiatbuy +"fiat");
      // console.log(this.state.fordbuy +"ford");
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

           // console.log(this.state.type);

           // console.log(this.state.stockportfolio);


          // console.log(this.getInitialState);
  },

componentDidMount() {
    axios.get(`http://localhost:1338/reports/`+localStorage.getItem('currentuser'))
      .then(res => {
          const utan = res.data.filter( test =>{
              return test.status === false;
          });
          // console.log(utan);
          const account = res.data.filter( test =>{
              return test.status === "account";
          });
          // console.log(stockportfolio1.data[0]["saab"].amount);
          // ourStorage.cabinet["top drawer"].folder2
          // utan.length ? utan[0].saabamount : 0
          this.setState({ account: account.length ? account[0].amount : 0});
          this.setState({ saabamount: utan.length ? utan[0].saabamount : 0});
          this.setState({ volvoamount: utan.length ? utan[0].volvoamount : 0});
          this.setState({ fordamount: utan.length ? utan[0].fordamount : 0});
          this.setState({ fiatamount: utan.length ? utan[0].fiatamount : 0});
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
     <b>Köporder: </b><input type='number' min="0" placeholder="0" name='saabbuy' onChange={this.handleChange}/>
     <p><b>S:a(&#8383;):</b> {(input.saabLast.startingPoint * this.state.saabbuy).toFixed(2)}</p>



     </div>
     <div className="stock-info">
    <h4>Volvo 740 1984 </h4>
     <p><b>Kurs(&#8383;):</b> {input.volvoLast.startingPoint}</p>
    <p><b>Index:</b> {Math.floor(input.volvoLast.startingPoint/20*100)}</p>
    <b>Köporder: </b><input type='number' min="0" placeholder="0" name='volvobuy' onChange={this.handleChange}/>
     <p><b>S:a(&#8383;):</b> {(input.volvoLast.startingPoint * this.state.volvobuy).toFixed(2)}</p>

    </div>
    <div className="stock-info">
   <h4>Fiat 500 1980 </h4>
    <p><b>Kurs(&#8383;):</b> {input.fiatLast.startingPoint}</p>
   <p><b>Index:</b> {Math.floor(input.fiatLast.startingPoint/20*100)}</p>
   <b>Köporder: </b><input type='number' min="0" placeholder="0" name='fiatbuy' onChange={this.handleChange}/>
   <p><b>S:a(&#8383;):</b> {(input.fiatLast.startingPoint * this.state.fiatbuy).toFixed(2)}</p>

    </div>
    <div className="stock-info">
      <h4>Ford Fiesta 1983 </h4>
      <p><b>Kurs(&#8383;):</b> {input.fordLast.startingPoint}</p>
      <p><b>Index:</b> {Math.floor(input.fordLast.startingPoint/20*100)}</p>
      <b>Köporder: </b><input type='number' min="0" placeholder="0" name='fordbuy' onChange={this.handleChange}/>
      <p><b>S:a(&#8383;):</b> {(input.fordLast.startingPoint * this.state.fordbuy).toFixed(2)}</p>

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
      (input.fordLast.startingPoint * this.state.fordbuy))
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
