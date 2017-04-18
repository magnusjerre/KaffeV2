import {IAction, IBryggRegistrering} from "../models";
import {
    ADD_BRYGG_REQUEST, ADD_BRYGG_SUCCESS,
    NEW_BRYGG_KAFFEID, NEW_BRYGG_NAVN, NEW_BRYGG_BRYGGER, NEW_BRYGG_LITER,
    NEW_BRYGG_SKJEER
} from "../actions/brygg_actions";

const initalState = {
    navn: "",
    brygger: "",
    kaffeId: "def",
    liter: 0,
    skjeer: 0,
    visBryggRegistrering: false
}

const bryggRegistreringReducer = (state: IBryggRegistrering = initalState, action: IAction<string | number | boolean>) : IBryggRegistrering => {
    let newState = clone(state)
    switch(action.type) {
        case NEW_BRYGG_NAVN:
            newState.navn = action.payload as string
            return newState
        case NEW_BRYGG_BRYGGER:
            newState.brygger = action.payload as string
            return newState
        case NEW_BRYGG_KAFFEID:
            newState.kaffeId = action.payload as string
            return newState
        case NEW_BRYGG_LITER:
            newState.liter = action.payload as number
            return newState
        case NEW_BRYGG_SKJEER:
            newState.skjeer = action.payload as number
            return newState
        case ADD_BRYGG_REQUEST:
            console.log("Reducer recieved ADD_BRYGG_REQUEST action")
            return newState
        case ADD_BRYGG_SUCCESS:
            console.log("Reducer recieved ADD_BRYGG_SUCCESS action")
            return clone(initalState)
        default:
            return state
    }
}

export default bryggRegistreringReducer

const clone = (state: IBryggRegistrering) : IBryggRegistrering => {
    return {
        navn: state.navn,
        brygger: state.brygger,
        kaffeId: state.kaffeId,
        liter: state.liter,
        skjeer: state.skjeer,
        visBryggRegistrering: state.visBryggRegistrering
    }
}