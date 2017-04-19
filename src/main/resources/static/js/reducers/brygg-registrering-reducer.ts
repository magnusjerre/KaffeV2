import {IAction, IBryggRegistrering, IPropertyChange} from "../models";
import {ADD_BRYGG_REQUEST, ADD_BRYGG_SUCCESS, NEW_BRYGG_PROP_CHANGE} from "../actions/brygg_actions";

const initalState = {
    navn: "",
    brygger: "",
    kaffeId: "def",
    liter: 0,
    skjeer: 0,
    visBryggRegistrering: false
}

const bryggRegistreringReducer = (state: IBryggRegistrering = initalState, action: IAction<string | number | boolean | IPropertyChange>) : IBryggRegistrering => {
    let newState = clone(state)
    switch(action.type) {
        case NEW_BRYGG_PROP_CHANGE: {
            let payload = action.payload as IPropertyChange
            let copyState = JSON.parse(JSON.stringify(state))
            copyState[payload.property] = payload.value
            return copyState
        }
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