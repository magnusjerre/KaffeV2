import * as React from "react"
import {IBrygg, IKaffe, IKarakter, IState} from "../models";
import KaffeSelect from "./KaffeSelect";
import {connect, Dispatch} from "react-redux";
import {
    createClearKarakterRegistreringAction, createRegistrerChangeAction,
    createRegistrerKarakterAction
} from "../actions/karakter_actions";

export interface IKarakterReg {
    brygg: IBrygg
    muligeKaffer?: IKaffe[]
}

interface IChangeMethods {
    onSubmitKarakter?: (reg: IKarakterReg) => void
    onChangeKaffeId?: (val: string) => void
    onChangeBruker?: (val: string) => void
    onChangeKarakter?: (val: number) => void
    onChangeKommentar?: (val: string) => void
}

interface IEnkeltRegistrering extends IKarakterReg , IChangeMethods {}

const KarakterEnkeltRegisteringComp : React.StatelessComponent<IEnkeltRegistrering> = (props) => (
    <form className="holder" onSubmit={ (e :  React.FormEvent<HTMLFormElement>) => {e.preventDefault(); e.stopPropagation(); props.onSubmitKarakter(props)}}>
        <h1>{props.brygg.navn}</h1>
        <div className="formInputContent">
            <label htmlFor="kaffeSelector">Kaffe
                <KaffeSelect id="kaffeSelector" kaffeId={props.brygg.nyKarakter.kaffeId} name="kaffeSelector" muligeKaffer={props.muligeKaffer} onChangeKaffe={props.onChangeKaffeId} />
            </label>
            <label htmlFor="bruker">Bruker
                <input name="bruker" type="text" onChange={ (e: React.FormEvent<HTMLInputElement>) => { e.preventDefault(); props.onChangeBruker(e.currentTarget.value) }} value={props.brygg.nyKarakter.bruker} placeholder="Jerre"/>
            </label>
            <label htmlFor="karakter">Karakter
                <input name="karakter" type="number" min="1" step="1" max="5" value={props.brygg.nyKarakter.karakter} onChange={ (e: React.FormEvent<HTMLInputElement>) => { e.preventDefault(); props.onChangeKarakter(parseInt(e.currentTarget.value))}} placeholder="1"/>
            </label>
            <label htmlFor="kommentar">Kommentar
                <input name="brygger" type="text" onChange={ (e: React.FormEvent<HTMLInputElement>) => { e.preventDefault(); props.onChangeKommentar(e.currentTarget.value) }} value={props.brygg.nyKarakter.kommentar} placeholder="Denne smakte godt ja..."/>
            </label>
        </div>
        <input type="submit" value="Registrer karakter"/>
    </form>
)

const mapStateToProps = (state: IState, props: IEnkeltRegistrering) : IKarakterReg => {
    return {
        brygg: props.brygg,
        muligeKaffer: state.kaffer.muligeKaffer
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, props: IKarakterReg) : IChangeMethods => {
    return {
        onSubmitKarakter: (karakterRegistrering: IKarakterReg) => {
            dispatch(createRegistrerKarakterAction(karakterRegistrering.brygg._id, karakterRegistrering.brygg.nyKarakter));
        },
        onChangeKaffeId: (nyId: string) => {
            dispatch(createRegistrerChangeAction(props.brygg._id, "kaffeId", nyId))
        },
        onChangeBruker: (val: string) => {
            dispatch(createRegistrerChangeAction(props.brygg._id, "bruker", val))
        },
        onChangeKarakter: (val: number) => {
            dispatch(createRegistrerChangeAction(props.brygg._id, "karakter", val))
        },
        onChangeKommentar: (val: string) => {
            dispatch(createRegistrerChangeAction(props.brygg._id, "kommentar", val))
        }
    }
}
const KarakterRegistrering = connect(mapStateToProps, mapDispatchToProps)(KarakterEnkeltRegisteringComp)
export default KarakterRegistrering