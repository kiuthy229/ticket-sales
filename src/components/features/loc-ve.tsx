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
              if ( status === "T???t c???" && isCheck.length ==5){
                  console.log("output 1")
                  setOutput(outputDate)
                  props.setParentState(outputDate)
              }
              else if (status === "T???t c???" && isCheck.length != 5){
                console.log("output 2")
                isCheck.filter((id)=> 
                  {if(id==val.checkinGate){
                  props.setParentState((outputDate: any)=>[...outputDate, val])
                  }
                })
              }
              else if(status !== "T???t c???" && val.useStatus === status){
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
            <h1 className="filter-heading">L???c v??</h1>

            <label className="fromdate-label">T??? ng??y</label>
            <input className="fromdate-input" type="date" onChange={(e: any) => {setFromDate(e.target.value)}}/>

            <label className="todate-label">?????n ng??y</label>
            <input className="todate-input" type="date" onChange={(e: any) => {setToDate(e.target.value)}}/>

            <label className="status-text-filter">T??nh tr???ng s??? d???ng</label>
            <div className="status-filter">
                
                <input id="t???t c???" type="radio" value="T???t c???" name="status" onChange={(e:any)=>setStatus(e.target.value)}/>
                <label htmlFor="t???t c???">T???t c???</label>

                <input id="???? s??? d???ng" type="radio" value="???? s??? d???ng" name="status" onChange={(e:any)=>setStatus(e.target.value)}/>
                <label htmlFor="???? s??? d???ng">???? s??? d???ng</label>

                <input id="ch??a s??? d???ng" type="radio" value="Ch??a s??? d???ng" name="status" onChange={(e:any)=>setStatus(e.target.value)}/>
                <label htmlFor="ch??a s??? d???ng">Ch??a s??? d???ng</label>

                <input id="h???t h???n" type="radio" value="H???t h???n" name="status" onChange={(e:any)=>setStatus(e.target.value)}/>
                <label htmlFor="h???t h???n">H???t h???n</label>
            </div>

            <label className="check-in-label-filter">C???ng check-in</label>
            <div className="check-in-gate-filter">
                {/* <input type="checkbox" className="check-all" name="T???t c???" value="T???t c???"/> */}
                
                <div>
                  <input type="checkbox"
                          name="selectAll"
                          value="selectAll"
                          id="selectAll"
                          onChange={handleSelectAll}
                          checked={isCheckAll}/>
                  <label htmlFor="selectAll">T???t c???</label>
                </div>
                <div>
                  <input type="checkbox" id="C???ng 1" name="gate" value="C???ng 1" onChange={handleClick} checked={isCheck.includes("C???ng 1")}/>
                  <label htmlFor="C???ng 1">C???ng 1</label>
                </div>
                <div>
                  <input type="checkbox" id="C???ng 2" name="gate" value="C???ng 2" onChange={handleClick} checked={isCheck.includes("C???ng 2")}/>
                  <label htmlFor="C???ng 2">C???ng 2</label>
                </div>
                <div>
                  <input type="checkbox" id="C???ng 3" name="gate" value="C???ng 3" onChange={handleClick} checked={isCheck.includes("C???ng 3")}/>               
                  <label htmlFor="C???ng 3">C???ng 3</label>
                </div>
                <div>
                  <input type="checkbox" id="C???ng 4" name="gate" value="C???ng 4" onChange={handleClick} checked={isCheck.includes("C???ng 4")}/>
                  <label htmlFor="C???ng 4">C???ng 4</label>
                </div>
                <div>
                  <input type="checkbox" id="C???ng 5" name="gate" value="C???ng 5" onChange={handleClick} checked={isCheck.includes("C???ng 5")}/>
                  <label htmlFor="C???ng 5">C???ng 5</label>
                </div>
            </div>
            

            <div className="button-holder">
                <button className="loc" onClick={onFilter}>L???c</button>
            </div>

        </div>
    );
}
export default LocVe;