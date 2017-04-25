import * as React from "react"
import Button from "./Button";

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
        <Button value="Lukk" onClick={dismiss} inputId={bryggId}/>
    </div>
)

export default DismissableMessage