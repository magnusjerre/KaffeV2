import {combineReducers} from "redux";
import bryggReducer from "./brygg-reducer"

const combinedReducers = combineReducers({
        bryggListe: bryggReducer
})

export default combinedReducers