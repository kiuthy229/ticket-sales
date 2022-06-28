import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


const data = {
  labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'],
  datasets: [
    {
      label: 'Doanh Thu',
      data: [150000000, 175000000, 190000000, 230000000, 200000000, 250000000, 195000000],
      fill: true,
      backgroundColor: "rgba(250, 160, 95, 0.26)" ,
      pointBorderColor:"#FF993C",
      pointBorderWidth:0,
      pointRadius:0,
      tension: 0.6,
      borderColor:"#FF993C"
    },
  ],
};

const options = {
  plugins:{legend:{display:false}},
  layout:{padding:{bottom:305}},
  scales: {
    y:{
      ticks:{
        color:"#888888",
        font:{
          size:18
        }
      },
      grid:{
        color:"#ECE9F1"
      }
    },
    x:{
      ticks:{
        color:"#888888",
        font:{
          size:18
        }
      },
      grid:{
        color:"#FFFFFF"
      }
    }
  },
};

function LineChart() {
  return (
    <div>
      <input className="date-linechart" type="date"/>
      <div className="LineChart">
        <h2>Doanh Thu</h2>
        <Line data={data} options={options}/>
      </div>
    </div>

  );
}

export default LineChart;