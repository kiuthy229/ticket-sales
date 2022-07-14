import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { useDispatch, useSelector } from 'react-redux';
import { addNewTicket } from "../../redux/actions/actionType";

interface IPack {
    pack:{
        id:string,
        no:number,
        packID:string,
        packName:string,
        applyDate:string,
        applyTime:string,
        ticketPrice: number,
        comboPrice:number,
        comboQuantity:number,
        expireDate:string,
        expireTime:string,
        status:string,
    }[]
  }
type Pack ={
    id:string,
    no:number,
    packID:string,
    packName:string,
    applyDate:string,
    applyTime:string,
    ticketPrice: number,
    comboPrice:number,
    comboQuantity:number,
    expireDate:string,
    expireTime:string,
    status:string,
  }

const TaoVe = (props:any) => {
    const dispatch = useDispatch();
    const [newTicket, setNewTicket] = useState<Pack>();
    const [tickets, setTickets] = useState<IPack["pack"]>([]);

    const [ticketName, setTicketName]= useState('');
    const [newUseDate, setUseDate]= useState('');
    const [newUseTime, setUseTime] = useState('')
    const [newExpireDate, setExpireDate]= useState('');
    const [newExpireTime, setExpireTime] = useState('');
    const [newSingleTicket, setSingleTicket]= useState(0);
    const [newComboTicket, setComboTicket]= useState(0);
    const [newComboQuantity, setComboQuantity] = useState(0);
    const [newStatus, setStatus]= useState("")

    const [isCheckTicket, setCheckTicketPrice] = useState(false);
    const [isCheckCombo, setCheckComboPrice] = useState(false);

    const [currentPage, setCurrentPage] = useState(1)
    const [ticketsPerPage,setTicketPerPage] =useState(15)
    const packsCollectionRef = collection(db, "ticket-packs");

    useEffect( () => {

        const getTickets = async () => {
          const res = await getDocs(packsCollectionRef)
          .then( (res) => setTickets(res.docs.map((doc: any) => ({...doc.data(), id: doc.id}))))
        };
    
        getTickets();
      }, []);

    const checkTicket = (e:any) =>{
        const checked = e.target;
        if(String(checked).includes("checked")){
            setCheckTicketPrice(isCheckTicket);
        }
        else{
            setCheckTicketPrice(!isCheckTicket)
        }
        //console.log(isCheckTicket)
    }

    const checkCombo = (e:any) =>{
        const checkedCombo = e.target;
        if(String(checkedCombo).includes("checked")){
            setCheckComboPrice(isCheckCombo);
        }
        else{
            setCheckComboPrice(!isCheckCombo)
        }
    }


    const ticketsCollectionRef = collection(db, "ticket-packs");
    const createTicket = async (ticketName: string) => {
        try {
          await addDoc(ticketsCollectionRef, {no: Number(props.ticketLength)+1, packID: "ALT20210501",packName: ticketName, 
                                                applyDate: newUseDate, useTime: newUseTime, expireDate: newExpireDate, 
                                                expireTime: newExpireTime, ticketPrice: newSingleTicket, comboPrice: newComboTicket, 
                                                comboQuantity: newComboQuantity, status:newStatus })
          console.log("ticket created")
        } catch (err: any) {
          console.error(err);
          alert(err.message);
        }
      }

      const handleAddTicketClick = () => {

        console.log("clicked")
        console.log('list of tickets', tickets);
  
        const newId = Math.floor(Math.random() * 10)
  
        const newh = {
          id: newId,
          hobby: `hobby ${newId}`,
        }
  
        //truyền newHobby vào action
        const action = addNewTicket(newTicket);
        console.log(action)
        //dispatch action đó lên redux store
        dispatch(action);
        setNewTicket(newTicket)
        console.log(newTicket)
        createTicket(ticketName);
        props.setCloseCreate(true)
    }

      

    return(
        <div className="createticket inner">
            <h1 className="header"> Tạo gói vé</h1>
            <label className="ticketname-label">Tên gói vé</label>
            <input className="ticketname-input" placeholder="Ticket name" onChange={(e: any) => {setTicketName(e.target.value)}}/>

            <label className="dateuse-label">Ngày áp dụng</label>
            <input className="dateuse-input" type="date" onChange={(e: any) => {setUseDate(e.target.value)}}/>
            <input className="dateuse-time" type="time" style={{color:"#1E0D03"}} onChange={(e: any) => {setUseTime(e.target.value)}}/>

            <label className="expiredate-label">Ngày hết hạn</label>
            <input className="expiredate-input" type="date" onChange={(e: any) => {setExpireDate(e.target.value)}}/>
            <input className="expiredate-time" type="time" onChange={(e: any) => {setExpireTime(e.target.value)}}/>

            <label className="price-label">Gía vé áp dụng</label>
            {isCheckTicket==true &&
                    <div className="single-ticket">
                        <input type="checkbox" defaultChecked={isCheckTicket} onChange={checkTicket}/>
                        <label>Vé lẻ (vnđ/vé) với giá</label>
                        <input className="single-ticket-input" type="number" onChange={(e: any) => {setSingleTicket(e.target.value)}} placeholder="Gía vé"/>
                        <label className="slash">/ vé</label>           
                    </div>
            }
            {isCheckTicket==false &&
                    <div className="single-ticket">
                        <input type="checkbox" defaultChecked={isCheckTicket} onChange={checkTicket}/>
                        <label>Vé lẻ (vnđ/vé) với giá</label>
                        <input className="single-ticket-input" type="number" onChange={(e: any) => {setSingleTicket(e.target.value)}} disabled style={{background:"#E0E0E0"}}/>
                        <label className="slash">/ vé</label>           
                    </div>
            }
            {isCheckCombo==true &&
            <div className="combo-ticket">
                <input type="checkbox" defaultChecked={isCheckCombo} onChange={checkCombo}/>
                <label className="combo-ticket-label">Combo vé với giá</label>
                <input className="combo-ticket-input" type="number" onChange={(e: any) => {setComboTicket(e.target.value)}} placeholder="Gía Combo"/>
                <label className="slash">/</label>
                <label className="slash-ve">vé</label>
                <input className="combo-quantity-input" type="number" onChange={(e: any) => {setComboQuantity(e.target.value)}} placeholder="Số lượng"/>
            </div>
            }

            {isCheckCombo==false &&
            <div className="combo-ticket">
                <input type="checkbox" defaultChecked={isCheckCombo} onChange={checkCombo}/>
                <label className="combo-ticket-label">Combo vé với giá</label>
                <input className="combo-ticket-input" type="number" onChange={(e: any) => {setComboTicket(e.target.value)}} disabled style={{background:"#E0E0E0"}}/>
                <label className="slash">/</label>
                <label className="slash-ve">vé</label>
                <input className="combo-quantity-input" type="number" onChange={(e: any) => {setComboQuantity(e.target.value)}} disabled style={{background:"#E0E0E0"}}/>
            </div>
            }
            <div>
                <label className="label-status">Tình trạng</label>
                <select className="status" defaultValue="Chưa áp dụng" onChange={(event) => setStatus(event.target.value)}>
                    <option value="Đang áp dụng">Đang áp dụng</option>
                    <option value="Chưa áp dụng">Chưa áp dụng</option>
                </select>
            </div>
            

            <div className="button-holder">
                <button className="huy" onClick={props.onClose}>Hủy</button>
                <button className="luu" onClick={handleAddTicketClick}>Lưu</button>
            </div>

        </div>
    );
}
export default TaoVe;