import {combineReducers} from "redux";
import bryggReducer from "./brygg-reducer"
import nyttBryggReducer from "./nytt-brygg-reducers";
import kaffeReducer from "./kaffe-reducer"


const combinedReducers = combineReducers({
        bryggListe: bryggReducer,
        nyttBrygg: nyttBryggReducer,
        kaffer: kaffeReducer
})

export default combinedReducers