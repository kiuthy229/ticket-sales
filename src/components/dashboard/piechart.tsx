import { useEffect, useLayoutEffect, useState } from 'react';
import {Chart as ChartJs, Tooltip, Title, ArcElement, Legend} from 'chart.js';
import {db} from '../../firebase-config';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { Doughnut } from 'react-chartjs-2';
import Calendar from '../calendar/lich';
import moment from 'moment';
ChartJs.register(
  Tooltip, Title, ArcElement, Legend
);

interface IPack {
  pack:{
    no:number,
    packID:string,
    packName:string,
    useDate:string,
    ticketPrice: number,
    comboPrice:number,
    expireDate:string,
    status:string,
  }[]
}

function PieChart() {
  
  var dadung: number=0;
  var chuadung: number =0;
  var sukiendadung:number=0;
  var sukienchuadung:number=0;
  const ticketsCollectionRef = collection(db, "ticket-packs");
  const [tickets, setTickets] = useState<IPack["pack"]>([]); 
  var [giadinh, setGiadinh] = useState({
    datasets: [{
        data: [10,20],
        backgroundColor:[
          '#FF8A48',
          '#4F75FF'
        ]
    },
  ]
  });
  var [sukien, setSukien] = useState({
    datasets: [{
        data: [10,20],
        backgroundColor:[
          '#FF8A48',
          '#4F75FF'
        ]
    },
  ]
  });
  var [label, setLabel] = useState({
    datasets: [{
        data: [0,0],
        backgroundColor:[
          '#FF8A48',
          '#4F75FF'
        ]
    },
  ],
  labels: [
      'Chưa áp dụng',
      'Đang áp dụng'
  ], 
});


  useEffect( () => {
      const getTickets = async () => {
        var res = await getDocs(ticketsCollectionRef)
        .then( (res) => setTickets(res.docs.map((doc: any) => ({...doc.data(), key: doc.id}))))
      };

      getTickets();
    
      
  },[]);

  useEffect (() => {
    for (var j =0; j<tickets.length; j++){
        if(tickets[j].packName=="Gói gia đình"&& tickets[j].status.includes("Đang")){
          dadung +=1;
          //console.log(dadung)
        }
        else if (tickets[j].packName=="Gói gia đình"&& ( tickets[j].status=="Tắt" || tickets[j].status=="Chưa áp dụng")){
          chuadung +=1;
          //console.log(chuadung)
        }
    }

    const data = [chuadung,dadung];
          setGiadinh(
            {
              datasets: [{
                  data:data,
                  backgroundColor:[
                    '#FF8A48',
                    '#4F75FF'
                  ]
              },
            ] 
          }
          )
  },[tickets])

  useEffect (() => {
    for (var j =0; j<tickets.length; j++){
        if(tickets[j].packName=="Gói sự kiện"&& tickets[j].status.includes("Đang")){
          sukiendadung +=1;
          //console.log(dadung)
        }
        else if (tickets[j].packName=="Gói sự kiện"&& ( tickets[j].status=="Tắt" || tickets[j].status=="Chưa áp dụng")){
          sukienchuadung +=1;
          //console.log(chuadung)
        }
    }

    const data = [sukienchuadung,sukiendadung];
          setSukien(
            {
              datasets: [{
                  data:data,
                  backgroundColor:[
                    '#FF8A48',
                    '#4F75FF'
                  ]
              },
            ]
          }
          )
  },[tickets])

    

  return (
    <div className='PieChart'>
      <input type="date" className='date-piechart'/>
      <div className="piechart-goigiadinh" style={{width:'17%', height:'17%'}}>
        <div className='goigiadinh'>Gói Gia Đình</div>
        <Doughnut data={giadinh}/>
      </div>
      <div className="piechart-goisukien" style={{width:'17%', height:'17%'}}>
        <div className='goisukien'>Gói Sự Kiện</div>
        <Doughnut data={sukien}/>
      </div>
      <div className="label-piechart">
        <Doughnut data={label}/>
      </div>
    </div>
  );
}

export default PieChart;