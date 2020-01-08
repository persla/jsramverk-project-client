import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import io from "socket.io-client";
import input from "./socket-stocks";
import data from "./chart-design";
import options from "./chart-data";
var createReactClass = require("create-react-class");


export default createReactClass({
  displayName: "LineExample",

  render() {
    return (
      <div>
      <div className="flex-container">
      <div className="stock-info">
     <h4>Saab 900 1981</h4>
     <p><b>Kurs(&#8383;):</b> {input.saabLast.startingPoint}</p>
     <p><b>Index:</b> {Math.floor(input.saabLast.startingPoint/20*100)}</p>
     </div>
     <div className="stock-info">
    <h4>Volvo 740 1984 </h4>
     <p><b>Kurs(&#8383;):</b> {input.volvoLast.startingPoint}</p>
    <p><b>Index:</b> {Math.floor(input.volvoLast.startingPoint/20*100)}</p>
    </div>
    <div className="stock-info">
   <h4>Fiat 500 1980 </h4>
    <p><b>Kurs(&#8383;):</b> {input.fiatLast.startingPoint}</p>
   <p><b>Index:</b> {Math.floor(input.fiatLast.startingPoint/20*100)}</p>
    </div>
        <div className="stock-info">
      <h4>Ford Fiesta 1983 </h4>
      <p><b>Kurs(&#8383;):</b> {input.fordLast.startingPoint}</p>
      <p><b>Index:</b> {Math.floor(input.fordLast.startingPoint/20*100)}</p>
      </div>
      </div>
        <Line data={data} options={options} />

      </div>
    );
  }
});
