import {IAction, IBrygg, RegistreringVisning} from "../models";
import {FETCH_BRYGG_REQUEST, FETCH_BRYGG_SUCCESS, LUKK_BRYGG_SUCCESS} from "../actions/brygg_actions";
import {
    CHANGE_VISNING,
    IKarakterRegEndringAction, IKarakterResultat,
    REGISTRER_KARAKTER_CHANGE_ACTION,
    REGISTRER_KARAKTER_CLEAR_ACTION, REGISTRER_KARAKTER_FLYTT_ACTION
} from "../actions/karakter_actions";
import {deepCopy, findIndexForBryggById} from "../factory";

const bryggReducer = (state: IBrygg[] = [], action: IAction<IBrygg[] | IKarakterRegEndringAction | IKarakterResultat | string>) : IBrygg[] => {
    switch (action.type) {
        case FETCH_BRYGG_REQUEST:
            return state
        case FETCH_BRYGG_SUCCESS:
            let bryggPayload : IBrygg[] = action.payload as IBrygg[]
            let filtrert = filterOnVis(bryggPayload)
            addFieldsToEachBrygg(filtrert)
            return filtrert
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
            brygg.gjetteResultat = deepCopy(brygg.nyKarakter)
            return newState
        }
        case CHANGE_VISNING: {
            let payload = action.payload as IKarakterResultat
            let newState = deepCopy(state)
            let brygg = findBryggById(payload.bryggId, newState)
            brygg.visning = payload.visning
            return newState
        }
        case LUKK_BRYGG_SUCCESS: {
            let payload = action.payload as string
            let newState = deepCopy(state)
            let index = findIndexForBryggById(payload, newState)
            return newState.splice(index, 1)
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

function filterOnVis(bryggListe: IBrygg[]) {
    let output : IBrygg[] = []
    for (let i = 0; i < bryggListe.length; i++) {
        let brygg = bryggListe[i]
        if (brygg.vis) {
            output.push(brygg)
        }
    }
    return output
}

function addFieldsToEachBrygg(bryggListe: IBrygg[]) {
    for (let i = 0; i < bryggListe.length; i++) {
        let brygg = bryggListe[i]
        brygg.nyKarakter = {
            bruker: "",
            kaffeId: "def",
            karakter: 0,
            kommentar: ""
        }
        brygg.visning = RegistreringVisning.REGISTRERING
        brygg.gjetteResultat = {
            bruker: "",
            kaffeId: "def",
            karakter: 0,
            kommentar: ""
        }
    }
}

export default bryggReducer