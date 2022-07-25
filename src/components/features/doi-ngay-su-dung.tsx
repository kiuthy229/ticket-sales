import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useReducer, useState } from "react";
import { db } from "../../firebase-config";

const DoiNgaySuDung = (props:any) => {
    const [newUseDate, setUseDate] = useState("")
    // console.log(props.ticketID)

    const updateTicket = async (id:string, useDate:string) => {
        const ticketDoc = doc(db,"tickets", id)
        const newFields ={useDate: newUseDate}
        await updateDoc(ticketDoc, newFields);
        console.log("update successful")
        props.setCloseChangeDate(true)
    }

    return(
        <div className="change-date">
            <h1 className="header-update">Đổi ngày sử dụng vé</h1>
            <label className="changeDate-id-label">Số vé</label>
            <p className="changeDate-id">{props.soVe}</p>

            <label className="changeDate-type-label">Loại vé</label>
            <p className="changeDate-type" placeholder={props.loaiVe}>{props.loaiVe}</p>

            <label className="changeDate-event-label">Tên sự kiện</label>
            <p className="changeDate-event" >{props.tenSuKien}</p>

            <label className="changeDate-expired-label">Hạn sử dụng</label>
            <input className="changeDate-expired" type="date" defaultValue={props.hanSuDung} onChange={(e)=>setUseDate(e.target.value)}/>
            

            <div className="button-holder">
                <button className="huy-changeDate" onClick={props.onClose}>Hủy</button>
                <button className="luu-changeDate" onClick={()=>updateTicket(props.ticketID,newUseDate)}>Lưu</button>
            </div>

        </div>
    );
}
export default DoiNgaySuDung