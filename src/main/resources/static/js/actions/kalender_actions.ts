import {IAction, IBrygg} from "../models";
import {Dispatch} from "react-redux";
import {ThunkAction} from "redux-thunk";
export const CALENDAR_SELECTED_BRYGG = "Selected brygg for dato"
export const SET_CALENDAR_MONTH = "Set calendar month"
export const CHANGE_CALENDAR_MONTH = "Change calendar month by amount"
export const SET_BRYGG_FOR_MONTH = "Set brygg for month"
export const CLEAR_SELECTED_DAY = "Clearing selected day"
export const HISTORY_CHANGE_BRYGG_FOR_DAY = "Change brygg for selected day"

export interface IKalenderDatoer {
    from: Date
    to: Date
}

export const createCalendarSelectedBrygg = (from: Date, to: Date) : IAction<IKalenderDatoer> => {
    return {
        type: CALENDAR_SELECTED_BRYGG,
        payload: {
            from,
            to
        }
    }
}

export const createSetCalendarMonthAction = (year: number, month: number) : IAction<Date> => {
    return {
        type: SET_CALENDAR_MONTH,
        payload: new Date(year, month, 1)
    }
}

export const createChangeCalendarMonthAction = (amount: number) : IAction<number> => {
    return {
        type: CHANGE_CALENDAR_MONTH,
        payload: amount
    }
}

export const createSetBryggForMonthAction = (brygg: IBrygg[]) : IAction<IBrygg[]> => {
    return {
        type: SET_BRYGG_FOR_MONTH,
        payload: brygg
    }
}

export const createClearSelectedDayAction = () : IAction<void> => {
    return {
        type: CLEAR_SELECTED_DAY,
        payload: undefined
    }
}

export const createHistoryChangeBryggForDayAction = (bryggId: string) : IAction<string> => {
    return {
        type: HISTORY_CHANGE_BRYGG_FOR_DAY,
        payload: bryggId
    }
}

export const createFetchBryggForMonthAction = (year: number, month: number) : ThunkAction<void, void, void> => (dispatch: Dispatch<any>) => {
    dispatch(createSetCalendarMonthAction(year, month))
    let firstDay = format(getFirstDay(year, month))
    let nextMonth = format(getLastDay(year, month))
    return fetch(`/api/brygg?fra=${firstDay}&til=${nextMonth}`).then((response: Response) => response.json()).then((json : any)=> {
        dispatch(createSetBryggForMonthAction(json as IBrygg[]))
    })
}

function format(date: Date) {
    return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`
}

function getLastDay(year: number, month: number) : Date {
    return new Date(year, month + 1, 1)
}

function getFirstDay(year: number, month: number) : Date {
    return new Date(year, month, 1)
}