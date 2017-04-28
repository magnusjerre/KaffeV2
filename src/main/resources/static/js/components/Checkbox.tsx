import * as React from "react"
import {KeyCode} from "../KeyCode";

let cross = require("../../images/cross.png")
declare function require(name: string) : any

interface ICheckBox {
    onChangeCheck: (check: boolean, id: string) => void
    checked: boolean
    id: string
}

const CheckBox : React.StatelessComponent<ICheckBox> = ({onChangeCheck, checked, id}) => (
    <div className="myCheckBoxContainer">
        <input id={id} checked={checked} type="checkbox" onKeyUp={(e: React.KeyboardEvent<any>) => {
            if (e.keyCode === KeyCode.ENTER) {
                onChangeCheck(!checked, id)
            }
        }} onClick={ (e: React.FormEvent<HTMLInputElement>) => {
            e.currentTarget.blur()
            onChangeCheck(!checked, id)
        }} readOnly={true}/>
        <label htmlFor={id} ></label>
    </div>

)

export default CheckBox