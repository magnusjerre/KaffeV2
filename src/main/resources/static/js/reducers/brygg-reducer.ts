import {IAction, IBrygg} from "../models";
import {FETCH_BRYGG_REQUEST, FETCH_BRYGG_SUCCESS} from "../actions/brygg_actions";
import {
    IKarakterRegEndringAction,
    REGISTRER_KARAKTER_CHANGE_ACTION,
    REGISTRER_KARAKTER_CLEAR_ACTION, REGISTRER_KARAKTER_FLYTT_ACTION
} from "../actions/karakter_actions";
import {deepCopy} from "../factory";

const bryggReducer = (state: IBrygg[] = [], action: IAction<IBrygg[] | IKarakterRegEndringAction | string>) : IBrygg[] => {
    switch (action.type) {
        case FETCH_BRYGG_REQUEST:
            return state
        case FETCH_BRYGG_SUCCESS:
            let bryggPayload : IBrygg[] = action.payload as IBrygg[]
            addNyKarakterFieldToEachBrygg(bryggPayload)
            return bryggPayload
        case REGISTRER_KARAKTER_CLEAR_ACTION: {
            let newState = deepCopy(state)
            let brygg = findBryggById(action.payload as string, newState)
            if (brygg == null) {
                return state;
            }
            brygg.nyKarakter = {
                bruker: "",
                kaffeId: "def",
                karakter: 0,
                kommentar: ""
            }
            return newState
        }
        case REGISTRER_KARAKTER_CHANGE_ACTION: {
            let regEndrPayload: IKarakterRegEndringAction = action.payload as IKarakterRegEndringAction
            let newState = deepCopy(state)
            let brygg = findBryggById(regEndrPayload.bryggId, newState) as any
            if (brygg == null) {
                return state
            }
            brygg.nyKarakter[regEndrPayload.field] = regEndrPayload.value
            return newState
        }
        case REGISTRER_KARAKTER_FLYTT_ACTION: {
            let payload : IKarakterRegEndringAction = action.payload as IKarakterRegEndringAction
            let newState = deepCopy(state)
            let brygg = findBryggById(payload.bryggId, newState)
            if (brygg == null) {
                return state
            }
            brygg.karakterer.push(brygg.nyKarakter)
            return newState
        }
        default:
            return state
    }
}

function findBryggById(id: string, bryggListe: IBrygg[]) : IBrygg {
    for (let i = 0; i < bryggListe.length; i++) {
        let brygg = bryggListe[i]
        if (brygg._id === id) {
            return brygg
        }
    }
    return null
}

function addNyKarakterFieldToEachBrygg(bryggListe: IBrygg[]) {
    for (let i = 0; i < bryggListe.length; i++) {
        let brygg = bryggListe[i]
        brygg.nyKarakter = {
            bruker: "",
            kaffeId: "def",
            karakter: 0,
            kommentar: ""
        }
    }
}

export default bryggReducer