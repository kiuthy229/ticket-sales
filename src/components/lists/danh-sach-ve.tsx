import { Typography } from "@material-ui/core";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { useEffect, useReducer, useState } from "react";
import { db } from "../../firebase-config";
import filter from "../../images/filter.png";
import greenDot from "../../images/greenDot.png";
import redDot from "../../images/redDot.png";
import grayDot from "../../images/grayDot.png";
import LocVe from "../features/loc-ve";
import DoiNgaySuDung from "../features/doi-ngay-su-dung";
import previous from "../../images/previous.png"
import next from "../../images/next.png"
import changeDate from "../../images/changeDate.png"
import { CSVLink } from "react-csv"

interface ITicket {
    ticket:{
      key:string,
      no:number,
      ticketID:string,
      eventName:string,
      ticketNumber:number,
      useDate:string,
      releaseDate:string,
      useStatus:string,
      checkinGate:string
    }[]
  }

const DanhSachVe = () =>{

    //SEARCH AND OUTPUT
    const [searchTerm, setSearchTerm] = useState("");
    const [output, setOutput]=useState<ITicket ["ticket"]>([]);
    const ticketsCollectionRef = collection(db, "tickets");

    //Popup
    const [openFilter,setOpenFilter] = useState(false)
    const [openFilterFirstTime,setOpenFilterFirstTime] = useState(false)
    const [openChangeDate,setOpenChangeDate] = useState(false)
    const [ticketId, setTicketId] = useState("")
    const [ticketKey, setTicketKey] = useState<number>(0)

    //FILTER
    const [filterState, setFilterState]=useState<ITicket ["ticket"]>([]);

    //PAGINATION VARIABLES
    const [currentPage, setCurrentPage] = useState(1);
    const paginate = ((pageNumber:any) => setCurrentPage(pageNumber));
    const btnPrevious = ((pageNumber:any) => {if(currentPage>1){setCurrentPage(currentPage-1)}});
    const btnNext = ((pageNumber:any) => {if(currentPage<pageNumbers.length){setCurrentPage(currentPage+1)}});
    const [ticketsPerPage] = useState(10);
    const indexOfLastPost = currentPage * ticketsPerPage;
    const indexOfFirstPost = indexOfLastPost - ticketsPerPage;
    
    //VARIABLES
    const [tickets, setTickets] = useState<ITicket["ticket"]>([]);
    const [soVe, setSoVe] = useState("")
    const [loaiVe, setLoaiVe] = useState("")
    const [tenSuKien, setTenSuKien] = useState("")
    const [hanSuDung, setHanSuDung] = useState("")

    const [reducerValue, forceUpdate] = useReducer( x=> x+1,0)
    const pageNumbers =[];

    //GET ALL TICKETS TO DISPLAY
    useEffect( () => {

        const getTickets = async () => {
          const res = await getDocs(ticketsCollectionRef)
          .then( (res) => setTickets(res.docs.map((doc: any) => ({...doc.data(), key: doc.id}))))
        };
    
        getTickets();
      }, [reducerValue]);

    //PAGINATE TICKETS
    const currentTickets = tickets.slice(indexOfFirstPost, indexOfLastPost);
    for (let i = 1; i <= Math.ceil(tickets.length / ticketsPerPage); i++) {
      pageNumbers.push(i);
    }

    //SEARCH TICKETS
    useEffect ( ()=> {
      setOutput([]);
      tickets.filter(val=>{
        if(val.ticketNumber.toString().includes(searchTerm)){
          setOutput(output=>[...output, val])
        }
      })

    }, [searchTerm, reducerValue])

    //HEADERS FOR CSV
    const headers = [
      {label:"no", key:"no"},
      {label:"id", key:"id"},
      {label:"ticketNumber", key:"ticketNumber"},
      {label:"eventName", key:"eventName"},
      {label:"useStatus", key:"nouseStatus"},
      {label:"useDate", key:"useDate"},
      {label:"releaseDate", key:"releaseDate"},
      {label:"checkinGate", key:"checkinGate"}
    ]
    const csvLink = {
      filename: "file.csv",
      headers: headers,
      data: tickets
    }

    //SET OUTPUT WHENEVER FILTER VALUES CHANGED
    useEffect(()=>{
      setOutput(filterState)
      setTickets([])
      console.log(filterState)
    },[filterState])

    const togglePopup = () => {
      setOpenFilter(!openFilter);
      forceUpdate()
    }

    const toggleOpenFilter = () => {
      setOpenFilter(!openFilter)
      setOpenFilterFirstTime(true)
    }

    //CHANGE DAY USE A TICKET
    const toggleChangeDate = (key:any, ticketNumber:any, ticketType:any, ticketName:any, useDate:any) => {
      setOpenChangeDate(!openChangeDate);
      setTicketKey(key)
      setSoVe(ticketNumber)
      setLoaiVe(ticketType)
      setTenSuKien(ticketName)
      setHanSuDung(useDate)
      forceUpdate()
    }

    //STYLING FOR TAGS
    const dasudung = {
      backgroundColor: "#EAF1F8",
      border: "0.5px solid #919DBA",
      borderRadius: "4px",
      width: "60%",
      height: "70%",
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
      height: "70%",
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
      height: "70%",
      fontSize: "12px",
      display: "flex",
      justifyContent:"flex-start",
      alignItems: "center",
      color:"#FD5959",
      padding:"3px 2px 2px 10px"
    }
    const csvStyle = {
      textDecoration:"none",
      fontSize: "12px",
      alignItems: "center",
      color:"#FF993C",
    }

    return(
    <div className="ticket-list">
        <h1 className="title" onClick={()=>setOpenFilter(!openFilter)}>Danh sách vé</h1>

        <input className="search" type="text" placeholder="Tìm bằng số vé" onChange={(e)=>setSearchTerm(e.target.value)}/>
        <button className="locve" onClick={toggleOpenFilter}>
            <img src={filter}/>
            Lọc vé
        </button>
        <button className="csv">
          <CSVLink {...csvLink} style={csvStyle}>
            Xuất file (.csv)
          </CSVLink>
        </button>

        <div className='pagination'>
          {pageNumbers.map(number => (
            <div>
                <button className="previous" onClick={() => btnPrevious(number)}>
                  <img src={previous} alt="previous" />
                </button>

                <div key={number} className='page-item' onClick={() => paginate(number)} >
                  <a className='page-link'>
                  {number}
                  </a>
                </div>

                <button className="next" onClick={() => btnNext(number)}>
                  <img src={next} alt="next"/>
                </button>
            </div>
          ))}
        </div>

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
            {filterState && openFilterFirstTime == false &&
              currentTickets.map((ticket) =>
                <tr className="table-content" key={ticket.key}>
                    <td>{ticket.no}</td>
                    <td>{ticket.ticketID}</td>
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
                    <td>
                      <button className="changeDate" onClick={()=>{toggleChangeDate(ticket.key, ticket.ticketNumber, ticket.checkinGate, ticket.eventName, ticket.useDate)}}>
                        <img src={changeDate} />
                      </button>
                    </td>
                </tr> 
            )}

            {filterState && !searchTerm &&
              filterState.map((ticket) =>
                <tr className="table-content">
                    <td>{ticket.no}</td>
                    <td>{ticket.ticketID}</td>
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
                    <td>
                      <button className="changeDate" onClick={()=>{toggleChangeDate(ticket.key, ticket.ticketNumber, ticket.checkinGate, ticket.eventName, ticket.useDate)}}>
                        <img src={changeDate} />
                      </button>
                    </td>
                </tr> 
            )
            }

            {searchTerm && !filterState &&
              output.map((ticket) =>
                <tr className="table-content">
                    <td>{ticket.no}</td>
                    <td>{ticket.ticketID}</td>
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
                    <td>
                      <button className="changeDate" onClick={()=>{toggleChangeDate(ticket.key, ticket.ticketNumber, ticket.checkinGate, ticket.eventName, ticket.useDate)}}>
                        <img src={changeDate} />
                      </button>
                    </td>
                </tr> 
            )
            }

            {searchTerm && filterState &&
              output.map((ticket) =>
                <tr className="table-content">
                    <td>{ticket.no}</td>
                    <td>{ticket.ticketID}</td>
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
                    <td>
                      <button className="changeDate" onClick={()=>{toggleChangeDate(ticket.key, ticket.ticketNumber, ticket.checkinGate, ticket.eventName, ticket.useDate)}}>
                        <img src={changeDate} />
                      </button>
                    </td>
                </tr> 
            )
            } 
        </table>

        {openChangeDate && !openFilter &&
              <DoiNgaySuDung onClose={toggleChangeDate} setCloseChangeDate={toggleChangeDate} ticketID={ticketKey} soVe={soVe} loaiVe={loaiVe} tenSuKien={tenSuKien} hanSuDung={hanSuDung}/>
        }
        {openFilter &&
              <LocVe onClose={togglePopup} setParentState={setFilterState} setCloseFilter={togglePopup}/>
        }
    </div>
    );
}

export default DanhSachVe;