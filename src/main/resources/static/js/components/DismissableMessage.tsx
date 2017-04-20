import * as React from "react"

interface IResultat {
    bryggId: string
    title: string
    message: string
    dismiss: (bryggId: string) => void
    classes?: string
}

const DismissableMessage : React.StatelessComponent<IResultat> = ({title, message, dismiss, bryggId, classes}) => (
    <div className={classes}>
        <h1>{title}</h1>
        <p>{message}</p>
        <button onClick={e => dismiss(bryggId)}>Lukk</button>
    </div>
)

export default DismissableMessage