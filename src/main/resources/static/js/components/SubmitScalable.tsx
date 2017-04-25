import * as React from "react"

export interface IInputScalable {
    innerClasses?: string
    outClasses?: string
    value: string
}

const SubmitScalable : React.StatelessComponent<IInputScalable> = ({innerClasses = "buttonInner", outClasses = "buttonOuter", value}) => (
    <button className={outClasses} type="submit" >
        <span className={innerClasses}>{value}</span>
    </button>
)

export default SubmitScalable