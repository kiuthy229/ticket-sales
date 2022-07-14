import {combineReducers} from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import ticketsReducer from "./reducer";

const rootReducer = combineReducers({
    firebaseReducer: firebaseReducer,
    firestoreReducer: firestoreReducer,
    data: ticketsReducer
})

export default rootReducer;