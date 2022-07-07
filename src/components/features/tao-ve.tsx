import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase-config";

const TaoVe = (props:any) => {

    const [ticketName, setTicketName]= useState('');
    const [newUseDate, setUseDate]= useState('');
    const [newUseTime, setUseTime] = useState('')
    const [newExpireDate, setExpireDate]= useState('');
    const [newExpireTime, setExpireTime] = useState('');
    const [newSingleTicket, setSingleTicket]= useState(true);
    const [newComboTicket, setComboTicket]= useState(false);
    const [newStatus, setStatus]= useState("")

    const [currentPage, setCurrentPage] = useState(1)
    const [ticketsPerPage,setTicketPerPage] =useState(15)

    useEffect(()=>{
        
    })

    const ticketsCollectionRef = collection(db, "ticket-packs");
    const createTicket = async (ticketName: string) => {
        try {
          await addDoc(ticketsCollectionRef, {packID: "ALT20210501",packName: ticketName, applyDate: newUseDate, useTime: newUseTime, expireDate: newExpireDate, expireTime: newExpireTime, ticketPrice: newSingleTicket, comboPrice: newComboTicket, status:newStatus })
          console.log("ticket created")
        } catch (err: any) {
          console.error(err);
          alert(err.message);
        }
      }
  
      const register = () => {
        createTicket(ticketName);
      };

    return(
        <div className="createticket inner">
            <h1 className="header"> Tạo gói vé</h1>
            <label className="ticketname-label">Tên gói vé</label>
            <input className="ticketname-input" placeholder="Ticket name" onChange={(e: any) => {setTicketName(e.target.value)}}/>

            <label className="dateuse-label">Ngày áp dụng</label>
            <input className="dateuse-input" type="date" onChange={(e: any) => {setUseDate(e.target.value)}}/>
            <input className="dateuse-time" type="time" onChange={(e: any) => {setUseTime(e.target.value)}}/>

            <label className="expiredate-label">Ngày hết hạn</label>
            <input className="expiredate-input" type="date" onChange={(e: any) => {setExpireDate(e.target.value)}}/>
            <input className="expiredate-time" type="time" onChange={(e: any) => {setExpireTime(e.target.value)}}/>

            <label className="price-label">Gía vé áp dụng</label>
            <div className="single-ticket">
                <input type="checkbox" checked/>
                <label>Vé lẻ (vnđ/vé) với giá</label>
                <input className="single-ticket-input" type="number" onChange={(e: any) => {setSingleTicket(e.target.value)}}/>
                <label>/ vé</label>
            </div>
            <div className="combo-ticket">
                <input type="checkbox" checked/>
                <label className="combo-ticket-label">Combo vé với giá</label>
                <input className="combo-ticket-input" type="number" onChange={(e: any) => {setComboTicket(e.target.value)}}/>
                <label>/ vé</label>
            </div>

            <div>
                <label className="label-status">Tình trạng</label>
                <select className="status" onChange={(event) => setStatus(event.target.value)}>
                    <option value="Đang áp dụng">Đang áp dụng</option>
                    <option value="Chưa áp dụng">Chưa áp dụng</option>
                </select>
            </div>
            

            <div className="button-holder">
                <button className="huy" onClick={props.onClose}>Hủy</button>
                <button className="luu" onClick={register}>Lưu</button>
            </div>

        </div>
    );
}
export default TaoVe;