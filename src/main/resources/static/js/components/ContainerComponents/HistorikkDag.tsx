import * as React from "react"
import {IBrygg, IKaffe, IKarakter, IState} from "../../models";
import {calculateSnittKarakter, findBryggWithIDs, findKaffeForId} from "../../factory";
import {connect, Dispatch} from "react-redux";
import {createClearSelectedDayAction} from "../../actions/kalender_actions";

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
        <img src={cross} alt="Lukk dags-historikk" className="close" onClick={ e => onClose()}/>
        <div className="horizontalContainer">
            {
                dagensBrygg.map((brygg: IBrygg) => {
                    let classes = brygg._id == valgtBrygg._id ? "bryggNavn bryggNavnValgt" : "bryggNavn"
                    return (
                        <span key={brygg._id} className={classes} onClick={e => changeBrygg(brygg._id)}>{brygg.navn}</span>
                    )}
                )
            }
        </div>
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
            <h1>{brygg.navn}</h1>
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