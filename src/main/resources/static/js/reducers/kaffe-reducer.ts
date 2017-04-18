import {IAction, IKaffe, IKaffeFetcher} from "../models";
import {FETCH_KAFFER_REQUEST, FETCH_KAFFER_SUCCESS} from "../actions/kaffe_actions";

const initState : IKaffeFetcher = {
    muligeKaffer: [],
    isFetching: false
}

const kaffeReducer = (state: IKaffeFetcher = initState, action: IAction<Boolean | IKaffe[]>) => {
    switch (action.type) {
        case FETCH_KAFFER_REQUEST:
            return {
                muligeKaffer: state.muligeKaffer.slice(),
                isFetching: true
            }
        case FETCH_KAFFER_SUCCESS:
            return {
                muligeKaffer: action.payload,
                isFetching: false
            }
        default:
            return state
    }
}

export default kaffeReducer