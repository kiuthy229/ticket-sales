import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase-config";
import { useDispatch, useSelector } from 'react-redux';
import { addNewTicket, updateNewTicket } from "../../redux/actions/actionType";

interface IPack {
    pack:{
      packName:string,
      packID:string,
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
      packName:string,
      packID:string,
      applyDate:string,
      applyTime:string,
      ticketPrice: number,
      comboPrice:number,
      comboQuantity:number,
      expireDate:string,
      expireTime:string,
      status:string,
  }

const CapNhatVe = (props:any) => {
    const dispatch = useDispatch();
    const [newTicket, setNewTicket] = useState<Pack>();
    const [tickets, setTickets] = useState<IPack["pack"]>([]);

    const [packId, setPackID]= useState('');
    const [ticketNo, setTicketNo] = useState<number>();
    const [ticketName, setTicketName]= useState('');
    const [newApplyDate, setApplyDate]= useState('');
    const [newApplyTime, setApplyTime]= useState('');
    const [newExpireDate, setExpireDate]= useState('');
    const [newExpireTime, setExpireTime]= useState('');
    const [newSingleTicketPrice, setSingleTicket]= useState<number>(0);
    const [newComboTicketPrice, setComboTicket]= useState<number>(0);
    const [newComboQuantity, setComboQuantity] = useState(0);
    const [status, setStatus]= useState("")

    const [isCheckTicket, setCheckTicketPrice] = useState(false);
    const [isCheckCombo, setCheckComboPrice] = useState(false);

    console.log(props.ticketID)
    const updateTicket = async (id:string, packName: string, packID:string, applyDate: string, applyTime: string, expireDate: string, expireTime: string, ticketPrice: number, comboPrice: number,  comboQuantity:number, status:string) => {
        const ticketDoc = doc(db,"ticket-packs", id)
        const newFields ={packName: ticketName, packID:packId, applyDate:newApplyDate, applyTime:newApplyTime, expireDate:newExpireDate, expireTime:newExpireTime, ticketPrice: newSingleTicketPrice, comboPrice:newComboTicketPrice, comboQuantity: newComboQuantity, status:status}
        await updateDoc(ticketDoc, newFields);
        console.log("update successful")
        handleHobbyEditClick(newFields)
        props.setCloseUpdate(true)
    }

    const handleHobbyEditClick = (ticket: Pack) => {
          console.log('Form submit: ', ticket);
            // Do something here
            const action = updateNewTicket(ticket);
            console.log({ action });
            dispatch(action);
    }

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
    return(
        <div className="createticket inner">
            <h1 className="header-update">C???p nh???t th??ng tin g??i v??</h1>
            <label className="update-packid-label">M?? s??? ki???n</label>
            <input className="update-packid-input" placeholder={ticketName} onChange={(e: any) => {setPackID(e.target.value)}}/>

            <label className="update-packname-label">T??n s??? ki???n</label>
            <input className="update-packname-input" placeholder="Ticket name" onChange={(e: any) => {setTicketName(e.target.value)}}/>

            <label className="dateuse-label">Ng??y ??p d???ng</label>
            <input className="dateuse-input" type="date" onChange={(e: any) => {setApplyDate(e.target.value)}}/>
            <input className="dateuse-time" type="time" onChange={(e: any) => {setApplyTime(e.target.value)}}/>

            <label className="expiredate-label">Ng??y h???t h???n</label>
            <input className="expiredate-input" type="date" onChange={(e: any) => {setExpireDate(e.target.value)}}/>
            <input className="expiredate-time" type="time" onChange={(e: any) => {setExpireTime(e.target.value)}}/>

            <label className="price-label">G??a v?? ??p d???ng</label>
            {isCheckTicket==true &&
                <div className="single-ticket">
                    <input type="checkbox" defaultChecked={isCheckTicket} onChange={checkTicket}/>
                    <label>V?? l??? (vn??/v??) v???i gi??</label>
                    <input className="single-ticket-input" type="number" onChange={(e: any) => {setSingleTicket(e.target.value)}} placeholder="G??a v??"/>
                    <label>/ v??</label>
                </div>
            }
            {isCheckTicket==false &&
                <div className="single-ticket">
                    <input type="checkbox" defaultChecked={isCheckTicket} onChange={checkTicket}/>
                    <label>V?? l??? (vn??/v??) v???i gi??</label>
                    <input className="single-ticket-input" type="number" onChange={(e: any) => {setSingleTicket(e.target.value)}} disabled style={{background:"#E0E0E0"}}/>
                    <label>/ v??</label>
                </div>
            }
            {isCheckCombo==true &&
                <div className="combo-ticket">
                    <input type="checkbox" defaultChecked={isCheckCombo} onChange={checkCombo}/>
                    <label className="combo-ticket-label">Combo v?? v???i gi??</label>
                    <input className="combo-ticket-input" type="number" onChange={(e: any) => {setComboTicket(e.target.value)}} placeholder="G??a Combo"/>
                    <label className="slash">/</label>
                    <label className="slash-ve">v??</label>
                    <input className="update-combo-quantity-input" type="number" onChange={(e: any) => {setComboQuantity(e.target.value)}} placeholder="S??? l?????ng"/>
                </div>
            }
            {isCheckCombo==false &&
                <div className="combo-ticket">
                    <input type="checkbox" defaultChecked={isCheckCombo} onChange={checkCombo}/>
                    <label className="combo-ticket-label">Combo v?? v???i gi??</label>
                    <input className="combo-ticket-input" type="number" onChange={(e: any) => {setComboTicket(e.target.value)}} disabled style={{background:"#E0E0E0"}}/>
                    <label className="slash">/</label>
                    <label className="slash-ve">v??</label>
                    <input className="update-combo-quantity-input" type="number" onChange={(e: any) => {setComboQuantity(e.target.value)}} disabled style={{background:"#E0E0E0"}}/>
                </div>
            }
            <div>
                <label className="label-status">T??nh tr???ng</label>
                <select className="status" onChange={(e: any) => {setStatus(e.target.value)}}>
                    <option value="??ang ??p d???ng">??ang ??p d???ng</option>
                    <option value="Ch??a ??p d???ng">Ch??a ??p d???ng</option>
                </select>
            </div>
            

            <div className="button-holder">
                <button className="huy" onClick={props.onClose}>H???y</button>
                <button className="luu" onClick={() => updateTicket(props.ticketID, ticketName, packId, newApplyDate, newApplyTime, newExpireDate, newExpireTime, newSingleTicketPrice, newComboTicketPrice, newComboQuantity, status).then(props.setCloseUpdate(true))}>L??u</button>
            </div>

        </div>
    );
}
export default CapNhatVe;