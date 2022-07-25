import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import moment from 'moment';
import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import Calendar from '../calendar/lich';
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
    //RADIO BUTTONS
    const [value, setValue] = useState('');

    //FILTER
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

    //GET ALL TICKETS TO DISPLAY
    useEffect( () => {

      const getTickets = async () => {
        const res = await getDocs(ticketsCollectionRef)
        .then( (res) => setTickets(res.docs.map((doc: any) => ({...doc.data(), key: doc.id}))))
      };
  
      getTickets();
    }, []);

    //FUNCTION FILTER
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
      console.log(isCheck)
      outputDate.filter(val=>{
              if ( status === "Tất cả" && isCheck.length >=5){
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

    //SET LIST OF GATES
    useEffect(() => {
        setList(Gates);
      }, [list]);

    //CALL FUNCTION WHEN CLICKING ON SELECT ALL
    const handleSelectAll = (e: any) => {
        setIsCheckAll(!isCheckAll);
        setIsCheck([]);
        if (isCheckAll) {
          setIsCheck([]);
        }
      };
    
    //CALL FUNCTION WHEN CLICKING ON EVERY GATE
    const handleClick = (e:any) => {
        const { id, checked } = e.target;
        setIsCheck([...isCheck, id]);
        setIsCheckAll(false);
        if (!checked) {
          setIsCheck(isCheck.filter(item => item !== id));
        }       
      };

    //CHANGE VALUES OF RADIO BUTTON
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setValue((event.target as HTMLInputElement).value);
    };
    useEffect(()=>{
        setStatus(value)
        console.log(status)
    },[value])


    return(
        <div className="filter-ticket">
            <h1 className="filter-heading">Lọc vé</h1>

            <label className="fromdate-label">Từ ngày</label>
            <div className="fromdate-input"><Calendar defaultDate={moment()} setFromDate={setFromDate}/></div>

            <label className="todate-label">Đến ngày</label>
            <div className="todate-input"><Calendar defaultDate={moment()} setToDate={setToDate}/></div>

            <label className="status-text-filter">Tình trạng sử dụng</label>
            <RadioGroup
                    aria-labelledby="demo-error-radios"
                    name="quiz"
                    value={value}
                    onChange={handleRadioChange}
            >
              <div className="status-filter">

                    <FormControlLabel id="tat-ca" name="status" value="Tất cả" control={<Radio />} label="Tất cả"/> 
                    <FormControlLabel id="đã sử dụng" name="status" value="Đã sử dụng" control={<Radio />} label="Đã sử dụng"/> 
                    <FormControlLabel id="chưa sử dụng" name="status" value="Chưa sử dụng" control={<Radio />} label="Chưa sử dụng"/> 
                    <FormControlLabel id="hết hạn" name="status" value="Hết hạn" control={<Radio />} label="Hết hạn"/> 
                  
              </div>
            </RadioGroup>

            <label className="check-in-label-filter">Cổng check-in</label>
            <div className="check-in-gate-filter">
                {/* <input type="checkbox" className="check-all" name="Tất cả" value="Tất cả"/> */}
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox name="selectAll" value="selectAll" id="selectAll" checked={isCheckAll} onChange={handleSelectAll}/>
                    }
                    label="Tất cả"
                  />
                </div>
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox id="Cổng 1" checked={isCheck.includes("Cổng 1")} onChange={handleClick} name="gate"/>
                    }
                    label="Cổng 1"
                  />
                </div>
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox id="Cổng 2" checked={isCheck.includes("Cổng 2")} onChange={handleClick} name="gate"/>
                    }
                    label="Cổng 2"
                  />
                </div>
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox id="Cổng 3" checked={isCheck.includes("Cổng 3")} onChange={handleClick} name="gate"/>
                    }
                    label="Cổng 3"
                  />
                </div>
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox id="Cổng 4" checked={isCheck.includes("Cổng 4")} onChange={handleClick} name="gate"/>
                    }
                    label="Cổng 4"
                  />
                </div>
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox id="Cổng 5" checked={isCheck.includes("Cổng 5")} onChange={handleClick} name="gate"/>
                    }
                    label="Cổng 5"
                  />
                </div>
            </div>
            

            <div className="button-holder">
                <button className="loc" onClick={onFilter}>Lọc</button>
            </div>

        </div>
    );
}
export default LocVe;