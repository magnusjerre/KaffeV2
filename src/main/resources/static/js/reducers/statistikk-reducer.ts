import {IAction, IStatistikkState, StatistikkIntervall} from "../models";
import {FETCH_STATISTIKK_SUCCESS, IStatistikkFetch} from "../actions/statistikk_actions";
import {deepCopy} from "../factory";

const initialState : IStatistikkState = {
    uke: [],
    mnd: [],
    evigheten: []
}

export const statistikkReducer = (state: IStatistikkState = initialState, action: IAction<IStatistikkFetch>) : IStatistikkState => {
    switch (action.type) {
        case FETCH_STATISTIKK_SUCCESS: {
            let newState : IStatistikkState = deepCopy(state)
            if (action.payload.field === StatistikkIntervall.UKE) {
                newState.uke = action.payload.statistikk
            } else if (action.payload.field === StatistikkIntervall.MND) {
                newState.mnd = action.payload.statistikk
            } else if (action.payload.field === StatistikkIntervall.EVIGHETEN) {
                newState.evigheten = action.payload.statistikk
            }
            return newState
        }
        default:
            return state
    }
}