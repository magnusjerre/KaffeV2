import * as React from "react";
import {IBrygg, IKaffe, IState, IKarakter} from "../../models";
import KaffeSelect from "../KaffeSelect";
import {connect, Dispatch} from "react-redux";
import {createRegistrerChangeAction, createRegistrerKarakterAction} from "../../actions/karakter_actions";

export interface IKarakterReg {
    brygg: IBrygg
    visKarakterRegistrering?: boolean
    muligeKaffer?: IKaffe[]
}

interface IChangeMethods {
    onSubmitKarakter?: (bryggId: string, karakter: IKarakter) => void
    onChangeProperty?: (property: string, value: any) => void
}

interface IEnkeltRegistrering extends IKarakterReg , IChangeMethods {}

const KarakterEnkeltRegisteringComp : React.StatelessComponent<IEnkeltRegistrering> = ({brygg, visKarakterRegistrering, muligeKaffer, onSubmitKarakter, onChangeProperty}) => {
    let visibilityClass = visKarakterRegistrering ? "flipped" : "notFlipped"
    let relevantClasses = "holder " + visibilityClass
    return (
        <form className={relevantClasses} onSubmit={ (e :  React.FormEvent<HTMLFormElement>) => {e.preventDefault(); e.stopPropagation(); onSubmitKarakter(brygg._id, brygg.nyKarakter)}}>
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
        visKarakterRegistrering: props.brygg.visGjetteResultat,
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
        }
    }
}
const KarakterRegistrering = connect(mapStateToProps, mapDispatchToProps)(KarakterEnkeltRegisteringComp)
export default KarakterRegistrering