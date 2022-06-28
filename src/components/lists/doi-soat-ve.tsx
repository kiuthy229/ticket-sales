import { Typography } from "@material-ui/core";
import { render } from "@testing-library/react"
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { couldStartTrivia } from "typescript";
import { db } from "../../firebase-config";
import filter from "../../images/filter.png";

interface ITicket {
    ticket:{
      no:number,
      id:string,
      ticketNumber:number,
      ticketType:string,
      useDate:string,
      checkinGate:string,
      status:string
    }[]
  }

const DoiSoatVe = () =>{

    const [tickets, setTickets] = useState<ITicket["ticket"]>([]);
    const usersCollectionRef = collection(db, "tickets");
    const [stateTerm, setStateTerm] = useState("");
    const [fromdate, setFromDate] = useState("");
    const [todate, setToDate] = useState("");
    const [output, setOutput]=useState<ITicket ["ticket"]>([]);
    useEffect( () => {
        const getTickets = async () => {
          const res = await getDocs(usersCollectionRef)
          .then( (res) => setTickets(res.docs.map((doc: any) => ({...doc.data(), key: doc.id}))))
        };
    
        getTickets();
      }, []);

    const onFilter = () => {
        // console.log(Date(todate)-Date(fromdate));
        setOutput([]);
        tickets.filter(val=>{
            if(stateTerm==="Đã đối soát" || stateTerm==="Chưa đối soát"){
                if(val.status == stateTerm){
                    setOutput(output=>[...output, val])
                }
            }
            else{
                setOutput(tickets)
            }
        })
    }  

    const chuadoisoat = {
        color: " #A5A8B1",
        fontSize:"13px",
        fontStyle: "italic"
    }
    
    const dadoisoat = {
        color: "#FD5959",
        fontSize:"13px",
        fontStyle: "italic"
    }
    return(
    <div className="">
        <div className="control-item">
            <h1 className="title">Đối soát vé</h1>

            <input className="search" type="text" placeholder="Tìm bằng số vé" />
            <button className="doisoat">Chốt đối soát</button>

            
                <table className="control-table">
                        <tr className="control-table-heading">
                            <th>STT</th>
                            <th>Booking code</th>
                            <th>Số vé</th>
                            <th>Ngày sử dụng</th>
                            <th>Tên loại vé</th>
                            <th>Cổng checkin</th>
                            <th className="invisible">Trạng thái</th>
                        </tr>
                        {output.map((ticket) =>
                        <tr className="control-table-content">
                                <td>{ticket.no}</td>
                                <td>{ticket.id}</td>
                                <td>{ticket.ticketNumber}</td>
                                <td>{ticket.useDate}</td>
                                <td>{ticket.ticketType}</td>
                                <td>{ticket.checkinGate}</td>
                                <td>
                                    { ticket.status === "Chưa đối soát" &&
                                    <Typography style={chuadoisoat}>{ticket.status}</Typography>}
                                    { ticket.status === "Đã đối soát" &&
                                    <Typography style={dadoisoat}>{ticket.status}</Typography>}
                                </td>
                        </tr> 
                        )}
                </table>
        </div>
        <div className="filter-item">
            <h1 className="control-filter-heading">Lọc vé</h1>
            <p className="control-filter">Tình trạng đối soát</p>
            <div className="control-filter-options">
            <div className="radio-row">
                <input type="radio" id="tat-ca" name="fav_language" value="Tất cả" onChange={(e)=>setStateTerm(e.target.value)}/>
                <label htmlFor="tat-ca">Tất cả</label>
            </div>
            <div className="radio-row">
                <input type="radio" id="da-doi-soat" name="fav_language" value="Đã đối soát" onChange={(e)=>setStateTerm(e.target.value)}/>
                <label htmlFor="da-doi-soat">Đã đối soát</label>
            </div>
            <div className="radio-row">
                <input type="radio" id="chua-doi-soat" name="fav_language" value="Chưa đối soát" onChange={(e)=>setStateTerm(e.target.value)}/>
                <label htmlFor="chua-doi-soat">Chưa đối soát</label>
            </div>
            </div>
            <div>
                <label className="control-ticket-type-filter-label">Loại vé</label>
                <p className="control-ticket-type-filter-input">Vé cổng</p>
            </div>
            <div>
                <label className="control-fromdate-filter-label">Từ ngày</label>
                <input className="control-fromdate-filter-input" type="date" onChange={(e)=>setToDate(e.target.value)}/>
            </div>
            <div>
                <label className="control-todate-filter-label">Đến ngày</label>
                <input className="control-todate-filter-input" type="date" onChange={(e)=>setFromDate(e.target.value)}/>
            </div>

            <div>
                <button className="filter-button" onClick={onFilter}>Lọc</button>
            </div>

        </div>
        
    </div>
    );
}

export default DoiSoatVe;