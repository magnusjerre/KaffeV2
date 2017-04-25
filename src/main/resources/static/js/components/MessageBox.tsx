import * as React from "react"
import Button from "./Button";

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
        <div className="horizontalContainer">
            <Button onClick={cancel} value="Nei" inputId={bryggId} outerClasses="buttonOuter halfWidth"/>
            <Button onClick={accept} value="Ja" inputId={bryggId} outerClasses="buttonOuter halfWidth"/>
        </div>
    </div>
)

export default MessageBox