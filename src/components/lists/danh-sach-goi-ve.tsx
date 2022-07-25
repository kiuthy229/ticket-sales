
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { useEffect, useReducer, useState } from "react";
import { db } from "../../firebase-config";
import filter from "../../images/filter.png";
import edit from "../../images/edit.png";
import {
  Table,
  Typography,
} from '@material-ui/core';
import greenDot from "../../images/greenDot.png";
import redDot from "../../images/redDot.png";
import TaoVe from "../features/tao-ve";
import CapNhatVe from "../features/cap-nhat-ve";
import previous from "../../images/previous.png";
import next from "../../images/next.png";
import {CSVLink} from "react-csv"


interface IPack {
    pack:{
      id:string,
      no:number,
      packID:string,
      packName:string,
      applyDate:string,
      applyTime:string,
      ticketPrice: number,
      comboPrice:number,
      comboQuantity:number,
      expireDate:string,
      expireTime:string,
      status:string,
    }[]
  }
  type Pack ={
    pack:{
      id:string,
      no:number,
      packID:string,
      packName:string,
      applyDate:string,
      applyTime:string,
      ticketPrice: number,
      comboPrice:number,
      comboQuantity:number,
      expireDate:string,
      expireTime:string,
      status:string,
    }
  }

const DanhSachGoiVe = () =>{
    const [reducerValue, forceUpdate] = useReducer( x=> x+1,0)

    const [tickets, setTickets] = useState<IPack["pack"]>([]);
    const [openCreate,setOpenCreate] = useState(false)
    const [openUpdate,setOpenUpdate] = useState(false)
    const packsCollectionRef = collection(db, "ticket-packs");
    const [ticketId, setTicketId] = useState<number>(0)

    //SEARCH VARIABLES
    const [searchTerm, setSearchTerm] = useState("");
    const [output, setOutput]=useState<IPack ["pack"]>([]);

    //PAGINATION VARIABLES
    const [currentPage, setCurrentPage] = useState(1);
    const paginate = ((pageNumber:any) => setCurrentPage(pageNumber));
    const btnPrevious = ((pageNumber:any) => {if(currentPage>1){setCurrentPage(currentPage-1)}});
    const btnNext = ((pageNumber:any) => {if(currentPage<pageNumbers.length){setCurrentPage(currentPage+1)}});
    const [ticketsPerPage] = useState(10);
    const pageNumbers =[];


    useEffect( () => {

        const getTickets = async () => {
          const res = await getDocs(packsCollectionRef)
          .then( (res) => setTickets(res.docs.map((doc: any) => ({...doc.data(), id: doc.id}))))
        };
    
        getTickets();
      }, [reducerValue]);

    //OUTPUT WILL CHANGE WHEN TYPE IN SEARCH
    useEffect ( ()=> {
        setOutput([]);
        tickets.filter(val=>{
          if(val.packID.toLowerCase().includes(searchTerm)){
            setOutput(output=>[...output, val])
          }
        })
  
    }, [searchTerm])

    const togglePopupCreate = () => {
      setOpenCreate(!openCreate);
      forceUpdate()
    }

    const togglePopupUpdate= () => {
      setOpenUpdate(!openUpdate);
      forceUpdate()
    }

    const openPopupUpdate = (ticketID:any) => {
      setOpenUpdate(true);
      console.log(ticketID)
      setTicketId(ticketID);
    }

    const headers = [
      {label:"no", key:"no"},
      {label:"packID", key:"packID"},
      {label:"packName", key:"packName"},
      {label:"applyDate", key:"applyDate"},
      {label:"expireDate", key:"expireDate"},
      {label:"ticketPrice", key:"ticketPrice"},
      {label:"status", key:"status"},
    ]

    const csvLink = {
      filename: "file.csv",
      headers: headers,
      data: tickets
    }

    var indexOfLastPost = currentPage * ticketsPerPage;
    var indexOfFirstPost = indexOfLastPost - ticketsPerPage;
    var currentTickets = tickets.slice(indexOfFirstPost, indexOfLastPost);
    
    for (let i = 1; i <= Math.ceil(tickets.length / ticketsPerPage); i++) {
      pageNumbers.push(i);
    }

    const dangapdung = {
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
      padding:"3px 2px 2px 10px",
    };

    const chuaapdung = {
      backgroundColor: "#F8EBE8",
      border: "0.5px solid #FD5959",
      borderRadius: "4px",
      width: "70%",
      height: "70%",
      fontSize: "12px",
      display: "flex",
      justifyContent:"flex-start",
      alignItems: "center",
      color:"#FD5959",
      padding:"3px 2px 2px 10px"
    }

    const tat = {
      backgroundColor: "#F8EBE8",
      border: "0.5px solid #FD5959",
      borderRadius: "4px",
      width: "35%",
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
    <div className="ticket-list rendered-item">
        <h1 className="title">Danh sách gói vé</h1>

        <input className="search" type="text" placeholder="Tìm bằng số vé"  onChange={(e)=>setSearchTerm(e.target.value)}/>
        {/* <button className="locve">
            <img src={filter}/>
            Lọc vé
        </button> */}
        <button className="taove" onClick={()=>setOpenCreate(true)}>
            Thêm gói vé
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
              <tr  className="table-heading"> 
                  <th>STT</th>
                  <th>Mã gói</th>
                  <th>Tên gói vé</th>
                  <th>Ngày áp dụng</th>
                  <th>Ngày hết hạn</th>
                  <th>Gía vé (VNĐ)</th>
                  <th>Gía combo</th>
                  <th>Tình trạng</th>
                  <th> </th>
              </tr>
            {!searchTerm && currentTickets.map((ticket) =>
                <tr className="table-content" key={ticket.id}>
                    <td>{ticket.no}</td>
                    <td>{ticket.packID}</td>
                    <td>{ticket.packName}</td>
                    <td>{ticket.applyDate}</td>
                    <td>{ticket.expireDate}</td>
                    <td>{ticket.ticketPrice}</td>
                    {/* // ticket.useDate.toDate().toDateString() khi kiểu là timestamp */}
                    <td>{ticket.comboPrice} / {ticket.comboQuantity} vé</td>
                    <td>
                      { ticket.status === "Đang áp dụng" &&
                      <Typography style={dangapdung}>
                        <img src={greenDot} className="dots"/>
                        {ticket.status}
                      </Typography>}
                      { ticket.status === "Chưa áp dụng" &&
                      <Typography style={chuaapdung}>
                        <img src={redDot} className="dots"/>
                        {ticket.status}
                      </Typography>}
                      { ticket.status === "Tắt" &&
                      <Typography style={tat}>
                        <img src={redDot} className="dots"/>
                        {ticket.status}
                      </Typography>}
                    </td>
                    <td>
                      <button className="btn-update" onClick={()=>{openPopupUpdate(ticket.id)}}>
                        <img src={edit}/>
                        Cập nhật
                      </button>
                    </td>
                </tr> 
            )}

            {searchTerm && output.map((ticket) =>
                <tr className="table-content" key={ticket.id}>
                    <td>{ticket.no}</td>
                    <td>{ticket.packID}</td>
                    <td>{ticket.packName}</td>
                    <td>{ticket.applyDate}</td>
                    <td>{ticket.expireDate}</td>
                    <td>{ticket.ticketPrice}</td>
                    {/* // ticket.useDate.toDate().toDateString() khi kiểu là timestamp */}
                    <td>{ticket.comboPrice} / {ticket.comboQuantity} vé</td>
                    <td>
                      { ticket.status === "Đang áp dụng" &&
                      <Typography style={dangapdung}>
                        <img src={greenDot} className="dots"/>
                        {ticket.status}
                      </Typography>}
                      { ticket.status === "Chưa áp dụng" &&
                      <Typography style={chuaapdung}>
                        <img src={redDot} className="dots"/>
                        {ticket.status}
                      </Typography>}
                      { ticket.status === "Tắt" &&
                      <Typography style={tat}>
                        <img src={redDot} className="dots"/>
                        {ticket.status}
                      </Typography>}
                    </td>
                    <td>
                      <button className="btn-update" onClick={()=>{openPopupUpdate(ticket.id)}}>
                        <img src={edit}/>
                        Cập nhật
                      </button>
                    </td>
                </tr> 
            )}

          </table>
          

          {!openUpdate && openCreate &&
              <TaoVe onClose={togglePopupCreate} setCloseCreate={togglePopupCreate} ticketLength={tickets.length}/>
          }
          {!openCreate && openUpdate &&
            <CapNhatVe onClose={togglePopupUpdate} setCloseUpdate={togglePopupUpdate} ticketID={ticketId}/>
          }

    </div>
    );
}

export default DanhSachGoiVe;