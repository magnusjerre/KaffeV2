import * as React from "react"
import Karakter from "./AntallIndikator";

interface ICalendarItemDispatch {
    clicked?: (date: string) => void
}

export interface ICalendarItem extends ICalendarItemDispatch {
    date: string
    calId: string
    numberOfBrygg: number
}

const CalendarItem : React.StatelessComponent<ICalendarItem> = ({date, calId, numberOfBrygg, clicked}) => (
    <div id={calId} className={isNaN(parseInt(date)) ? "cItem hidden" : "cItem"} onClick={e => clicked(date)}>
        <p className="cIDate">{date}</p>
        <Karakter value={numberOfBrygg}/>
    </div>
)

export default CalendarItem