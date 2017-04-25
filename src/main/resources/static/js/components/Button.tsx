import * as React from "react"

interface IButton {
    onClick: (id: string) => void
    inputId: string
    value: string
    innerClasses?: string
    outerClasses?: string
}

const Button : React.StatelessComponent<IButton> = ({onClick, value, inputId, innerClasses="buttonInner", outerClasses="buttonOuter"}) => (
    <button className={outerClasses} onClick={e => onClick(inputId)}>
        <span className={innerClasses}>{value}</span>
    </button>
)
export default Button