import {IAction, IBrygg, IKalenderState} from "../models";
import {
    CALENDAR_SELECTED_BRYGG, CLEAR_SELECTED_DAY, IKalenderDatoer, SET_BRYGG_FOR_MONTH,
    SET_CALENDAR_MONTH, HISTORY_CHANGE_BRYGG_FOR_DAY
} from "../actions/kalender_actions";
import {deepCopy, findBryggById} from "../factory";

const initialState : IKalenderState = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    utvalgteBrygg: [],
    utvalgtBrygg: null,
    bryggForMnd: []
}

const kalenderReducer = (state: IKalenderState = initialState, action: IAction<IKalenderDatoer | Date | IBrygg[] | string>) : IKalenderState => {
    switch (action.type) {
        case CALENDAR_SELECTED_BRYGG: {
            let payload : IKalenderDatoer = action.payload as IKalenderDatoer
            let newState = deepCopy(state)
            newState.utvalgteBrygg = fetchUtvalgteBrygg(payload.from, payload.to, newState.bryggForMnd)
            newState.utvalgtBrygg = findBryggById(newState.utvalgteBrygg[0], state.bryggForMnd)
            return newState
        }
        case SET_CALENDAR_MONTH: {
            let payload : Date = action.payload as Date
            let newState = deepCopy(state)
            newState.month = payload.getMonth()
            newState.year = payload.getFullYear()
            return newState
        }
        case SET_BRYGG_FOR_MONTH: {
            let payload : IBrygg[] = action.payload as IBrygg[]
            let newState = deepCopy(state)
            newState.bryggForMnd = payload
            newState.utvalgteBrygg = []
            return newState
        }
        case CLEAR_SELECTED_DAY: {
            let copyState = deepCopy(state)
            return {
                year: copyState.year,
                month: copyState.month,
                utvalgtBrygg: null,
                utvalgteBrygg: [],
                bryggForMnd: copyState.bryggForMnd
            }
        }
        case HISTORY_CHANGE_BRYGG_FOR_DAY: {
            let payload = action.payload as string
            let copyState = deepCopy(state)
            copyState.utvalgtBrygg = findBryggById(payload, copyState.bryggForMnd)
            return copyState
        }
        default:
            return state
    }
}

export default kalenderReducer

function fetchUtvalgteBrygg(from: Date, to: Date, bryggListe: IBrygg[]) {
    let fromMillis = from.getTime()
    let toMillis = to.getTime()

    let output : Array<string> = []
    for (let i = 0; i < bryggListe.length; i++) {
        let brygg = bryggListe[i]
        let bryggMillis = parseInt(brygg.dato as string)
        if (bryggMillis <= toMillis && bryggMillis >= fromMillis) {
            output.push(brygg._id)
        }
    }
    return output
}
