import {IAction, IKaffe, IPropertyChange, IState} from "../models";
import {KAFFE_CHANGE_PROPERTIES, KAFFE_CLEAR_REGISTRERING, KAFFE_REGISTRERING} from "../actions/kaffe_actions";
import {deepCopy} from "../factory";

const initialState : IKaffe = {
    navn: "",
    produsent: "",
    land: "",
    vis: true
}

const kafferegistreringReducer = (state: IKaffe = initialState, action: IAction<IPropertyChange>) => {
    switch (action.type) {
        case KAFFE_CLEAR_REGISTRERING: {
            return deepCopy(initialState)
        }
        case KAFFE_CHANGE_PROPERTIES: {
            let newState = deepCopy(state)
            newState[action.payload.property] = action.payload.value
            return newState
        }
        default:
            return state;
    }
}
export default kafferegistreringReducer