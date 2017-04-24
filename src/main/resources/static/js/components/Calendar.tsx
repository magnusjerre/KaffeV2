import * as React from "react"
import {IBrygg, IState} from "../models";
import CalendarItem from "./CalendarItem";
import {connect, Dispatch} from "react-redux";
import {
    createCalendarSelectedBrygg, createSetBryggForMonthAction,
    createSetCalendarMonthAction
} from "../actions/kalender_actions";

interface ICalendarProps {
    bryggForMnd?: IBrygg[]
}

interface ICalendarDispatch {
    onClick?: (year: number, month: number) => (date: string) => void
}

interface ICalendar extends ICalendarProps, ICalendarDispatch {
    month: number
    year: number
}

const CalendarComp : React.StatelessComponent<ICalendar> = ({bryggForMnd, onClick, month = new Date().getMonth(), year = new Date().getFullYear()}) => {
    // let firstDay = getFirstDay(year, month)
    let firstDay = getFirstDay(year, month)
    let lastDayOfMonth = getLastDay(year, month)
    console.log("month: " + month + " firstDay: " + firstDay + ", last day: " + lastDayOfMonth)
    return (
    <div className="calendar">
        <div className="calendarDayOfWeek">
            <p className="cHeader">Mandag</p>
            <CalendarItem calId="11" date={getDayOfMonth("11", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
            <CalendarItem calId="21" date={getDayOfMonth("21", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
            <CalendarItem calId="31" date={getDayOfMonth("31", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
            <CalendarItem calId="41" date={getDayOfMonth("41", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
            <CalendarItem calId="51" date={getDayOfMonth("51", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
            <CalendarItem calId="61" date={getDayOfMonth("61", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
        </div>
        <div className="calendarDayOfWeek">
            <p className="cHeader">Tirsdag</p>
            <CalendarItem calId="12" date={getDayOfMonth("12", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
            <CalendarItem calId="22" date={getDayOfMonth("22", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
            <CalendarItem calId="32" date={getDayOfMonth("32", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
            <CalendarItem calId="42" date={getDayOfMonth("42", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
            <CalendarItem calId="52" date={getDayOfMonth("52", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
            <CalendarItem calId="62" date={getDayOfMonth("62", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
        </div>
        <div className="calendarDayOfWeek">
            <p className="cHeader">Onsdag</p>
            <CalendarItem calId="13" date={getDayOfMonth("13", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
            <CalendarItem calId="23" date={getDayOfMonth("23", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
            <CalendarItem calId="33" date={getDayOfMonth("33", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
            <CalendarItem calId="43" date={getDayOfMonth("43", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
            <CalendarItem calId="53" date={getDayOfMonth("53", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
            <CalendarItem calId="63" date={getDayOfMonth("63", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
        </div>
        <div className="calendarDayOfWeek">
            <p className="cHeader">Torsdag</p>
            <CalendarItem calId="14" date={getDayOfMonth("14", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
            <CalendarItem calId="24" date={getDayOfMonth("24", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
            <CalendarItem calId="34" date={getDayOfMonth("34", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
            <CalendarItem calId="44" date={getDayOfMonth("44", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
            <CalendarItem calId="54" date={getDayOfMonth("54", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
            <CalendarItem calId="64" date={getDayOfMonth("64", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
        </div>
        <div className="calendarDayOfWeek">
            <p className="cHeader">Fredag</p>
            <CalendarItem calId="15" date={getDayOfMonth("15", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
            <CalendarItem calId="25" date={getDayOfMonth("25", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
            <CalendarItem calId="35" date={getDayOfMonth("35", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
            <CalendarItem calId="45" date={getDayOfMonth("45", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
            <CalendarItem calId="55" date={getDayOfMonth("55", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
            <CalendarItem calId="65" date={getDayOfMonth("65", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
        </div>
        <div className="calendarDayOfWeek">
            <p className="cHeader">Lørdag</p>
            <CalendarItem calId="16" date={getDayOfMonth("16", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
            <CalendarItem calId="26" date={getDayOfMonth("26", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
            <CalendarItem calId="36" date={getDayOfMonth("36", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
            <CalendarItem calId="46" date={getDayOfMonth("46", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
            <CalendarItem calId="56" date={getDayOfMonth("56", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
            <CalendarItem calId="66" date={getDayOfMonth("66", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
        </div>
        <div className="calendarDayOfWeek">
            <p className="cHeader">Søndag</p>
            <CalendarItem calId="17" date={getDayOfMonth("17", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
            <CalendarItem calId="27" date={getDayOfMonth("27", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
            <CalendarItem calId="37" date={getDayOfMonth("37", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
            <CalendarItem calId="47" date={getDayOfMonth("47", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
            <CalendarItem calId="57" date={getDayOfMonth("57", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
            <CalendarItem calId="67" date={getDayOfMonth("67", firstDay, lastDayOfMonth)} clicked={onClick(year, month)}/>
        </div>
    </div>
)}

//1:mandag, 2:tirsdag..., 6: lørdag, 7:søndag
function getFirstDay(year: number, month: number) {
    let firstOfMonth = new Date(year, month, 1)
    let dayOfWeek = firstOfMonth.getDay()

    if (dayOfWeek == 0) {   //Sunday
        return 7
    }
    return dayOfWeek
}

function getLastDay(year: number, month: number) {
    let lastDateOfMonth = new Date(year, month + 1, 1)
    lastDateOfMonth.setDate(lastDateOfMonth.getDate() - 1)
    return lastDateOfMonth.getDate()
}

function getDayOfMonth(matrixPos: string, firstDayOfWeek: number, lastDayOfMonth: number) : string {
    let row = parseInt(matrixPos.charAt(0))
    let column = parseInt(matrixPos.charAt(1))
    let numberInLine = (row - 1) * 7 + column
    let day = numberInLine - firstDayOfWeek + 1
    if (day < 1) {
        return "Prev"
    } else if (day > lastDayOfMonth) {
        return "Next"
    }
    return "" + day
}

const mapStateToProps = (state: IState, props: ICalendar) : ICalendarProps => {
    return {
        bryggForMnd: state.bryggListe
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) : ICalendarDispatch => {
    return {
        onClick: (year: number, month: number) => (date: string) => {
            let day = parseInt(date)
            let fromDate = new Date(year, month, day)
            let toDate = new Date(year, month, day)
            toDate.setDate(toDate.getDate() + 1)
            dispatch(createCalendarSelectedBrygg(fromDate, toDate))
        }
    }
}

const Calendar = connect(mapStateToProps, mapDispatchToProps)(CalendarComp)
export default Calendar

