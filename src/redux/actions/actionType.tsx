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

type PackUpdate ={
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

export const addNewTicket = (tickets: Pack |undefined) => {
    return{
        type: 'ADD_TICKET',
        payload: tickets,
    }
}

export const updateNewTicket = (tickets: PackUpdate |undefined) => {
    return{
        type: 'UPDATE_TICKET',
        payload: tickets,
    }
}