import {combineReducers} from "redux";
import bryggReducer from "./brygg-reducer"
import nyttBryggReducer from "./brygg-registrering-reducer";
import kaffeReducer from "./kaffe-reducer"
import kalenderReducer from "./kalender_reducer";
import kafferegistreringReducer from "./kafferegistrering_reducer";


const combinedReducers = combineReducers({
        bryggListe: bryggReducer,
        nyttBrygg: nyttBryggReducer,
        kaffer: kaffeReducer,
        kalender: kalenderReducer,
        kaffeRegistrering: kafferegistreringReducer
})

export default combinedReducers