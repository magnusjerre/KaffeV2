import * as React from "react"
import {IKaffeSelect} from "../models"

const KaffeSelect : React.StatelessComponent<IKaffeSelect> = ({muligeKaffer, onChangeKaffe, name, value, autofocus = false, required = false}) => (
    <select required={required} autoFocus={autofocus} name={name} onChange={ (e: React.FormEvent<HTMLSelectElement>) => {e.preventDefault(); onChangeKaffe(name, e.currentTarget.value)}} value={value}>
        <option value="">Velg kaffe</option>
        {
            muligeKaffer.map(kaffe => (
                <option key={kaffe._id} value={kaffe._id}>{kaffe.navn}</option>
            ))
        }
    </select>
)

export default KaffeSelect

