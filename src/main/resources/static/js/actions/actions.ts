import {IAction, IBrygg} from "../models";
const ADD_BRYGG = "ADD_BRYGG"

export const addBryggAction = (brygg: IBrygg) : IAction<IBrygg> => {
    return {
        type: ADD_BRYGG,
        payload: brygg
    }
}