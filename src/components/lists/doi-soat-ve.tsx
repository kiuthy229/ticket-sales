import { validateCallback } from "@firebase/util";
import { Typography } from "@material-ui/core";
import { render } from "@testing-library/react"
import { sort } from "d3";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { couldStartTrivia } from "typescript";
import { db } from "../../firebase-config";
import filter from "../../images/filter.png";
import previous from "../../images/previous.png"
import next from "../../images/next.png"
import { CSVLink } from "react-csv"
import datepicker from "../../images/datepicker.png";

interface ITicket {
    ticket:{
      no:number,
      id:string,
      ticketNumber:number,
      ticketType:string,
      useDate:string,
      checkinGate:string,
      controlStatus:string
    }[]
  }

const DoiSoatVe = () =>{

    //FILTER VARIABLES
    const [tickets, setTickets] = useState<ITicket["ticket"]>([]);
    const usersCollectionRef = collection(db, "tickets");
    const [stateTerm, setStateTerm] = useState("");
    const [fromdate, setFromDate] = useState("");
    const [todate, setToDate] = useState("");
    const [output, setOutput]=useState<ITicket ["ticket"]>([]);
    var [outputDate, setOutputDate] = useState<ITicket ["ticket"]>([]);
    var [filter, setOnFilter]=useState(false)

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
              if(val.id.toLowerCase().includes(searchTerm)){
                setOutputSearch(output=>[...output, val])
              }
            })
      
    }, [searchTerm])

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
                setOutputDate([]);
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
                setOutputDate([]);
                if (Number(val.useDate.slice(5,7)) !== chosenStartMonth && chosenEndMonth !== Number(val.useDate.slice(5,7))){
                    console.log("out of scope")
                }
                else if(Number(val.useDate.slice(5,7)) >= chosenStartMonth && Number(val.useDate.slice(5,7))<=chosenEndMonth){
                        if(Number(val.useDate.slice(8,10)) >= chosenStartDay){
                            outputDate.push(val)
                            if (Number(val.useDate.slice(8,10)) > chosenEndDay && Number(val.useDate.slice(5,7)) === chosenEndMonth){
                                var outScopeDate = Number(val.useDate.slice(8,10));
                                for (var i = 0; i < outputDate.length; i++) {
                                    if (Number(outputDate[i].useDate.slice(8,10)) == outScopeDate) {
                                        var spliced = outputDate.splice(i, 1);
                                    }
                                }
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
                if ( stateTerm === "T???t c???"){
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
            <h1 className="title">?????i so??t v??</h1>

            <input className="search" type="text" placeholder="T??m b???ng s??? v??"  onChange={(e)=>setSearchTerm(e.target.value)}/>
            {!stateTerm &&
                <button className="doisoat">Ch???t ?????i so??t</button>
            }

            {stateTerm.includes("Ch??a") &&
                <button className="doisoat">Ch???t ?????i so??t</button>
            }

            {stateTerm.includes("T???t c???") &&
                <button className="doisoat">Ch???t ?????i so??t</button>
            }

            {stateTerm === "???? ?????i so??t" &&
                <button className="csv-doisoat">
                    <CSVLink {...csvLink} style={csvStyle}>
                        Xu???t file (.csv)
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
                            <th>S??? v??</th>
                            <th>Ng??y s??? d???ng</th>
                            <th>T??n lo???i v??</th>
                            <th>C???ng checkin</th>
                            <th className="invisible">Tr???ng th??i</th>
                        </tr>
                        {!searchTerm && filter==false &&
                            tickets.map((ticket) =>
                            <tr className="control-table-content">
                                    <td>{ticket.no}</td>
                                    <td>{ticket.id}</td>
                                    <td>{ticket.ticketNumber}</td>
                                    <td>{ticket.useDate}</td>
                                    <td>{ticket.ticketType}</td>
                                    <td>{ticket.checkinGate}</td>
                                    <td>
                                        { ticket.controlStatus === "Ch??a ?????i so??t" &&
                                        <Typography style={chuadoisoat}>{ticket.controlStatus}</Typography>}
                                        { ticket.controlStatus === "???? ?????i so??t" &&
                                        <Typography style={dadoisoat}>{ticket.controlStatus}</Typography>}
                                    </td>
                            </tr> 
                        )}

                        {output && 
                            output.map((ticket) =>
                                <tr className="control-table-content">
                                    <td>{ticket.no}</td>
                                    <td>{ticket.id}</td>
                                    <td>{ticket.ticketNumber}</td>
                                    <td>{ticket.useDate}</td>
                                    <td>{ticket.ticketType}</td>
                                    <td>{ticket.checkinGate}</td>
                                    <td>
                                        { ticket.controlStatus === "Ch??a ?????i so??t" &&
                                        <Typography style={chuadoisoat}>{ticket.controlStatus}</Typography>}
                                        { ticket.controlStatus === "???? ?????i so??t" &&
                                        <Typography style={dadoisoat}>{ticket.controlStatus}</Typography>}
                                    </td>
                                    </tr> 
                        )}

                        {searchTerm &&
                            outputSearch.map((ticket) =>
                                <tr className="control-table-content">
                                    <td>{ticket.no}</td>
                                    <td>{ticket.id}</td>
                                    <td>{ticket.ticketNumber}</td>
                                    <td>{ticket.useDate}</td>
                                    <td>{ticket.ticketType}</td>
                                    <td>{ticket.checkinGate}</td>
                                    <td>
                                        { ticket.controlStatus === "Ch??a ?????i so??t" &&
                                        <Typography style={chuadoisoat}>{ticket.controlStatus}</Typography>}
                                        { ticket.controlStatus === "???? ?????i so??t" &&
                                        <Typography style={dadoisoat}>{ticket.controlStatus}</Typography>}
                                    </td>
                                    </tr> 
                        )}
                    

                </table>
        </div>
        <div className="filter-item">
            <h1 className="control-filter-heading">L???c v??</h1>
            <p className="control-filter">T??nh tr???ng ?????i so??t</p>
            <div className="control-filter-options">
            <div className="radio-row">
                <input type="radio" id="tat-ca" name="fav_language" value="T???t c???" onChange={(e)=>setStateTerm(e.target.value)}/>
                <label htmlFor="tat-ca">T???t c???</label>
            </div>
            <div className="radio-row">
                <input type="radio" id="da-doi-soat" name="fav_language" value="???? ?????i so??t" onChange={(e)=>setStateTerm(e.target.value)}/>
                <label htmlFor="da-doi-soat">???? ?????i so??t</label>
            </div>
            <div className="radio-row">
                <input type="radio" id="chua-doi-soat" name="fav_language" value="Ch??a ?????i so??t" onChange={(e)=>setStateTerm(e.target.value)}/>
                <label htmlFor="chua-doi-soat">Ch??a ?????i so??t</label>
            </div>
            </div>
            <div>
                <label className="control-ticket-type-filter-label">Lo???i v??</label>
                <p className="control-ticket-type-filter-input">V?? c???ng</p>
            </div>
            <div>
                <label className="control-fromdate-filter-label">T??? ng??y</label>
                <input className="control-fromdate-filter-input" type="date" onChange={(e)=>setFromDate(e.target.value)}/>
            </div>
            <div>
                <label className="control-todate-filter-label">?????n ng??y</label>
                <input className="control-todate-filter-input" type="date" onChange={(e)=>setToDate(e.target.value)}/>
            </div>

            <div>
                <button className="filter-button" onClick={onFilter}>L???c</button>
            </div>

        </div>
        
    </div>
    );
}

export default DoiSoatVe;