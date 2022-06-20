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
      useDate:Timestamp,
      releaseDate:Timestamp,
      status:string,
      checkinGate:string
    }[]
  }

const DanhSachVe = () =>{

    const [tickets, setTickets] = useState<ITicket["ticket"]>([]);
    const usersCollectionRef = collection(db, "tickets");
    useEffect( () => {

        const getTickets = async () => {
          const res = await getDocs(usersCollectionRef)
          .then( (res) => setTickets(res.docs.map((doc: any) => ({...doc.data(), key: doc.id}))))
        };
    
        getTickets();
      }, []);

    return(
    <div className="ticket-list rendered-item">
        <h1 className="title">Danh sách vé</h1>

        <input className="search" type="text" placeholder="Tìm bằng số vé" />
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
            {tickets.map((ticket) =>
                <tr className="table-content">
                    <td>{ticket.no}</td>
                    <td>{ticket.id}</td>
                    <td>{ticket.ticketNumber}</td>
                    <td>{ticket.eventName}</td>
                    <td>{ticket.status}</td>
                    <td>{ticket.useDate.toDate().toDateString()}</td>
                    <td>{ticket.releaseDate.toDate().toDateString()}</td>
                    <td>{ticket.checkinGate}</td>
                </tr> 
            )}

        </table>
    </div>
    );
}

export default DanhSachVe;