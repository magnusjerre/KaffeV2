import {IAction, IBrygg, IKarakter, RegistreringVisning} from "../models";
import {ThunkAction} from "redux-thunk";
import {Dispatch} from "react-redux";
import {IKarakterReg} from "../components/ContainerComponents/KarakterRegistrering";
import {createFetchBryggForMonthAction} from "./kalender_actions";

export const REGISTRER_KARAKTER_REQUEST_ACTION = "REGISTRER_KARAKTER_REQUEST_ACTION"
export const REGISTRER_KARAKTER_CHANGE_ACTION = "REGISTRER_KARAKTER_CHANGE_ACTION"
export const REGISTRER_KARAKTER_CLEAR_ACTION = "REGISTRER_KARAKTER_CLEAR_ACTION"
export const REGISTRER_KARAKTER_FLYTT_ACTION = "REGISTRER_KARAKTER_FLYTT_ACTION"
export const CHANGE_VISNING = "Change regsitreringsvisning"

export interface IKarakterRegistreringAction {
    bryggId: string
    karakter: IKarakter
}

export interface IKarakterRegEndringAction {
    bryggId: string
    field: string
    value: string | number
}

export interface IKarakterResultat {
    bryggId: string
    visning: RegistreringVisning
}

export const createKarakterRequestAction = (bryggId: string) : IAction<string> => {
    return {
        type: REGISTRER_KARAKTER_REQUEST_ACTION,
        payload: bryggId
    }
}

export const createClearKarakterRegistreringAction = (bryggId: string) : IAction<string> => {
    return {
        type: REGISTRER_KARAKTER_CLEAR_ACTION,
        payload: bryggId
    }
}

export const createKarakterFlyttAction = (bryggId: string, karakter: IKarakter) : IAction<IKarakterRegistreringAction> => {
    return {
        type: REGISTRER_KARAKTER_FLYTT_ACTION,
        payload: {
            bryggId,
            karakter
        }
    }
}

export const createRegistrerChangeAction = (bryggid: string, field: string, value: string | number) : IAction<IKarakterRegEndringAction> => {
    return {
        type: REGISTRER_KARAKTER_CHANGE_ACTION,
        payload: {
            bryggId: bryggid,
            field: field,
            value: value
        }
    }
}

export const createRegistrerKarakterAction = (bryggId: string, karakter: IKarakter) : ThunkAction<void, void, void> => (dispatch: Dispatch<any>) => {
    dispatch(createKarakterRequestAction(bryggId))
    return fetch(`/api/brygg/${bryggId}/karakter`, {
        method: "POST",
        body: JSON.stringify(karakter),
        headers: {
            "Content-Type":"application/json"
        }
    }).then((response: Response) => response.json()).then( (json: any) => {
        dispatch(createKarakterFlyttAction(bryggId, karakter))
        dispatch(createClearKarakterRegistreringAction(bryggId))
        dispatch(createChangeVisningAction(bryggId, RegistreringVisning.RESULTAT))
        let dato = new Date(parseInt(json.dato as string))
        dispatch(createFetchBryggForMonthAction(dato.getFullYear(), dato.getMonth()))
    })
}

export const createChangeVisningAction = (bryggId: string, visning: RegistreringVisning) : IAction<IKarakterResultat> => {
    return {
        type: CHANGE_VISNING,
        payload: {
            bryggId,
            visning
        }
    }
}