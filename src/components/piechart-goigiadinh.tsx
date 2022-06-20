import { useEffect, useLayoutEffect, useState } from 'react';
import {Chart as ChartJs, Tooltip, Title, ArcElement, Legend} from 'chart.js';
import {db} from '../firebase-config';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { Doughnut } from 'react-chartjs-2';
ChartJs.register(
  Tooltip, Title, ArcElement, Legend
);

interface IPack {
  pack:{
    no:number,
    id:string,
    name:string,
    useDate:Timestamp,
    expireDate:Timestamp,
    singlePrice:number,
    comboPrice:number,
    status:string
  }[]
}

function PieChart() {
  
  var dadung: number=0;
  var chuadung: number =0;
  const usersCollectionRef = collection(db, "ticket-packs");
  const [tickets, setTickets] = useState<IPack["pack"]>([]); 
  const [data, setData] = useState({
    datasets: [{
        data: [10,20],
        backgroundColor:[
          'orange',
          'blue'
        ]
    },
  ],
  labels: [
      'Orange',
      'Blue'
  ], 
});


  useEffect( () => {

    const getTickets = async () => {
      const res = await getDocs(usersCollectionRef)
      .then( (res) => setTickets(res.docs.map((doc: any) => ({...doc.data(), key: doc.id}))))

      setTimeout(() => {
        for (var j =0; j<tickets.length; j++){
          const status = tickets[j].status;
          console.log(status)
            if(tickets[j].name=="Gói gia đình"&&status=="Đang áp dụng"){
              dadung +=1;
              console.log(dadung)
            }
            else if (tickets[j].name=="Gói gia đình"&&status=="Tắt"){
              chuadung +=1;
              console.log(chuadung)
            }
        }
      
        const label = ["Chưa sử dụng", "Đã sử dụng"];
        const data = [0, 1];
              setData(
                {
                  datasets: [{
                      data:data,
                      backgroundColor:[
                        'orange',
                        'blue',
                      ]
                  },
                ],
                labels:label, 
              }
              )
      }, 2000);


    };

    getTickets();


  },[]);

  

  return (
    <div className="PieChart" style={{width:'17%', height:'17%'}}>
      {/* {tickets.map((ticket) =>
      <div key={ticket.id}>{ticket.name}</div> )} */}
      <Doughnut data={data}/>
    </div>
  );
}

export default PieChart;