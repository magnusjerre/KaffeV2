import {IAction, IBrygg, IKarakter} from "../models";
import {ThunkAction} from "redux-thunk";
import {Dispatch} from "react-redux";

export const REGISTRER_KARAKTER_ACTION = "REGISTRER_KARAKTER_ACTION"
export const REGISTRER_KARAKTER_REQUEST_ACTION = "REGISTRER_KARAKTER_REQUEST_ACTION"
export const REGISTRER_KARAKTER_CHANGE_ACTION = "REGISTRER_KARAKTER_CHANGE_ACTION"
export const REGISTRER_KARAKTER_CLEAR_ACTION = "REGISTRER_KARAKTER_CLEAR_ACTION"
export const REGISTRER_KARAKTER_FLYTT_ACTION = "REGISTRER_KARAKTER_FLYTT_ACTION"

export interface IKarakterRegistreringAction {
    bryggId: string
    karakter: IKarakter
}

export interface IKarakterRegEndringAction {
    bryggId: string
    field: string
    value: string | number
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
    })
}