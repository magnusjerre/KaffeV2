import * as React from "react"
import {IKaffeSelect} from "../models"

const KaffeSelect : React.StatelessComponent<IKaffeSelect> = ({muligeKaffer, onChangeKaffe, id, name, kaffeId}) => (
    <select id={id} name={name} onChange={ (e: React.FormEvent<HTMLSelectElement>) => {e.preventDefault(); onChangeKaffe(e.currentTarget.value)}} value={kaffeId}>
        <option value="def" disabled={true}>Velg kaffe</option>
        {
            muligeKaffer.map(kaffe => (
                <option key={kaffe._id} value={kaffe._id}>{kaffe.navn}</option>
            ))
        }
    </select>
)

export default KaffeSelect

