import {combineReducers} from "redux";
import bryggReducer from "./brygg-reducer"
import nyttBryggReducer from "./brygg-registrering-reducer";
import kaffeReducer from "./kaffe-reducer"


const combinedReducers = combineReducers({
        bryggListe: bryggReducer,
        nyttBrygg: nyttBryggReducer,
        kaffer: kaffeReducer
})

export default combinedReducers