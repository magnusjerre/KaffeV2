import * as React from "react";
import {IBrygg, IKaffe, IState, IKarakter, RegistreringVisning} from "../../models";
import KaffeSelect from "../KaffeSelect";
import {connect, Dispatch} from "react-redux";
import {
    createChangeVisningAction, createRegistrerChangeAction,
    createRegistrerKarakterAction
} from "../../actions/karakter_actions";
import {createLukkBryggAction} from "../../actions/brygg_actions";
let cross = require("../../../images/cross.png")

declare function require(name: string): any

export interface IKarakterReg {
    brygg: IBrygg
    muligeKaffer?: IKaffe[]
}

interface IChangeMethods {
    onSubmitKarakter?: (bryggId: string, karakter: IKarakter) => void
    onChangeProperty?: (property: string, value: any) => void
    lukkBrygg?: VoidFunction
}

interface IEnkeltRegistrering extends IKarakterReg , IChangeMethods {}

const KarakterEnkeltRegisteringComp : React.StatelessComponent<IEnkeltRegistrering> = ({brygg, muligeKaffer, onSubmitKarakter, onChangeProperty, lukkBrygg}) => {
    let visibilityClass = brygg.visning !== RegistreringVisning.REGISTRERING ? "flipped" : "notFlipped"
    let relevantClasses = "holder " + visibilityClass
    return (
        <form className={relevantClasses} onSubmit={ (e :  React.FormEvent<HTMLFormElement>) => {e.preventDefault(); e.stopPropagation(); onSubmitKarakter(brygg._id, brygg.nyKarakter)}}>
            <img src={cross} alt="Lukk" className="closeButton" onClick={e => { lukkBrygg() }}/>
            <h1>{brygg.navn}</h1>
            <div className="formInputContent">
                <label htmlFor="kaffeId">Kaffe
                    <KaffeSelect value={brygg.nyKarakter.kaffeId} name="kaffeId" muligeKaffer={muligeKaffer} onChangeKaffe={onChangeProperty} />
                </label>
                <label htmlFor="bruker">Bruker
                    <input name="bruker" type="text" onChange={ (e: React.FormEvent<HTMLInputElement>) => { e.preventDefault(); onChangeProperty("bruker", e.currentTarget.value) }} value={brygg.nyKarakter.bruker} placeholder="Jerre"/>
                </label>
                <label htmlFor="karakter">Karakter
                    <input name="karakter" type="number" min="1" step="1" max="5" value={brygg.nyKarakter.karakter} onChange={ (e: React.FormEvent<HTMLInputElement>) => { e.preventDefault(); onChangeProperty("karakter", parseInt(e.currentTarget.value))}} placeholder="1"/>
                </label>
                <label htmlFor="kommentar">Kommentar
                    <input name="brygger" type="text" onChange={ (e: React.FormEvent<HTMLInputElement>) => { e.preventDefault(); onChangeProperty("kommentar", e.currentTarget.value) }} value={brygg.nyKarakter.kommentar} placeholder="Denne smakte godt ja..."/>
                </label>
            </div>
            <input type="submit" value="Registrer karakter"/>
        </form>
    )
}

const mapStateToProps = (state: IState, props: IEnkeltRegistrering) : IKarakterReg => {
    return {
        brygg: props.brygg,
        muligeKaffer: state.kaffer.muligeKaffer
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, props: IKarakterReg) : IChangeMethods => {
    return {
        onSubmitKarakter: (bryggId: string, karakter: IKarakter) => {
            dispatch(createRegistrerKarakterAction(bryggId, karakter));
        },
        onChangeProperty: (property: string, value: any) => {
            dispatch(createRegistrerChangeAction(props.brygg._id, property, value))
        },
        lukkBrygg: () => {
            dispatch(createChangeVisningAction(props.brygg._id, RegistreringVisning.LUKK))
        }
    }
}
const KarakterRegistrering = connect(mapStateToProps, mapDispatchToProps)(KarakterEnkeltRegisteringComp)
export default KarakterRegistrering