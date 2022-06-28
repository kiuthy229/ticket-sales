import {combineReducers} from "redux";
import ticketsReducer from "./reducer";

const rootReducer = combineReducers({
    data: ticketsReducer
})

export default rootReducer;