import {IAction, IBrygg} from "../models";
import {createBrygg} from "../factory";
import {Action} from "history";
import {FETCH_BRYGG_REQUEST, FETCH_BRYGG_SUCCESS} from "../actions/brygg_actions";
import {ReactText} from "react";

const bryggReducer = (state: IBrygg[] = [], action: IAction<IBrygg[]>) : IBrygg[] => {
    switch (action.type) {
        case FETCH_BRYGG_REQUEST:
            return state
        case FETCH_BRYGG_SUCCESS:
            return action.payload
        default:
            return state
    }
}

export default bryggReducer