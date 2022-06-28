const initialState={
    tickets: [],
    loading:false
}

const ticketsReducer = (state=initialState, action:any) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default ticketsReducer;