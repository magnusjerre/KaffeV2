import * as React from "react"

interface IResultat {
    bryggId: string
    title: string
    message: string
    cancel: (id: string) => void
    accept: (id: string) => void
    classes?: string
}

const MessageBox : React.StatelessComponent<IResultat> = ({title, message, cancel, accept, bryggId, classes}) => (
    <div className={classes}>
        <h1>{title}</h1>
        <p>{message}</p>
        <button className="halfWidth" onClick={e => cancel(bryggId)}>Nei</button>
        <button className="halfWidth" onClick={e => accept(bryggId)}>Ja</button>
    </div>
)

export default MessageBox