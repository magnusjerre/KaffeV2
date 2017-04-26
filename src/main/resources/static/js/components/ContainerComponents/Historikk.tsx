import * as React from "react";
import {connect, Dispatch} from "react-redux";
import Calendar from "../Calendar";
import {IBrygg, IKaffe, IState} from "../../models";
import {findBryggWithIDs, getMonthName} from "../../factory";
import HistorikkDag from "./HistorikkDag";
import {
    createClearSelectedDayAction,
    createFetchBryggForMonthAction,
    createHistoryChangeBryggForDayAction
} from "../../actions/kalender_actions";

let leftArrow = require("../../../images/arrow_left.png")

declare function require(name: string): any

interface  IHistorikkComp {
    month?: number
    year?: number
    kaffer?: IKaffe[]
    valgtBrygg?: IBrygg
    dagensBrygg?: IBrygg[]
    onClose?: Function
    onChangeBrygg?: (id: string) => void
    nextMonth?: Function
    prevMonth?: Function
}

const HistorikkComp : React.StatelessComponent<IHistorikkComp> = ({month = new Date().getFullYear(), year = new Date().getMonth(), valgtBrygg, kaffer, dagensBrygg, onClose, onChangeBrygg, nextMonth, prevMonth}) => (
    <div className="verticalContainer">
        <div className="horizontalContainer">
            <button className="monthArrow" onClick={e => prevMonth(year, month)} />
            <span className="historyMonth">{getMonthName(month) + " " + year}</span>
            <button className="monthArrow rotated" onClick={e => nextMonth(year, month)} />
        </div>
        {
            dagensBrygg && dagensBrygg.length > 0 ? <HistorikkDag onClose={onClose} kaffer={kaffer} dagensBrygg={dagensBrygg} valgtBrygg={valgtBrygg} changeBrygg={onChangeBrygg}/> : <Calendar year={year} month={month}/>
        }
    </div>
)

const mapStateToProps = (state: IState, props: IHistorikkComp) : IHistorikkComp => {
    return {
        month: state.kalender.month,
        year: state.kalender.year,
        kaffer: state.kaffer.muligeKaffer,
        valgtBrygg: state.kalender.utvalgtBrygg,
        dagensBrygg: findBryggWithIDs(state.kalender.utvalgteBrygg, state.kalender.bryggForMnd)
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) : IHistorikkComp => {
    return {
        onClose: () => {
            dispatch(createClearSelectedDayAction())
        },
        onChangeBrygg: (id: string) => {
            dispatch(createHistoryChangeBryggForDayAction(id))
        },
        nextMonth: (currentYear: number, currentMonth: number) => {
            dispatch(createFetchBryggForMonthAction(currentYear, currentMonth + 1))
            // dispatch(createSetCalendarMonthAction(currentYear, currentMonth))
        },
        prevMonth: (currentYear: number, currentMonth: number) => {
            dispatch(createFetchBryggForMonthAction(currentYear, currentMonth - 1))
        }
    }
}

const Historikk = connect(mapStateToProps, mapDispatchToProps)(HistorikkComp)
export default Historikk
