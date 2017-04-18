import {IAction, IBrygg, IBryggRegistrering } from "../models"
import {ThunkAction} from "redux-thunk"
import {Dispatch} from "react-redux";
import {createBrygg} from "../factory";

export const ADD_BRYGG_REQUEST = "ADD_BRYGG_REQUEST"
export const ADD_BRYGG_SUCCESS = "ADD_BRYGG_SUCESS"
export const NEW_BRYGG_NAVN = "NEW_BRYGG_NAVN"
export const NEW_BRYGG_BRYGGER = "NEW_BRYGG_BRYGGER"
export const NEW_BRYGG_KAFFEID = "NEW_BRYGG_KAFFEID"
export const NEW_BRYGG_LITER = "NEW_BRYGG_LITER"
export const NEW_BRYGG_SKJEER = "NEW_BRYGG_SKJEER"

//The first statement is a "shorthand" for the second statement
// ... ThunkAction<void, IBryggRegistrering, void> => (dispatch: Dispatch<IAction<IBryggRegistrering>>) => {...}
// ... ThunkAction<void, IBryggRegistrering, void> => { return (dispatch: Dispatch<IAction<IBryggRegistrering>>) => {...} }
export const addBryggAction = (brygg: IBryggRegistrering) : ThunkAction<void, IBryggRegistrering, void> => (dispatch: Dispatch<IAction<IBryggRegistrering>>) => {
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

export const newBryggNavnAction = (navn: string) : IAction<string> => {
    return {
        type: NEW_BRYGG_NAVN,
        payload: navn
    }
}

export const newBryggBryggerAction = (brygger: string) : IAction<string> => {
    return {
        type: NEW_BRYGG_BRYGGER,
        payload: brygger
    }
}

export const newBryggKaffeId = (kaffeId: string) : IAction<string> => {
    return {
        type: NEW_BRYGG_KAFFEID,
        payload: kaffeId
    }
}

export const newBryggLiter = (liter: number) : IAction<number> => {
    return {
        type: NEW_BRYGG_LITER,
        payload: liter
    }
}

export const newBryggSkjeer = (skjeer: number) : IAction<number> => {
    return {
        type: NEW_BRYGG_SKJEER,
        payload: skjeer
    }
}