import {IAction, IKaffe, IPropertyChange} from "../models";
import {Dispatch} from "react-redux";
import {ThunkAction} from "redux-thunk";
import {retrieveKaffer} from "../factory";
export const KAFFE_REGISTRERING = "Registrer ny kaffe"
export const KAFFE_CLEAR_REGISTRERING = "Clear registrering ny kaffe"
export const KAFFE_CHANGE_PROPERTIES = "Change kaffe registrering property"
export const FETCH_KAFFER_REQUEST = "FETCH_KAFFER_REQUEST"
export const FETCH_KAFFER_SUCCESS = "FETCH_KAFFER_SUCCESS"
export const KAFFE_CHANGE_VISIBILITY = "Change kaffe visibility"

export const createRequestAction = (): IAction<Boolean> => {
    return {
        type: FETCH_KAFFER_REQUEST,
        payload: true
    }
}

export const createSuccessAction = (kaffer: IKaffe[]): IAction<IKaffe[]> => {
    return {
        type: FETCH_KAFFER_SUCCESS,
        payload: kaffer
    }
}

export const fetchKafferAction = (): ThunkAction<void, IKaffe[], void> => (dispatch: Dispatch<IAction<IKaffe[]>>) => {
    console.log("fetchKafferAction")
    dispatch(createRequestAction())
    return fetch("/api/kaffe")
        .then((response: Response) => response.json())
        .then((result: any) => {
            dispatch(createSuccessAction(result))
        })
}

export const createChangeKaffeRegistreringPropertyAction = (prop: string, val: any): IAction<IPropertyChange> => {
    return {
        type: KAFFE_CHANGE_PROPERTIES,
        payload: {
            property: prop,
            value: val
        }
    }
}

export const createClearRegistreringAction = (): IAction<void> => {
    return {
        type: KAFFE_CLEAR_REGISTRERING,
        payload: undefined
    }
}

export const createRegistrerKaffeAction = (nyKaffe: IKaffe): ThunkAction<void, IKaffe, void> => (dispatch: Dispatch<any>) => {
    return fetch("/api/kaffe/", {
        method: "POST",
        body: JSON.stringify(nyKaffe),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response: Response) => response.json())
        .then((json: any) => {
            dispatch(fetchKafferAction())
        })
}

export interface IChangeSynlighet {
    bryggId: string
    visible: boolean
}

export const createChangeKaffeVisibilityAction = (visible: boolean, bryggId: string): IAction<IChangeSynlighet> => {
    return {
        type: KAFFE_CHANGE_VISIBILITY,
        payload: {
            bryggId,
            visible
        }
    }
}

export const changeVisibility = (visible: boolean, bryggId: string): ThunkAction<void, void, void> => (dispatch: Dispatch<any>) => {
    let url = `api/kaffe/${bryggId}/synlighet`
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(visible),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response: Response) => response.json()).then((json: any) => {
        let kaffe = json as IKaffe
        if (kaffe) {
            dispatch(createChangeKaffeVisibilityAction(kaffe.vis, kaffe._id))

        }
    })
}