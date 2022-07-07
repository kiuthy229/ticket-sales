import { Typography } from "@material-ui/core";
import { render } from "@testing-library/react"
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import filter from "../../images/filter.png";
import greenDot from "../../images/greenDot.png";
import redDot from "../../images/redDot.png";
import grayDot from "../../images/grayDot.png";
import LocVe from "../features/loc-ve";

interface ITicket {
    ticket:{
      no:number,
      id:string,
      eventName:string,
      ticketNumber:number,
      useDate:string,
      releaseDate:string,
      useStatus:string,
      checkinGate:string
    }[]
  }

const DanhSachVe = () =>{

    const [tickets, setTickets] = useState<ITicket["ticket"]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [output, setOutput]=useState<ITicket ["ticket"]>([]);
    const usersCollectionRef = collection(db, "tickets");
    const [openFilter,setOpenFilter] = useState(false)
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

    const togglePopup = () => {
      setOpenFilter(!openFilter);
    }

    const dasudung = {
      backgroundColor: "#EAF1F8",
      border: "0.5px solid #919DBA",
      borderRadius: "4px",
      width: "60%",
      height: "60%",
      fontSize: "12px",
      display: "flex",
      justifyContent:"flex-start",
      alignItems: "center",
      color:"#919DBA",
      padding:"3px 2px 2px 10px",
    };

    const chuasudung = {
      backgroundColor: "#DEF7E0",
      border: "0.5px solid #03AC00",
      borderRadius: "4px",
      width: "70%",
      height: "60%",
      fontSize: "12px",
      display: "flex",
      justifyContent:"flex-start",
      alignItems: "center",
      color:"#03AC00",
      padding:"3px 2px 2px 10px"
    }

    const hethan = {
      backgroundColor: "#F8EBE8",
      border: "0.5px solid #FD5959",
      borderRadius: "4px",
      width: "50%",
      height: "60%",
      fontSize: "12px",
      display: "flex",
      justifyContent:"flex-start",
      alignItems: "center",
      color:"#FD5959",
      padding:"3px 2px 2px 10px"
    }

    return(
    <div className="ticket-list">
        <h1 className="title">Danh sách vé</h1>

        <input className="search" type="text" placeholder="Tìm bằng số vé" onChange={(e)=>setSearchTerm(e.target.value)}/>
        <button className="locve" onClick={()=>setOpenFilter(true)}>
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
                  <td>
                      { ticket.useStatus === "Đã sử dụng" &&
                      <Typography style={dasudung}>
                        <img src={grayDot} className="dots"/>
                        {ticket.useStatus}
                      </Typography>}
                      { ticket.useStatus === "Chưa sử dụng" &&
                      <Typography style={chuasudung}>
                        <img src={greenDot} className="dots"/>
                        {ticket.useStatus}
                      </Typography>}
                      { ticket.useStatus === "Hết hạn" &&
                      <Typography style={hethan}>
                        <img src={redDot} className="dots"/>
                        {ticket.useStatus}
                      </Typography>}
                    </td>
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
                  <td>
                      { ticket.useStatus === "Đã sử dụng" &&
                      <Typography style={dasudung}>{ticket.useStatus}</Typography>}
                      { ticket.useStatus === "Chưa sử dụng" &&
                      <Typography style={chuasudung}>{ticket.useStatus}</Typography>}
                      { ticket.useStatus === "Hết hạn" &&
                      <Typography style={hethan}>{ticket.useStatus}</Typography>}
                    </td>
                  <td>{ticket.useDate}</td>
                  {/* // ticket.useDate.toDate().toDateString() khi kiểu là timestamp */}
                  <td>{ticket.releaseDate}</td>
                  <td>{ticket.checkinGate}</td>
              </tr> 
          )
          }
          
            

        </table>
        {openFilter &&
              <LocVe onClose={togglePopup}/>
        }
    </div>
    );
}

export default DanhSachVe;