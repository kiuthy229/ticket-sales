import { render } from "@testing-library/react"

const DanhSachVe = () =>{
    return(
    <div className="ticket-list">
        <h1 className="title">Danh sách vé</h1>

        <input className="search" type="text" placeholder="tìm bằng số vé" />
        <button className="locve">Lọc vé</button>
        <button className="csv">Xuất csv</button>

        <table className="list-table">
            <tr className="table-heading">
                <th>STT</th>
                <th>Booking code</th>
                <th>Số vé</th>
                <th>Tình trạng sử dụng</th>
                <th>Ngày sử dụng</th>
                <th>Ngày xuất vé</th>
                <th>Cổng checkin</th>
            </tr>
            <tr className="table-content">
                {/* <td>1</td>
                <td>2</td>
                <td>null</td>
                <td>null</td>
                <td>null</td>
                <td>null</td>
                <td>null</td> */}
            </tr>
        </table>
    </div>
    );
}

export default DanhSachVe;