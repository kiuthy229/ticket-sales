import LineChart from "./linechart";
import PieChart from "./piechart-goigiadinh";
const DashBoard = () =>{
    return(
    <div className="rendered-item">
        <h1 className="title">Thống kê</h1>
        <div><LineChart/></div>
        
        <div> 
            <p className="doanhthu">Tổng doanh thu theo tuần</p>
            <h1 className="sotien">525.145.000</h1><p className="dong">đồng</p>
        </div>
       
       <div>
            <PieChart/>
       </div>
    </div>)
}

export default DashBoard;