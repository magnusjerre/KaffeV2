import {IAction, IBryggReg, IBryggRegistrering, IPropertyChange} from "../models";
import {ADD_BRYGG_REQUEST, ADD_BRYGG_SUCCESS, NEW_BRYGG_PROP_CHANGE, TOGGLE_NEW_BRYGG} from "../actions/brygg_actions";
import {deepCopy} from "../factory";

const initalState : IBryggReg = {
    brygg: {
        navn: "",
        brygger: "",
        kaffeId: "def",
        liter: 0,
        skjeer: 0,
        visBryggRegistrering: false
    },
    visKnapp: true
}

const bryggRegistreringReducer = (state: IBryggReg = initalState, action: IAction<void | string | number | boolean | IPropertyChange>) : IBryggReg => {
    let newState = deepCopy(state)
    switch(action.type) {
        case NEW_BRYGG_PROP_CHANGE: {
            let payload = action.payload as IPropertyChange
            let copyState = JSON.parse(JSON.stringify(state))
            copyState.brygg[payload.property] = payload.value
            return copyState
        }
        case ADD_BRYGG_REQUEST: {
            return newState
        }
        case ADD_BRYGG_SUCCESS: {
            return {
                brygg: deepCopy(initalState.brygg),
                visKnapp: state.visKnapp
            }
        }
        case TOGGLE_NEW_BRYGG: {
            newState.visKnapp = !newState.visKnapp
            return newState
        }
        default:
            return state
    }
}

export default bryggRegistreringReducer