import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { Gates } from "./mock";

interface ITicket {
  ticket:{
    no:number,
    id:string,
    eventName:string,
    ticketNumber:number,
    useDate:string,
    releaseDate:string,
    useStatus:string,
    checkinGate:string
  }[]
}

const LocVe = (props:any) => {
    const [status, setStatus]= useState("")
    const [isCheckAll, setIsCheckAll] = useState(false);
    let [isCheck, setIsCheck] = useState<string[]>([]);
    const [list, setList] = useState([""]);

    const [tickets, setTickets] = useState<ITicket["ticket"]>([]);
    const [fromdate, setFromDate] = useState("");
    const [todate, setToDate] = useState("");
    const [output, setOutput]=useState<ITicket ["ticket"]>([]);
    var [outputDate, setOutputDate] = useState<ITicket ["ticket"]>([]);
    var [filter, setOnFilter]=useState(false)

    const ticketsCollectionRef = collection(db, "tickets");
    useEffect( () => {

      const getTickets = async () => {
        const res = await getDocs(ticketsCollectionRef)
        .then( (res) => setTickets(res.docs.map((doc: any) => ({...doc.data(), key: doc.id}))))
      };
  
      getTickets();
    }, []);

    const onFilter = () => {
      setOnFilter(true)
      setOutput([])
      props.setParentState([])

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
                  // console.log(Number(val.useDate.slice(5,7)))
                  // console.log(chosenStartMonth)
                  // console.log(chosenEndMonth)
              }
              if ((Number(val.useDate.slice(5,7)) == chosenStartMonth) 
                  && (Number(val.useDate.slice(8,10)) >= chosenStartDay && Number(val.useDate.slice(8,10)) <= chosenEndDay)){
                      //console.log(Number(val.useDate.slice(5,7)), "and", chosenEndMonth)
                      outputDate.push(val)
                      console.log(outputDate)
              }
          }
          else if (chosenStartMonth !== chosenEndMonth){
              setOutputDate([]);
              if(Number(val.useDate.slice(5,7)) >= chosenStartMonth && Number(val.useDate.slice(5,7))<=chosenEndMonth){
                      if(Number(val.useDate.slice(8,10)) >= chosenStartDay){
                          outputDate.push(val)
                          //console.log(outputDate)
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
              else {
                  console.log("no results because the date chosen is out of scope")
              }
          }
      })
      console.log(isCheck)
      outputDate.filter(val=>{
              if ( status === "Tất cả" && isCheck.length ==5){
                  console.log("output 1")
                  setOutput(outputDate)
                  props.setParentState(outputDate)
              }
              else if (status === "Tất cả" && isCheck.length != 5){
                console.log("output 2")
                isCheck.filter((id)=> 
                  {if(id==val.checkinGate){
                  props.setParentState((outputDate: any)=>[...outputDate, val])
                  }
                })
              }
              else if(status !== "Tất cả" && val.useStatus === status){
                console.log("otuput 3")
                isCheck.filter((id)=> {if(id==val.checkinGate){
                  props.setParentState((outputDate: any)=>[...outputDate, val])
                  console.log(val)
                }})
              }          
      })

      //console.log(output)
      props.setCloseFilter(true)
  } 

    useEffect(() => {
        setList(Gates);
      }, [list]);

    const handleSelectAll = (e: any) => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(list.map((li:any) => li));
        if (isCheckAll) {
          setIsCheck([]);
        }
      };
    
      const handleClick = (e:any) => {
        const { id, checked } = e.target;
        setIsCheck([...isCheck, id]);
        if (!checked) {
          setIsCheck(isCheck.filter(item => item !== id));
        }       
      };


    return(
        <div className="filter-ticket">
            <h1 className="filter-heading">Lọc vé</h1>

            <label className="fromdate-label">Từ ngày</label>
            <input className="fromdate-input" type="date" onChange={(e: any) => {setFromDate(e.target.value)}}/>

            <label className="todate-label">Đến ngày</label>
            <input className="todate-input" type="date" onChange={(e: any) => {setToDate(e.target.value)}}/>

            <label className="status-text-filter">Tình trạng sử dụng</label>
            <div className="status-filter">
                
                <input id="tất cả" type="radio" value="Tất cả" name="status" onChange={(e:any)=>setStatus(e.target.value)}/>
                <label htmlFor="tất cả">Tất cả</label>

                <input id="đã sử dụng" type="radio" value="Đã sử dụng" name="status" onChange={(e:any)=>setStatus(e.target.value)}/>
                <label htmlFor="đã sử dụng">Đã sử dụng</label>

                <input id="chưa sử dụng" type="radio" value="Chưa sử dụng" name="status" onChange={(e:any)=>setStatus(e.target.value)}/>
                <label htmlFor="chưa sử dụng">Chưa sử dụng</label>

                <input id="hết hạn" type="radio" value="Hết hạn" name="status" onChange={(e:any)=>setStatus(e.target.value)}/>
                <label htmlFor="hết hạn">Hết hạn</label>
            </div>

            <label className="check-in-label-filter">Cổng check-in</label>
            <div className="check-in-gate-filter">
                {/* <input type="checkbox" className="check-all" name="Tất cả" value="Tất cả"/> */}
                
                <div>
                  <input type="checkbox"
                          name="selectAll"
                          value="selectAll"
                          id="selectAll"
                          onChange={handleSelectAll}
                          checked={isCheckAll}/>
                  <label htmlFor="selectAll">Tất cả</label>
                </div>
                <div>
                  <input type="checkbox" id="Cổng 1" name="gate" value="Cổng 1" onChange={handleClick} checked={isCheck.includes("Cổng 1")}/>
                  <label htmlFor="Cổng 1">Cổng 1</label>
                </div>
                <div>
                  <input type="checkbox" id="Cổng 2" name="gate" value="Cổng 2" onChange={handleClick} checked={isCheck.includes("Cổng 2")}/>
                  <label htmlFor="Cổng 2">Cổng 2</label>
                </div>
                <div>
                  <input type="checkbox" id="Cổng 3" name="gate" value="Cổng 3" onChange={handleClick} checked={isCheck.includes("Cổng 3")}/>               
                  <label htmlFor="Cổng 3">Cổng 3</label>
                </div>
                <div>
                  <input type="checkbox" id="Cổng 4" name="gate" value="Cổng 4" onChange={handleClick} checked={isCheck.includes("Cổng 4")}/>
                  <label htmlFor="Cổng 4">Cổng 4</label>
                </div>
                <div>
                  <input type="checkbox" id="Cổng 5" name="gate" value="Cổng 5" onChange={handleClick} checked={isCheck.includes("Cổng 5")}/>
                  <label htmlFor="Cổng 5">Cổng 5</label>
                </div>
            </div>
            

            <div className="button-holder">
                <button className="loc" onClick={onFilter}>Lọc</button>
            </div>

        </div>
    );
}
export default LocVe;