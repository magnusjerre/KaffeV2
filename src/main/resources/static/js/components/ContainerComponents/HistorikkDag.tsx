import * as React from "react";
import {IBrygg, IKaffe, IKarakter} from "../../models";
import {calculateSnittKarakter, findKaffeForId} from "../../factory";

let cross = require("../../../images/cross.png")

declare function require(name: string): any

export interface IHistorikkDag {
    dagensBrygg?: IBrygg[]
    valgtBrygg?: IBrygg
    kaffer?: IKaffe[]
    onClose?: Function
    changeBrygg?: (id: string) => void
}

const HistorikkDag : React.StatelessComponent<any> = ({dagensBrygg, valgtBrygg, kaffer, onClose, changeBrygg}) => (
    <div className="verticalContainer historikkDag">
        <button title="Snarvei: Escape" className="closeButtonButton historikkClose" onClick={ e => onClose() }/>
        <select autoFocus={true} name="brygg" value={valgtBrygg._id} className="historikkBryggSelect" onChange={(e: React.FormEvent<HTMLSelectElement>) => {
            e.preventDefault()
            changeBrygg(e.currentTarget.value)
        }}>
            {
                dagensBrygg.map( (brygg : IBrygg) => (
                    <option key={brygg._id} value={brygg._id}>{brygg.navn}</option>
                ))
            }
        </select>
        <HistorikkBrygg brygg={valgtBrygg} kaffer={kaffer} />
    </div>
)
export default HistorikkDag

interface IHistorikkKarakterComp {
    brygg: IBrygg
    kaffer: IKaffe[]
}

const HistorikkBrygg : React.StatelessComponent<IHistorikkKarakterComp> = ({brygg, kaffer}) => (
    <div className="historikkBryggContainer">
        <div className="historikkBryggData">
            <label>Kaffe: <span>{findKaffeForId(brygg.kaffeId, kaffer).navn}</span></label>
            <div className="horizontalContainer spread">
                <label>Brygger: <span>{brygg.brygger}</span></label>
                <label>Liter: <span>{brygg.liter}</span></label>
                <label>Skjeer: <span>{brygg.skjeer}</span></label>
            </div>
            <label>Snittkarakter: <span>{calculateSnittKarakter(brygg.karakterer)}</span></label>
        </div>
        {
            brygg.karakterer.map((karakter: IKarakter, index: number) => (
                <HistorikkKarakter key={index} kaffenavn={findKaffeForId(karakter.kaffeId, kaffer).navn} {...karakter} />
            ))
        }
    </div>
)

interface IHistorikkKarakter extends IKarakter {
    kaffenavn: string
}
const HistorikkKarakter : React.StatelessComponent<IHistorikkKarakter> = ({bruker, kaffenavn, kommentar, karakter}) => (
    <div className="historikkKarakter">
        <label>Kaffe: <span>{kaffenavn}</span></label>
        <label>Bruker: <span>{bruker}</span></label>
        <label>Karakter: <span>{karakter}</span></label>
        <label>Kommentar: <span>{kommentar}</span></label>
    </div>
)