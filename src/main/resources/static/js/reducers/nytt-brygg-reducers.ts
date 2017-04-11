import {IAction, IBryggRegistrering} from "../models";
import {
    NEW_BRYGG_KAFFEID, NEW_BRYGG_NAVN, NEW_BRYGG_BRYGGER, NEW_BRYGG_LITER,
    NEW_BRYGG_SKJEER
} from "../actions/actions";

const initalState = {
    navn: "",
    brygger: "",
    kaffeId: "def",
    liter: 0,
    skjeer: 0,
    visBryggRegistrering: false
}

const nyttBryggReducer = (state: IBryggRegistrering = initalState, action: IAction<string | number | boolean>) : IBryggRegistrering => {
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
        default:
            return state
    }
}

export default nyttBryggReducer

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