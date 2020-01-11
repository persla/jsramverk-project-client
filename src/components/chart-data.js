import input from "./socket-stocks";
const options = {
  scales: {
    xAxes: [
      { display: false,

        type: "realtime",
        realtime: {
            format: 'MM',
         unit: 'month',
         parser:'MM',
         displayFormats: { month: 'MM' },
         max: '2017-10-09 18:43:53',
         min: '2017-00-02 18:43:53',
          onRefresh: function(chart) {
             chart.data.datasets[0].data.push({
              x: Date.now(),
              y: input.saabLast.startingPoint
            });
             chart.data.datasets[1].data.push({
              x: Date.now(),
              y: input.volvoLast.startingPoint
            });
             chart.data.datasets[2].data.push({
              x: Date.now(),
              y: input.fiatLast.startingPoint
            });
             chart.data.datasets[3].data.push({
              x: Date.now(),
              y: input.fordLast.startingPoint

            });
            // console.log(options.scales.xAxes[0].realtime.onRefresh.function.data.datasets[0].data.x)

          },
          delay: 5000
        }
      }
    ]

  }

};
export default options;
