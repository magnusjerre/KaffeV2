import {IAction, IKaffe, IKaffeFetcher} from "../models";
import {
    FETCH_KAFFER_REQUEST,
    FETCH_KAFFER_SUCCESS,
    IChangeSynlighet,
    KAFFE_CHANGE_VISIBILITY
} from "../actions/kaffe_actions";
import {deepCopy, findBryggById, findIndexForBryggById} from "../factory";

const initState : IKaffeFetcher = {
    muligeKaffer: [],
    alleKaffer: [],
    isFetching: false
}

const kaffeReducer = (state: IKaffeFetcher = initState, action: IAction<Boolean | IKaffe[] | IChangeSynlighet>) => {
    switch (action.type) {
        case FETCH_KAFFER_REQUEST:
            return {
                muligeKaffer: state.muligeKaffer.slice(),
                alleKaffer: state.alleKaffer.slice(),
                isFetching: true
            }
        case FETCH_KAFFER_SUCCESS: {
            let payload: IKaffe[] = action.payload as IKaffe[]
            return {
                muligeKaffer: payload.filter(kaffe => kaffe.vis),
                alleKaffer: payload,
                isFetching: false
            }
        }
        case KAFFE_CHANGE_VISIBILITY: {
            let payload : IChangeSynlighet = action.payload as IChangeSynlighet
            let mulige = deepCopy(state.muligeKaffer)
            let alle = deepCopy(state.alleKaffer)
            let mBryggIndex = findIndexForBryggById(payload.bryggId, mulige)
            if (mBryggIndex != -1) {
                mulige.splice(mBryggIndex, 1)
            }
            let aBrygg = findBryggById(payload.bryggId, alle)
            if (aBrygg) {
                aBrygg.vis = payload.visible
                if (mBryggIndex == -1) {
                    mulige.push(deepCopy(aBrygg))
                }
            }
            return {
                muligeKaffer: mulige,
                alleKaffer: alle,
                isFetching: false
            }
        }
        default:
            return state
    }
}

export default kaffeReducer