import io from "socket.io-client";
let socket = io('https://project-socket.teachmeapp.me');

    // this.socket = io('https://socket.teachmeapp.me');
    // const socket = io('https://socket.teachmeapp.me');
    const input = {
    messages: [],
    saab: [],
    volvo: [],
    fiat: [],
    ford: [],
    saabLast: "",
    fiatLast: "",
    volvoLast: "",
    fordLast: "",
    }
export default input;

    socket.on('connect', () => {
    console.log("Connected");
    });

    socket.on('disconnect', () => {
        console.log("Disconnected");
    });

    socket.on('stocks', (message) => {
        for (var i = 0; i < message.length; i++) {
          input.messages.push(message[i]);
        }
        // console.log(message);
        input.messages.filter(function (model) {
            return model.name === "Saab 900";
        }).map((model, i) => {
            return (
                input.saab.push(model),
                input.saabLast = input.saab.pop()
            )
        })
        input.messages.filter(function (model) {
            return model.name === "Volvo 740";
        }).map((model) => {
            return (
                input.volvo.push(model),
                input.volvoLast = input.volvo.pop()
            )
        })

        input.messages.filter(function (model) {
            return model.name === "Fiat 500";
        }).map((model) => {
            return (
                input.fiat.push(model),
                input.fiatLast = input.fiat.pop()
            )
        })

        input.messages.filter(function (model) {
            return model.name === "Ford fiesta";
        }).map((model) => {
            return (
                input.ford.push(model),
                input.fordLast = input.ford.pop()
            )
        })

        });
