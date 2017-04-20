import {IAction, IBrygg, IBryggRegistrering, IPropertyChange} from "../models"
import {ThunkAction} from "redux-thunk"
import {Dispatch} from "react-redux";
import {createBrygg} from "../factory";

export const ADD_BRYGG_REQUEST = "ADD_BRYGG_REQUEST"
export const ADD_BRYGG_SUCCESS = "ADD_BRYGG_SUCESS"
export const NEW_BRYGG_PROP_CHANGE = "NEW_BRYGG_PROP_CHANGE"
export const TOGGLE_NEW_BRYGG = "Toggle new brygg"

export const FETCH_BRYGG_REQUEST = "FETCH_BRYGG_REQUEST"
export const FETCH_BRYGG_SUCCESS = "FETCH_BRYGG_SUCCESS"

//The first statement is a "shorthand" for the second statement
// ... ThunkAction<void, IBryggRegistrering, void> => (dispatch: Dispatch<IAction<IBryggRegistrering>>) => {...}
// ... ThunkAction<void, IBryggRegistrering, void> => { return (dispatch: Dispatch<IAction<IBryggRegistrering>>) => {...} }
export const addBryggAction = (brygg: IBryggRegistrering) : ThunkAction<void, IBryggRegistrering, void> => (dispatch: Dispatch<any>) => {
    dispatch(addBryggRequestAction(brygg))
    let nyttBrygg = JSON.stringify(createBrygg(brygg.navn, brygg.brygger, brygg.kaffeId, brygg.liter, brygg.skjeer))
    return fetch("http://localhost:8080/api/brygg", {
        method: "POST",
        body: nyttBrygg,
        headers: {
            "Content-Type":"application/json"
        }
    }).then( (response: Response) => response.json())
        .then((json: any) => {
            console.log("heio, dette funket");
            dispatch(addBryggSuccessAction())
            dispatch(createFetchBryggAction())
            dispatch(createToggleNyBryggAction())
        })
        .catch((response: Response) => response.statusText)
}

const addBryggSuccessAction = () : IAction<boolean> => {
    return {
        type: ADD_BRYGG_SUCCESS,
        payload: true
    }
}

const addBryggRequestAction = (brygg: IBryggRegistrering) : IAction<IBryggRegistrering> => {
    return {
        type: ADD_BRYGG_REQUEST,
        payload: brygg
    }
}

export const createBryggPropertyChangeAction = (property: string, value: any) : IAction<IPropertyChange> => {
    return {
        type: NEW_BRYGG_PROP_CHANGE,
        payload: {
            property,
            value
        }
    }
}

export const createFetchBryggRequestAction = () : IAction<Boolean> => {
    return {
        type: FETCH_BRYGG_REQUEST,
        payload: true
    }
}

export const createFetchBryggSuccessAction = (brygg: IBrygg[]) : IAction<IBrygg[]> => {
    return {
        type: FETCH_BRYGG_SUCCESS,
        payload: brygg
    }
}

export const createFetchBryggAction = () : ThunkAction<void, IBrygg[], void> => (dispatch: Dispatch<IAction<IBrygg[]>>) => {
    dispatch(createFetchBryggRequestAction())
    let today = new Date()
    let tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    let todayString = `${today.getUTCFullYear()}-${today.getUTCMonth() + 1}-${today.getUTCDate()}`
    let tomorrowString = `${tomorrow.getUTCFullYear()}-${tomorrow.getUTCMonth() + 1}-${tomorrow.getUTCDate()}`

    return fetch("/api/brygg?fra=" + todayString + "&til=" + tomorrowString).then((response: Response) => response.json()).then((json: any) => {dispatch(createFetchBryggSuccessAction(json))})
}

export const createToggleNyBryggAction = () : IAction<void> => {
    return {
        type: TOGGLE_NEW_BRYGG,
        payload: undefined
    }
}