import { useState } from "react";

const CapNhatVe = () => {
    const [ticketName, setTicketName]= useState('');
    const [useDate, setUseDate]= useState('');
    const [expireDate, setExpireDate]= useState('');
    const [singleTicket, setSingleTicket]= useState(true);
    const [comboTicket, setComboTicket]= useState(false);
    return(
        <div className="createticket inner">
            <h1 className="header"> Tạo gói vé</h1>
            <label className="ticketname-label">Tên gói vé</label>
            <input className="ticketname-input" placeholder="Ticket name" onChange={(e: any) => {setTicketName(e.target.value)}}/>

            <label className="dateuse-label">Ngày áp dụng</label>
            <input className="dateuse-input" type="date" onChange={(e: any) => {setUseDate(e.target.value)}}/>
            <input className="dateuse-time" type="time" onChange={(e: any) => {setUseDate(e.target.value)}}/>

            <label className="expiredate-label">Ngày hết hạn</label>
            <input className="expiredate-input" type="date" onChange={(e: any) => {setExpireDate(e.target.value)}}/>
            <input className="expiredate-time" type="time" onChange={(e: any) => {setExpireDate(e.target.value)}}/>

            <label className="price-label">Gía vé áp dụng</label>
            <div className="single-ticket">
                <input type="checkbox" checked/>
                <label>Vé lẻ (vnđ/vé) với giá</label>
                <input className="single-ticket-input" type="number"/>
                <label>/ vé</label>
            </div>
            <div className="combo-ticket">
                <input type="checkbox" checked/>
                <label className="combo-ticket-label">Combo vé với giá</label>
                <input className="combo-ticket-input" type="number"/>
                <label>/ vé</label>
            </div>

            <div>
                <label className="label-status">Tình trạng</label>
                <select className="status">
                    <option value={0}>Đang áp dụng</option>
                    <option value={1}>Chưa áp dụng</option>
                </select>
            </div>
            

            <div className="button-holder">
                <button className="huy">Hủy</button>
                <button className="luu">Lưu</button>
            </div>

        </div>
    );
}
export default CapNhatVe;