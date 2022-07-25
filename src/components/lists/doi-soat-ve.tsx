
import { Typography } from "@material-ui/core";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import filter from "../../images/filter.png";
import previous from "../../images/previous.png"
import next from "../../images/next.png"
import { CSVLink } from "react-csv"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import moment from "moment";
import Calendar from "../calendar/lich";

interface ITicket {
    ticket:{
      no:number,
      ticketID:string,
      ticketNumber:number,
      ticketType:string,
      useDate:string,
      checkinGate:string,
      controlStatus:string
    }[]
  }

const DoiSoatVe = () =>{

    //RADIO BUTTONS
    const [value, setValue] = useState('');

    //FILTER VARIABLES
    const [tickets, setTickets] = useState<ITicket["ticket"]>([]);
    const usersCollectionRef = collection(db, "tickets");
    const [stateTerm, setStateTerm] = useState("");
    const [fromdate, setFromDate] = useState("");
    const [todate, setToDate] = useState("");
    const [output, setOutput]=useState<ITicket ["ticket"]>([]);
    var [outputDate, setOutputDate] = useState<ITicket ["ticket"]>([]);
    var [filter, setOnFilter]=useState(false)

    const [startDate, setStartDate] = useState<number>();
    const [endDate, setEndDate] = useState<number>();

    //SEARCH VARIABLES
    const [searchTerm, setSearchTerm] = useState("");
    const [outputSearch, setOutputSearch]=useState<ITicket ["ticket"]>([]);

    //PAGINATION VARIABLES
    const [currentPage, setCurrentPage] = useState(1);
    const paginate = ((pageNumber:any) => setCurrentPage(pageNumber));
    const btnPrevious = ((pageNumber:any) => {if(currentPage>1){setCurrentPage(currentPage-1)}});
    const btnNext = ((pageNumber:any) => {if(currentPage<pageNumbers.length){setCurrentPage(currentPage+1)}});
    const [ticketsPerPage] = useState(10);

    const pageNumbers =[];

    useEffect( () => {
        const getTickets = async () => {
          const res = await getDocs(usersCollectionRef)
          .then( (res) => setTickets(res.docs.map((doc: any) => ({...doc.data(), key: doc.id}))))
        };
    
        getTickets();
      }, []);

    //OUTPUT WILL CHANGE WHEN TYPE IN SEARCH
        useEffect ( ()=> {
            setOutputSearch([]);
            tickets.filter(val=>{
              if(val.ticketID.toLowerCase().includes(searchTerm)){
                setOutputSearch(output=>[...output, val])
              }
            })
      
    }, [searchTerm])

    //CHANGE VALUES OF RADIO BUTTON
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
      };
    useEffect(()=>{
        setStateTerm(value)
    },[value])

    //GET DATE FROM CALENDAR
    const getStartDate = () => {
        let temp = Number.POSITIVE_INFINITY;
        return moment(temp);
      };

    const getEndDate = () => {
        let temp = 0;
        return moment(temp);
    };

    //FILTER DATE CHOSEN
    const onFilter = () => {
        setOnFilter(true)
        setOutput([]);
        var chosenStartDay = Number(fromdate.slice(8,10))
        var chosenStartMonth = Number(fromdate.slice(5,7))

        var chosenEndDay = Number(todate.slice(8,10))
        var chosenEndMonth = Number(todate.slice(5,7))
        setOutputDate([]);

        tickets.filter(val=>{ 
            if (chosenStartMonth === chosenEndMonth){
                //tinh ngay trong cung2 thang
                // setOutputDate([]);
                if (Number(val.useDate.slice(5,7)) !== chosenStartMonth && chosenEndMonth !== Number(val.useDate.slice(5,7))){
                    console.log("out of scope 1")
                }
                if ((Number(val.useDate.slice(5,7)) == chosenStartMonth) 
                    && (Number(val.useDate.slice(8,10)) >= chosenStartDay && Number(val.useDate.slice(8,10)) <= chosenEndDay)){
                        //console.log(Number(val.useDate.slice(5,7)), "and", chosenEndMonth)
                        outputDate.push(val)
                }
            }
            else if (chosenStartMonth !== chosenEndMonth){
                if(Number(val.useDate.slice(5,7)) >= chosenStartMonth && Number(val.useDate.slice(5,7))<=chosenEndMonth){
                  if(Number(val.useDate.slice(5,7)) > chosenStartMonth || Number(val.useDate.slice(5,7))<chosenEndMonth){
                    outputDate.push(val)
                    console.log(outputDate)
                    if (Number(val.useDate.slice(8,10)) > chosenEndDay && Number(val.useDate.slice(5,7)) === chosenEndMonth){
                        var outScopeDate = Number(val.useDate.slice(8,10));
                        for (var i = 0; i < outputDate.length; i++) {
                            if (Number(outputDate[i].useDate.slice(8,10)) == outScopeDate) {
                                var spliced = outputDate.splice(i, 1);
                                console.log("removed day")
                            }
                        }
                    }
                  }      
                  else if(Number(val.useDate.slice(5,7)) == chosenStartMonth){
                    if(Number(val.useDate.slice(8,10)) >= chosenStartDay){
                      outputDate.push(val)
                      console.log(outputDate)
                      if (Number(val.useDate.slice(8,10)) > chosenEndDay && Number(val.useDate.slice(5,7)) === chosenEndMonth){
                      var outScopeDate = Number(val.useDate.slice(8,10));
                        for (var i = 0; i < outputDate.length; i++) {
                            if (Number(outputDate[i].useDate.slice(8,10)) == outScopeDate) {
                                  var spliced = outputDate.splice(i, 1);
                                  console.log("removed day")
                                }
                            }
                            }
                    }
                  }    
                  else if(Number(val.useDate.slice(5,7)) == chosenEndMonth){
                    if(Number(val.useDate.slice(8,10)) <= chosenEndDay){
                      outputDate.push(val)
                      console.log(outputDate)
                    }
                  }            
                            
                }
                else {
                    console.log("no results because the date chosen is out of scope")
                }
            }
        })

        //console.log(outputDate)

        outputDate.filter(val=>{
                if ( stateTerm === "Tất cả"){
                    setOutput(outputDate)
                }
                else{
                    if(val.controlStatus === stateTerm){
                            setOutput(outputDate=>[...outputDate, val])
                            //console.log(val)
                    }
                }            
        })
        
    } 

    //HEADERS FOR CSV
    const headers = [
        {label:"no", key:"no"},
        {label:"id", key:"id"},
        {label:"ticketNumber", key:"ticketNumber"},
        {label:"useDate", key:"useDate"},
        {label:"ticketType", key:"ticketType"},
        {label:"checkinGate", key:"checkinGate"},
        {label:"status", key:"status"},
      ]
  
    //EXPORT CSV
    const csvLink = {
        filename: "file.csv",
        headers: headers,
        data: tickets
    }

    //PAGINATION
    const indexOfLastPost = currentPage * ticketsPerPage;
    const indexOfFirstPost = indexOfLastPost - ticketsPerPage;
    const currentTickets = tickets.slice(indexOfFirstPost, indexOfLastPost);
    useEffect(()=>{
      console.log(currentTickets)     
    },[tickets])
    
    for (let i = 1; i <= Math.ceil(tickets.length / ticketsPerPage); i++) {
      pageNumbers.push(i);
    }

    useEffect(()=>{
        console.log(todate)
    },[todate])

    const chuadoisoat = {
        color: " #A5A8B1",
        fontSize:"13px",
        fontStyle: "italic"
    }
    
    const dadoisoat = {
        color: "#FD5959",
        fontSize:"13px",
        fontStyle: "italic"
    }

    const csvStyle = {
        textDecoration:"none",
        fontSize: "12px",
        alignItems: "center",
        color:"#FF993C",
      }
    return(
    <div className="">
        <div className="control-item">
            <h1 className="title">Đối soát vé</h1>

            <input className="search" type="text" placeholder="Tìm bằng số vé"  onChange={(e)=>setSearchTerm(e.target.value)}/>
            {!stateTerm &&
                <button className="doisoat">Chốt đối soát</button>
            }

            {stateTerm.includes("Chưa") &&
                <button className="doisoat">Chốt đối soát</button>
            }

            {stateTerm.includes("Tất cả") &&
                <button className="doisoat">Chốt đối soát</button>
            }

            {stateTerm === "Đã đối soát" &&
                <button className="csv-doisoat">
                    <CSVLink {...csvLink} style={csvStyle}>
                        Xuất file (.csv)
                    </CSVLink>
                </button>
            }

            <div className='pagination'>
                {pageNumbers.map(number => (
                    <div>
                        <button className="previous" onClick={() => btnPrevious(number)}>
                        <img src={previous} alt="previous"/>
                        </button>

                        <div key={number} className='page-item' onClick={() => paginate(number)}>
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
            
                <table className="control-table">
                        <tr className="control-table-heading">
                            <th>STT</th>
                            <th>Booking code</th>
                            <th>Số vé</th>
                            <th>Ngày sử dụng</th>
                            <th>Tên loại vé</th>
                            <th>Cổng checkin</th>
                            <th className="invisible">Trạng thái</th>
                        </tr>
                        {!searchTerm && filter==false &&
                            tickets.map((ticket) =>
                            <tr className="control-table-content">
                                    <td>{ticket.no}</td>
                                    <td>{ticket.ticketID}</td>
                                    <td>{ticket.ticketNumber}</td>
                                    <td>{ticket.useDate}</td>
                                    <td>{ticket.ticketType}</td>
                                    <td>{ticket.checkinGate}</td>
                                    <td>
                                        { ticket.controlStatus === "Chưa đối soát" &&
                                        <Typography style={chuadoisoat}>{ticket.controlStatus}</Typography>}
                                        { ticket.controlStatus === "Đã đối soát" &&
                                        <Typography style={dadoisoat}>{ticket.controlStatus}</Typography>}
                                    </td>
                            </tr> 
                        )}

                        {output && 
                            output.map((ticket) =>
                                <tr className="control-table-content">
                                    <td>{ticket.no}</td>
                                    <td>{ticket.ticketID}</td>
                                    <td>{ticket.ticketNumber}</td>
                                    <td>{ticket.useDate}</td>
                                    <td>{ticket.ticketType}</td>
                                    <td>{ticket.checkinGate}</td>
                                    <td>
                                        { ticket.controlStatus === "Chưa đối soát" &&
                                        <Typography style={chuadoisoat}>{ticket.controlStatus}</Typography>}
                                        { ticket.controlStatus === "Đã đối soát" &&
                                        <Typography style={dadoisoat}>{ticket.controlStatus}</Typography>}
                                    </td>
                                    </tr> 
                        )}

                        {searchTerm &&
                            outputSearch.map((ticket) =>
                                <tr className="control-table-content">
                                    <td>{ticket.no}</td>
                                    <td>{ticket.ticketID}</td>
                                    <td>{ticket.ticketNumber}</td>
                                    <td>{ticket.useDate}</td>
                                    <td>{ticket.ticketType}</td>
                                    <td>{ticket.checkinGate}</td>
                                    <td>
                                        { ticket.controlStatus === "Chưa đối soát" &&
                                        <Typography style={chuadoisoat}>{ticket.controlStatus}</Typography>}
                                        { ticket.controlStatus === "Đã đối soát" &&
                                        <Typography style={dadoisoat}>{ticket.controlStatus}</Typography>}
                                    </td>
                                    </tr> 
                        )}
                    

                </table>
        </div>
        <div className="filter-item">
            <h1 className="control-filter-heading">Lọc vé</h1>
            <p className="control-filter">Tình trạng đối soát</p>
            <div className="control-filter-options">
                <RadioGroup
                    aria-labelledby="demo-error-radios"
                    name="quiz"
                    value={value}
                    onChange={handleRadioChange}
                >
                    <FormControlLabel id="tat-ca" name="status" value="Tất cả" control={<Radio />} label="Tất cả"/> 
                    <FormControlLabel id="da-doi-soat" name="status" value="Đã đối soát" control={<Radio />} label="Đã đối soát"/>
                    <FormControlLabel id="chua-doi-soat" name="status" value="Chưa đối soát" control={<Radio />} label="Chưa đối soát"/> 
                </RadioGroup>
            </div>
            <div>
                <label className="control-ticket-type-filter-label">Loại vé</label>
                <p className="control-ticket-type-filter-input">Vé cổng</p>
            </div>
            <div>
                <label className="control-fromdate-filter-label">Từ ngày</label>
                <div className="control-fromdate-filter-input"><Calendar defaultDate={moment()} setFromDate={setFromDate}/></div>
            </div>
            <div>
                <label className="control-todate-filter-label">Đến ngày</label>
                <div className="control-todate-filter-input"><Calendar defaultDate={moment()} setToDate={setToDate}/></div>
            </div>

            <div>
                <button className="filter-button" onClick={onFilter}>Lọc</button>
            </div>

        </div>
        
    </div>
    );
}

export default DoiSoatVe;