import { render } from "@testing-library/react"
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import filter from "../../images/filter.png";

interface ITicket {
    ticket:{
      no:number,
      id:string,
      eventName:string,
      ticketNumber:number,
      useDate:string,
      releaseDate:string,
      status:string,
      checkinGate:string
    }[]
  }

const DanhSachVe = () =>{

    const [tickets, setTickets] = useState<ITicket["ticket"]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [output, setOutput]=useState<ITicket ["ticket"]>([]);
    const usersCollectionRef = collection(db, "tickets");
    useEffect( () => {

        const getTickets = async () => {
          const res = await getDocs(usersCollectionRef)
          .then( (res) => setTickets(res.docs.map((doc: any) => ({...doc.data(), key: doc.id}))))
        };
    
        getTickets();
      }, []);

    useEffect ( ()=> {
      setOutput([]);
      tickets.filter(val=>{
        if(val.ticketNumber.toString().includes(searchTerm)){
          setOutput(output=>[...output, val])
        }
      })

    }, [searchTerm])

    return(
    <div className="ticket-list">
        <h1 className="title">Danh sách vé</h1>

        <input className="search" type="text" placeholder="Tìm bằng số vé" onChange={(e)=>setSearchTerm(e.target.value)}/>
        <button className="locve">
            <img src={filter}/>
            Lọc vé
        </button>
        <button className="csv">Xuất file (.csv)</button>

        <table className="list-table">
            <tr className="table-heading">
                <th>STT</th>
                <th>Booking code</th>
                <th>Số vé</th>
                <th>Tên sự kiện</th>
                <th>Tình trạng sử dụng</th>
                <th>Ngày sử dụng</th>
                <th>Ngày xuất vé</th>
                <th>Cổng checkin</th>
            </tr>
            {!searchTerm && 
            tickets.map((ticket) =>
              <tr className="table-content">
                  <td>{ticket.no}</td>
                  <td>{ticket.id}</td>
                  <td>{ticket.ticketNumber}</td>
                  <td>{ticket.eventName}</td>
                  <td>{ticket.status}</td>
                  <td>{ticket.useDate}</td>
                  {/* // ticket.useDate.toDate().toDateString() khi kiểu là timestamp */}
                  <td>{ticket.releaseDate}</td>
                  <td>{ticket.checkinGate}</td>
              </tr> 
          )}
          {searchTerm && 
            output.map((ticket) =>
              <tr className="table-content">
                  <td>{ticket.no}</td>
                  <td>{ticket.id}</td>
                  <td>{ticket.ticketNumber}</td>
                  <td>{ticket.eventName}</td>
                  <td>{ticket.status}</td>
                  <td>{ticket.useDate}</td>
                  {/* // ticket.useDate.toDate().toDateString() khi kiểu là timestamp */}
                  <td>{ticket.releaseDate}</td>
                  <td>{ticket.checkinGate}</td>
              </tr> 
          )
          }
          
            

        </table>
    </div>
    );
}

export default DanhSachVe;