import {IAction, IKaffe} from "../models";
import {Dispatch} from "react-redux";
import {ThunkAction} from "redux-thunk";
import {retrieveKaffer} from "../factory";
export const FETCH_KAFFER_REQUEST = "FETCH_KAFFER_REQUEST"
export const FETCH_KAFFER_SUCCESS = "FETCH_KAFFER_SUCCESS"

export const createRequestAction = (): IAction<Boolean> => {
    return {
        type: FETCH_KAFFER_REQUEST,
        payload: true
    }
}

export const createSuccessAction = (kaffer: IKaffe[]) : IAction<IKaffe[]> => {
    return {
        type: FETCH_KAFFER_SUCCESS,
        payload: kaffer
    }
}

export const fetchKafferAction = () : ThunkAction<void, IKaffe[], void> => (dispatch: Dispatch<IAction<IKaffe[]>>) => {
    console.log("fetchKafferAction")
    dispatch(createRequestAction())
    return fetch("/api/kaffe/synlige")
        .then((response: Response) => response.json())
        .then((result: any) => { dispatch(createSuccessAction(result)) })
}