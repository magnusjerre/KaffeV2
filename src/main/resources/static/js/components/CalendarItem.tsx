import * as React from "react"

interface ICalendarItemDispatch {
    clicked?: (date: string) => void
}

export interface ICalendarItem extends ICalendarItemDispatch {
    date: string
    calId: string
}

const CalendarItem : React.StatelessComponent<ICalendarItem> = ({date, calId, clicked}) => (
    <div id={calId} className={isNaN(parseInt(date)) ? "cItem hidden" : "cItem"} onClick={e => clicked(date)}>
        <p className="cIDate">{date}</p>
    </div>
)

export default CalendarItem