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
    let map = {
        "11": getDayOfMonth("11", firstDay, lastDayOfMonth),
        "21": getDayOfMonth("21", firstDay, lastDayOfMonth),
        "31": getDayOfMonth("31", firstDay, lastDayOfMonth),
        "41": getDayOfMonth("41", firstDay, lastDayOfMonth),
        "51": getDayOfMonth("51", firstDay, lastDayOfMonth),
        "61": getDayOfMonth("61", firstDay, lastDayOfMonth),
        "12": getDayOfMonth("12", firstDay, lastDayOfMonth),
        "22": getDayOfMonth("22", firstDay, lastDayOfMonth),
        "32": getDayOfMonth("32", firstDay, lastDayOfMonth),
        "42": getDayOfMonth("42", firstDay, lastDayOfMonth),
        "52": getDayOfMonth("52", firstDay, lastDayOfMonth),
        "62": getDayOfMonth("62", firstDay, lastDayOfMonth),
        "13": getDayOfMonth("13", firstDay, lastDayOfMonth),
        "23": getDayOfMonth("23", firstDay, lastDayOfMonth),
        "33": getDayOfMonth("33", firstDay, lastDayOfMonth),
        "43": getDayOfMonth("43", firstDay, lastDayOfMonth),
        "53": getDayOfMonth("53", firstDay, lastDayOfMonth),
        "63": getDayOfMonth("63", firstDay, lastDayOfMonth),
        "14": getDayOfMonth("14", firstDay, lastDayOfMonth),
        "24": getDayOfMonth("24", firstDay, lastDayOfMonth),
        "34": getDayOfMonth("34", firstDay, lastDayOfMonth),
        "44": getDayOfMonth("44", firstDay, lastDayOfMonth),
        "54": getDayOfMonth("54", firstDay, lastDayOfMonth),
        "64": getDayOfMonth("64", firstDay, lastDayOfMonth),
        "15": getDayOfMonth("15", firstDay, lastDayOfMonth),
        "25": getDayOfMonth("25", firstDay, lastDayOfMonth),
        "35": getDayOfMonth("35", firstDay, lastDayOfMonth),
        "45": getDayOfMonth("45", firstDay, lastDayOfMonth),
        "55": getDayOfMonth("55", firstDay, lastDayOfMonth),
        "65": getDayOfMonth("65", firstDay, lastDayOfMonth),
        "16": getDayOfMonth("16", firstDay, lastDayOfMonth),
        "26": getDayOfMonth("26", firstDay, lastDayOfMonth),
        "36": getDayOfMonth("36", firstDay, lastDayOfMonth),
        "46": getDayOfMonth("46", firstDay, lastDayOfMonth),
        "56": getDayOfMonth("56", firstDay, lastDayOfMonth),
        "66": getDayOfMonth("66", firstDay, lastDayOfMonth),
        "17": getDayOfMonth("17", firstDay, lastDayOfMonth),
        "27": getDayOfMonth("27", firstDay, lastDayOfMonth),
        "37": getDayOfMonth("37", firstDay, lastDayOfMonth),
        "47": getDayOfMonth("47", firstDay, lastDayOfMonth),
        "57": getDayOfMonth("57", firstDay, lastDayOfMonth),
        "67": getDayOfMonth("67", firstDay, lastDayOfMonth)
    }
    return (
    <div className="calendar">
        <div className="calendarDayOfWeek">
            <p className="cHeader">Mandag</p>
            <CalendarItem calId="11" date={map["11"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["11"]), month, year, bryggForMnd)}/>
            <CalendarItem calId="21" date={map["21"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["21"]), month, year, bryggForMnd)}/>
            <CalendarItem calId="31" date={map["31"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["31"]), month, year, bryggForMnd)}/>
            <CalendarItem calId="41" date={map["41"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["41"]), month, year, bryggForMnd)}/>
            <CalendarItem calId="51" date={map["51"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["51"]), month, year, bryggForMnd)}/>
            <CalendarItem calId="61" date={map["61"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["61"]), month, year, bryggForMnd)}/>
        </div>
        <div className="calendarDayOfWeek">
            <p className="cHeader">Tirsdag</p>
            <CalendarItem calId="12" date={map["12"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["12"]), month, year, bryggForMnd)}/>
            <CalendarItem calId="22" date={map["22"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["22"]), month, year, bryggForMnd)}/>
            <CalendarItem calId="32" date={map["32"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["32"]), month, year, bryggForMnd)}/>
            <CalendarItem calId="42" date={map["42"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["42"]), month, year, bryggForMnd)}/>
            <CalendarItem calId="52" date={map["52"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["52"]), month, year, bryggForMnd)}/>
            <CalendarItem calId="62" date={map["62"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["62"]), month, year, bryggForMnd)}/>
        </div>
        <div className="calendarDayOfWeek">
            <p className="cHeader">Onsdag</p>
            <CalendarItem calId="13" date={map["13"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["13"]), month, year, bryggForMnd)}/>
            <CalendarItem calId="23" date={map["23"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["23"]), month, year, bryggForMnd)}/>
            <CalendarItem calId="33" date={map["33"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["33"]), month, year, bryggForMnd)}/>
            <CalendarItem calId="43" date={map["43"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["34"]), month, year, bryggForMnd)}/>
            <CalendarItem calId="53" date={map["53"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["35"]), month, year, bryggForMnd)}/>
            <CalendarItem calId="63" date={map["63"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["36"]), month, year, bryggForMnd)}/>
        </div>
        <div className="calendarDayOfWeek">
            <p className="cHeader">Torsdag</p>
            <CalendarItem calId="14" date={map["14"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["14"]), month, year, bryggForMnd)}/>
            <CalendarItem calId="24" date={map["24"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["24"]), month, year, bryggForMnd)}/>
            <CalendarItem calId="34" date={map["34"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["34"]), month, year, bryggForMnd)}/>
            <CalendarItem calId="44" date={map["44"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["44"]), month, year, bryggForMnd)}/>
            <CalendarItem calId="54" date={map["54"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["54"]), month, year, bryggForMnd)}/>
            <CalendarItem calId="64" date={map["64"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["64"]), month, year, bryggForMnd)}/>
        </div>
        <div className="calendarDayOfWeek">
            <p className="cHeader">Fredag</p>
            <CalendarItem calId="15" date={map["15"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["15"]), month, year, bryggForMnd)}/>
            <CalendarItem calId="25" date={map["25"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["25"]), month, year, bryggForMnd)}/>
            <CalendarItem calId="35" date={map["35"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["35"]), month, year, bryggForMnd)}/>
            <CalendarItem calId="45" date={map["45"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["45"]), month, year, bryggForMnd)}/>
            <CalendarItem calId="55" date={map["55"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["55"]), month, year, bryggForMnd)}/>
            <CalendarItem calId="65" date={map["65"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["65"]), month, year, bryggForMnd)}/>
        </div>
        <div className="calendarDayOfWeek">
            <p className="cHeader">Lørdag</p>
            <CalendarItem calId="16" date={map["16"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["16"]), month, year, bryggForMnd)}/>
            <CalendarItem calId="26" date={map["26"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["26"]), month, year, bryggForMnd)}/>
            <CalendarItem calId="36" date={map["36"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["36"]), month, year, bryggForMnd)}/>
            <CalendarItem calId="46" date={map["46"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["46"]), month, year, bryggForMnd)}/>
            <CalendarItem calId="56" date={map["56"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["56"]), month, year, bryggForMnd)}/>
            <CalendarItem calId="66" date={map["66"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["66"]), month, year, bryggForMnd)}/>
        </div>
        <div className="calendarDayOfWeek">
            <p className="cHeader">Søndag</p>
            <CalendarItem calId="17" date={map["17"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["17"]), month, year, bryggForMnd)}/>
            <CalendarItem calId="27" date={map["27"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["27"]), month, year, bryggForMnd)}/>
            <CalendarItem calId="37" date={map["37"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["37"]), month, year, bryggForMnd)}/>
            <CalendarItem calId="47" date={map["47"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["47"]), month, year, bryggForMnd)}/>
            <CalendarItem calId="57" date={map["57"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["57"]), month, year, bryggForMnd)}/>
            <CalendarItem calId="67" date={map["67"]} clicked={onClick(year, month)} numberOfBrygg={getNumberOfBryggForDay(parseInt(map["67"]), month, year, bryggForMnd)}/>
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

function getNumberOfBryggForDay(day: number, month: number, year: number, bryggListe: IBrygg[]) {
    if (isNaN(day)) {
        return -1
    }
    let min = new Date(year, month, day).getTime()
    let max = new Date(year, month, day + 1).getTime()
    let sum = 0;
    for (let i = 0; i < bryggListe.length; i++) {
        let millis = parseInt(bryggListe[i].dato as string)
        if (min <= millis && millis < max) {
            sum++
        }
    }
    return sum
}

const mapStateToProps = (state: IState, props: ICalendar) : ICalendarProps => {
    return {
        bryggForMnd: state.kalender.bryggForMnd
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

