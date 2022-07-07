import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { Gates } from "./mock";

const LocVe = (props:any) => {
    const [ticketName, setTicketName]= useState('');
    const [newUseDate, setUseDate]= useState('');
    const [newUseTime, setUseTime] = useState('')
    const [newExpireDate, setExpireDate]= useState('');
    const [newExpireTime, setExpireTime] = useState('');
    const [newSingleTicket, setSingleTicket]= useState(true);
    const [newComboTicket, setComboTicket]= useState(false);
    const [newStatus, setStatus]= useState("")
    const [isCheckAll, setIsCheckAll] = useState(false);
    let [isCheck, setIsCheck] = useState(["",""]);
    const [list, setList] = useState([""]);
    const [selectedOption, setSelectedOption] = useState();

    const updateUser = async (id: string, email:string, name: string, age: number) => {
        const userDoc = doc(db,"users", id)
        const newFields ={name: ticketName, useDay: newUseDate, useTime: newUseTime, expireDate: newExpireDate, expireTime: newExpireTime, singleTicket: newSingleTicket, comboTicket: newComboTicket}
        await updateDoc(userDoc, newFields);
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

      const onChangeValue=(event:any) => {
        setSelectedOption( event.target.value);
      }
      console.log(isCheck);


    return(
        <div className="filter-ticket">
            <h1 className="filter-heading">Lọc vé</h1>

            <label className="fromdate-label">Từ ngày</label>
            <input className="fromdate-input" type="date" onChange={(e: any) => {setUseDate(e.target.value)}}/>

            <label className="todate-label">Đến ngày</label>
            <input className="todate-input" type="date" onChange={(e: any) => {setExpireDate(e.target.value)}}/>

            <label className="status-text-filter">Tình trạng sử dụng</label>
            <div className="status-filter">
                
                <input id="tất cả" type="radio" value="Tất cả" name="status" checked={selectedOption === "Tất cả"} onChange={onChangeValue}/>
                <label htmlFor="tất cả">Tất cả</label>

                <input id="đã sử dụng" type="radio" value="Đã sử dụng" name="status" checked={selectedOption === "Đã sử dụng"} onChange={onChangeValue}/>
                <label htmlFor="đã sử dụng">Đã sử dụng</label>

                <input id="chưa sử dụng" type="radio" value="Chưa sử dụng" name="status" checked={selectedOption === "Chưa sử dụng"} onChange={onChangeValue}/>
                <label htmlFor="chưa sử dụng">Chưa sử dụng</label>

                <input id="hết hạn" type="radio" value="Hết hạn" name="status" checked={selectedOption === "Hết hạn"} onChange={onChangeValue}/>
                <label htmlFor="hết hạn">Hết hạn</label>
            </div>

            <label className="check-in-label-filter">Cổng check-in</label>
            <div className="check-in-gate-filter">
                {/* <input type="checkbox" className="check-all" name="Tất cả" value="Tất cả"/> */}
                <input type="checkbox"
                        name="selectAll"
                        id="selectAll"
                        onChange={handleSelectAll}
                        checked={isCheckAll}/>
                <label htmlFor="selectAll">Tất cả</label>
                <input type="checkbox" id="gate-1" name="Cổng 1" value="Cổng 1" onChange={handleClick} checked={isCheck.includes("gate-1")}/>
                <label htmlFor="gate-1">Cổng 1</label>
                <input type="checkbox" id="gate-2" name="Cổng 2" value="Cổng 2" onChange={handleClick} checked={isCheck.includes("gate-2")}/>
                <label htmlFor="gate-2">Cổng 2</label>
                <input type="checkbox" id="gate-3" name="Cổng 3" value="Cổng 3" onChange={handleClick} checked={isCheck.includes("gate-3")}/>
                <label htmlFor="gate-3">Cổng 3</label>
                <input type="checkbox" id="gate-4" name="Cổng 4" value="Cổng 4" onChange={handleClick} checked={isCheck.includes("gate-4")}/>
                <label htmlFor="gate-4">Cổng 4</label>
                <input type="checkbox" id="gate-5" name="Cổng 5" value="Cổng 5" onChange={handleClick} checked={isCheck.includes("gate-5")}/>
                <label htmlFor="gate-5">Cổng 5</label>
            </div>
            

            <div className="button-holder">
                <button className="loc" onClick={props.onClose}>Lọc</button>
            </div>

        </div>
    );
}
export default LocVe;