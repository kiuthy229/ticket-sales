import { render } from "@testing-library/react"
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import filter from "../../images/filter.png";
import edit from "../../images/edit.png";
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
} from '@material-ui/core';
import greenDot from "../../images/greenDot.png";
import redDot from "../../images/redDot.png";
import TaoVe from "../features/tao-ve";
import CapNhatVe from "../features/cap-nhat-ve";

interface IPack {
    pack:{
      no:number,
      packID:string,
      packName:string,
      applyDate:string,
      ticketPrice: number,
      comboPrice:number,
      expireDate:string,
      status:string,
    }[]
  }

const DanhSachGoiVe = () =>{

    const [tickets, setTickets] = useState<IPack["pack"]>([]);
    const [openCreate,setOpenCreate] = useState(false)
    const [openUpdate,setOpenUpdate] = useState(false)
    const packsCollectionRef = collection(db, "ticket-packs");
    useEffect( () => {

        const getTickets = async () => {
          const res = await getDocs(packsCollectionRef)
          .then( (res) => setTickets(res.docs.map((doc: any) => ({...doc.data(), key: doc.id}))))
        };
    
        getTickets();

        console.log(tickets)
      }, []);

      const togglePopupCreate = () => {
        setOpenCreate(!openCreate);
      }

      const togglePopupUpdate= () => {
        setOpenUpdate(!openUpdate);
      }

    const dangapdung = {
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
      padding:"3px 2px 2px 10px",
    };

    const chuaapdung = {
      backgroundColor: "#F8EBE8",
      border: "0.5px solid #FD5959",
      borderRadius: "4px",
      width: "70%",
      height: "60%",
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
      height: "60%",
      fontSize: "12px",
      display: "flex",
      justifyContent:"flex-start",
      alignItems: "center",
      color:"#FD5959",
      padding:"3px 2px 2px 10px"
    }

    return(
    <div className="ticket-list rendered-item">
        <h1 className="title">Danh sách gói vé</h1>

        <input className="search" type="text" placeholder="Tìm bằng số vé" />
        {/* <button className="locve">
            <img src={filter}/>
            Lọc vé
        </button> */}
        <button className="taove" onClick={()=>setOpenCreate(true)}>
            Thêm gói vé
        </button>
        <button className="csv">Xuất file (.csv)</button>
          
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
            {tickets.map((ticket) =>
                <tr className="table-content">
                    <td>{ticket.no}</td>
                    <td>{ticket.packID}</td>
                    <td>{ticket.packName}</td>
                    <td>{ticket.applyDate}</td>
                    <td>{ticket.expireDate}</td>
                    <td>{ticket.ticketPrice}</td>
                    {/* // ticket.useDate.toDate().toDateString() khi kiểu là timestamp */}
                    <td>{ticket.comboPrice}</td>
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
                      <button className="btn-update" onClick={()=>setOpenUpdate(true)}>
                        <img src={edit}/>
                        Cập nhật
                      </button>
                    </td>
                </tr> 
            )}

          </table>
          {!openUpdate && openCreate &&
              <TaoVe onClose={togglePopupCreate}/>
          }
          {!openCreate && openUpdate &&
            <CapNhatVe onClose={togglePopupUpdate}/>
          }

    </div>
    );
}

export default DanhSachGoiVe;