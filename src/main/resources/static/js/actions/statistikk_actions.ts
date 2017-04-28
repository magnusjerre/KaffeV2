import {IAction, IStatistikk, StatistikkIntervall} from "../models";
import {ThunkAction} from "redux-thunk";
import {Dispatch} from "react-redux";
import {
    getEpoch, getFirstDayOfMonth, getFirstDayOfWeek, getLastDayOfMonth, getLastDayOfWeek,
    getTomorrow
} from "../factory";

export const FETCH_STATISTIKK_SUCCESS = "Fetching statistikk success"

export interface IStatistikkFetch {
    field: StatistikkIntervall
    statistikk: IStatistikk[]
}

const createFetchStatistikkSuccessAction = (field: StatistikkIntervall, statistikk : IStatistikk[]) : IAction<IStatistikkFetch> => {
    return {
        type: FETCH_STATISTIKK_SUCCESS,
        payload: {
            field,
            statistikk
        }
    }
}

export const fetchStatistikk = (intervall: StatistikkIntervall) : ThunkAction<void, void, void> => (dispatch: Dispatch<any>) => {
    let start = getStart(intervall)
    let end = getEnd(intervall)
    let url = `api/statistikk?fra=${start}&til=${end}`
    return fetch(url).then((response: Response) => response.json()).then( (json : any) => {
        let statistikk : IStatistikk[] = json as IStatistikk[]
        dispatch(createFetchStatistikkSuccessAction(intervall, statistikk))
    })
}

function format(date: Date) : string {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

function getStart(intervall: StatistikkIntervall) : string {
    if (intervall === StatistikkIntervall.UKE) {
        return format(getFirstDayOfWeek())
    } else if (intervall === StatistikkIntervall.MND) {
        return format(getFirstDayOfMonth())
    } else {
        return format(getEpoch())
    }
}

function getEnd(intervall: StatistikkIntervall) : string {
    if (intervall === StatistikkIntervall.UKE) {
        let end = getLastDayOfWeek()
        end.setDate(end.getDate() + 1)
        return format(end)
    } else if (intervall === StatistikkIntervall.MND) {
        let end = getLastDayOfMonth()
        end.setDate(end.getDate() + 1)
        return format(end)
    } else {
        return format(getTomorrow())
    }
}