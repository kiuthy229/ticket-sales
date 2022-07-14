import reducer from '../reducers/reducer';
import { createStore} from 'redux';
import { createFirestoreInstance } from "redux-firestore";

import "firebase/firestore";
import { useDispatch } from "react-redux";

const rrrfConfig = {
    ticketDetails: 'tickets'
}

const inistialState = {}

const store = createStore(reducer)

export default store;

export const rrfProps = {
    config:rrrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance

}
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() 