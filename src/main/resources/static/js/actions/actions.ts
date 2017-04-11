import {IAction, IBrygg, IBryggRegistrering } from "../models";
const ADD_BRYGG = "ADD_BRYGG"
export const NEW_BRYGG_NAVN = "NEW_BRYGG_NAVN"
export const NEW_BRYGG_BRYGGER = "NEW_BRYGG_BRYGGER"
export const NEW_BRYGG_KAFFEID = "NEW_BRYGG_KAFFEID"
export const NEW_BRYGG_LITER = "NEW_BRYGG_LITER"
export const NEW_BRYGG_SKJEER = "NEW_BRYGG_SKJEER"

export const addBryggAction = (brygg: IBrygg) : IAction<IBrygg> => {
    return {
        type: ADD_BRYGG,
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