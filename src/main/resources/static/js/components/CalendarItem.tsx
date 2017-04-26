import * as React from "react"
import AntallIndikator from "./AntallIndikator";

interface ICalendarItemDispatch {
    clicked?: (date: string) => void
}

export interface ICalendarItem extends ICalendarItemDispatch {
    date: string
    calId: string
    numberOfBrygg: number
}

const CalendarItem : React.StatelessComponent<ICalendarItem> = ({date, calId, numberOfBrygg, clicked}) => (
    <button autoFocus={date === "1"} id={calId} className={isNaN(parseInt(date)) ? "cItem hidden" : "cItem"} onClick={e => { e.currentTarget.blur(); clicked(date) }}>
        <div className="cItemSub">
            <p className="cIDate">{date}</p>
            <AntallIndikator value={numberOfBrygg}/>
        </div>
    </button>
)

export default CalendarItem