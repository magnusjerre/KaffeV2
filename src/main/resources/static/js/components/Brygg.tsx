import * as React from "react"
import {IBrygg} from "../models";

export interface IBryggComponent {
    brygg: IBrygg
}

const Brygg : React.StatelessComponent<IBryggComponent> = (props) => (
    <div>
        <h2>{props.brygg.navn}</h2>
        <p>{props.brygg.brygger}</p>
    </div>
)

export default Brygg