
interface IPack {
    pack:{
      id:string,
      no:number,
      packID:string,
      packName:string,
      applyDate:string,
      ticketPrice: number,
      comboPrice:number,
      comboQuantity:number,
      expireDate:string,
      status:string,
    }[]
  }

type Pack ={
    id:string,
      no:number,
      packID:string,
      packName:string,
      applyDate:string,
      ticketPrice: number,
      comboPrice:number,
      comboQuantity:number,
      expireDate:string,
      status:string,
}

const initialState={
    tickets: [{}],
    loading:false
}

interface AddTicketAction {
    type: "ADD_HOBBY",
    payload:Pack
}

type Action = AddTicketAction

const ticketsReducer = (state=initialState, action: {type:string, payload:Pack}) => {
    switch (action.type) {
        case "ADD_TICKET":{
            const newList = [...state.tickets]
            newList.push(action.payload)

            return{
                ...state,
                tickets: newList
            }
        }
        default:
            return state;
    }
}

export default ticketsReducer;