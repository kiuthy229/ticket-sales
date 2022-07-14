import { useEffect, useState } from "react";

const DoiNgaySuDung = (props:any) => {
    console.log(props.tenSuKien)

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
            <input className="changeDate-expired" type="date" defaultValue={props.hanSuDung}/>
            

            <div className="button-holder">
                <button className="huy-changeDate" onClick={props.onClose}>Hủy</button>
                <button className="luu-changeDate" >Lưu</button>
            </div>

        </div>
    );
}
export default DoiNgaySuDung