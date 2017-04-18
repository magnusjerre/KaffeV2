import * as React from "react";
import {
    addBryggAction, newBryggBryggerAction, newBryggKaffeId, newBryggLiter,
    newBryggNavnAction, newBryggSkjeer
} from "../../actions/actions";
import {connect, Dispatch} from "react-redux";
import {IBryggRegistrering, IDispatchable, IKaffe, IState} from "../../models";
import KaffeSelect from "../KaffeSelect";

interface IBryggRegistreringComp {
    onSubmitBrygg?: (nyttBrygg: IBryggRegistrering) => VoidFunction
    onChangeBryggNavn?: (newValue: string) => VoidFunction
    onChangeBrygger?: (newValue: string) => VoidFunction
    onChangeKaffeId?: (newValue: string) => VoidFunction
    onChangeLiter?: (newValue: number) => VoidFunction
    onChangeSkjeer?: (newValue: number) => VoidFunction
    nyttBrygg?: IBryggRegistrering
    muligeKaffer?: IKaffe[]
}

let BryggRegistreringComp : React.StatelessComponent<IBryggRegistreringComp> = ({onSubmitBrygg, onChangeBryggNavn, onChangeBrygger, onChangeKaffeId, onChangeLiter, onChangeSkjeer, nyttBrygg, muligeKaffer}) => {
    return (
        <form className="holder" onSubmit={ (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); e.stopPropagation(); onSubmitBrygg(nyttBrygg) }}>
            <div className="formInputContent">
                <label htmlFor="navn">Bryggnavn
                    <input name="navn" type="text" onChange={ (e: React.FormEvent<HTMLInputElement>) => { e.preventDefault(); onChangeBryggNavn(e.currentTarget.value) }} value={nyttBrygg.navn} placeholder="Gang of four"/>
                </label>
                <label htmlFor="brygger">Brygger
                    <input name="brygger" type="text" onChange={ (e: React.FormEvent<HTMLInputElement>) => { e.preventDefault(); onChangeBrygger(e.currentTarget.value) }} value={nyttBrygg.brygger} placeholder="Jerre"/>
                </label>
                <label htmlFor="kaffeSelector">Kaffe
                    <KaffeSelect id="kaffeSelector" kaffeId={nyttBrygg.kaffeId} name="kaffeSelector" muligeKaffer={muligeKaffer} onChangeKaffe={onChangeKaffeId} />
                </label>
                <label htmlFor="liter">Liter
                    <input name="liter" type="number" min="0.1" step="0.1" value={nyttBrygg.liter} onChange={ (e: React.FormEvent<HTMLInputElement>) => { e.preventDefault(); onChangeLiter(parseFloat(e.currentTarget.value))}} placeholder="1.0"/>
                </label>
                <label htmlFor="skjeer">Skjeer
                    <input name="skjeer" type="number" min="0.25" step="0.25" value={nyttBrygg.skjeer} onChange={ (e: React.FormEvent<HTMLInputElement>) => { e.preventDefault(); onChangeSkjeer(parseFloat(e.currentTarget.value))}} placeholder="5.5"/>
                </label>
            </div>
            <input type="submit" value="Registrer brygg"/>
        </form>
    )
}

const mapStateToProps = (state: IState, props: IBryggRegistreringComp) : IBryggRegistreringComp => {
    return {
        nyttBrygg: state.nyttBrygg,
        muligeKaffer: state.kaffer.muligeKaffer
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: IBryggRegistreringComp) => {
    return {
        onSubmitBrygg: (nyttBrygg: IBryggRegistrering) => {
            dispatch(addBryggAction(nyttBrygg))
        },
        onChangeBryggNavn: (newValue: string) => {
            dispatch(newBryggNavnAction(newValue))
        },
        onChangeBrygger: (newValue: string) => {
            dispatch(newBryggBryggerAction(newValue))
        },
        onChangeKaffeId: (newValue: string) => {
            dispatch(newBryggKaffeId(newValue))
        },
        onChangeLiter: (newValue: number) => {
            dispatch(newBryggLiter(newValue))
        },
        onChangeSkjeer: (newValue: number) => {
            dispatch(newBryggSkjeer(newValue))
        }
    }
}

const BryggRegistrering = connect(mapStateToProps, mapDispatchToProps)(BryggRegistreringComp)
export default BryggRegistrering