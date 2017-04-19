import {IAction, IBrygg} from "../models";
import {FETCH_BRYGG_REQUEST, FETCH_BRYGG_SUCCESS} from "../actions/brygg_actions";
import {
    IKarakterRegEndringAction,
    REGISTRER_KARAKTER_CHANGE_ACTION,
    REGISTRER_KARAKTER_CLEAR_ACTION, REGISTRER_KARAKTER_FLYTT_ACTION
} from "../actions/karakter_actions";

const bryggReducer = (state: IBrygg[] = [], action: IAction<IBrygg[] | IKarakterRegEndringAction | string>) : IBrygg[] => {
    switch (action.type) {
        case FETCH_BRYGG_REQUEST:
            return state
        case FETCH_BRYGG_SUCCESS:
            let bryggPayload : IBrygg[] = action.payload as IBrygg[]
            addNyKarakterFieldToEachBrygg(bryggPayload)
            return bryggPayload
        case REGISTRER_KARAKTER_CLEAR_ACTION: {
            let index = findIndexOfBryggById(action.payload as string, state)
            let bryggCopy = JSON.parse(JSON.stringify(state[index]))
            bryggCopy.nyKarakter = {
                bruker: "",
                kaffeId: "def",
                karakter: 0,
                kommentar: ""
            }
            let newState = state.slice()
            newState[index] = bryggCopy
            return newState
        }
        case REGISTRER_KARAKTER_CHANGE_ACTION: {
            let regEndrPayload: IKarakterRegEndringAction = action.payload as IKarakterRegEndringAction
            let newState = state.slice()
            let index = findIndexOfBryggById(regEndrPayload.bryggId, newState)

            if (index === -1) {
                return state
            }

            let bryggCopy = JSON.parse(JSON.stringify(state[index]))
            bryggCopy.nyKarakter[regEndrPayload.field] = regEndrPayload.value
            newState[index] = bryggCopy
            return newState
        }
        case REGISTRER_KARAKTER_FLYTT_ACTION: {
            let payload : IKarakterRegEndringAction = action.payload as IKarakterRegEndringAction
            let index = findIndexOfBryggById(payload.bryggId, state)
            let bryggCopy = JSON.parse(JSON.stringify(state[index]))
            bryggCopy.karakterer.push(bryggCopy.nyKarakter)
            let newState = state.slice()
            newState[index] = bryggCopy
            return newState
        }
        default:
            return state
    }
}

function findIndexOfBryggById(id: string, bryggListe: IBrygg[]) : number {
    for (let i = 0; i < bryggListe.length; i++) {
        let brygg = bryggListe[i]
        if (brygg._id === id) {
            return i
        }
    }
    return -1
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