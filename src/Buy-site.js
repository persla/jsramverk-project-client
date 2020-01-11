import React from "react";
import io from "socket.io-client";
// import { Line } from 'react-chartjs-2';
// // import DynamicDoughnutExample from './components/dynamic-doughnut';
// import LineChartExample from './components/line';
// import LineChartExample from './components/line';
// import input from "./components/socket-stocks";
// import data from "./components/chart-design";
// import options from "./components/chart-data";

import LineExample from './components/buy'

 // import 'chartjs-plugin-streaming';

// import { Card, Form, Input, Button, Error } from "./context/AuthForms";

class BuySite extends React.Component{
    constructor(props){
        super(props);
        this.socket = io('https://project-socket.teachmeapp.me');
        this.state = {
            // message: '',
            // saab: '',
            // saabserie: [],
            // volvo: '',
            // timestamp: '',
            isMounted: false,
            messages: [],
    };
}

componentDidMount() {
    this.setState({isMounted: true})
    // this.socket = io('localhost:9000');
    // this.socket = io('https://project-socket.teachmeapp.me');
    // const socket = io('https://socket.teachmeapp.me');
    this.socket.on('connect', () => {
   console.log("Connected");
    });

    // this.socket.on('disconnect', () => {
    //     console.log("Disconnected");
    // });


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


}

componentWillUnmount() {
    this.setState({isMounted: false})
    this.socket.on('disconnect', () => {
        console.log("Disconnected");
    });
    this.socket.close()
}



    render(){
            // const volvo = this.state.volvo;
            // const saab = this.state.saab;
            // console.log(volvo);

        return (
        <div className="container">


<LineExample/>
</div>


        );
    }
}

export default BuySite;
