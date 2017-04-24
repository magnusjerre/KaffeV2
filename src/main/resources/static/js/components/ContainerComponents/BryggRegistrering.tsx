import * as React from "react";
import {addBryggAction, createBryggPropertyChangeAction} from "../../actions/brygg_actions";
import {connect, Dispatch} from "react-redux";
import {IBryggRegistrering, IKaffe, IState} from "../../models";
import KaffeSelect from "../KaffeSelect";

interface IBryggRegistreringComp {
    onSubmitBrygg?: (nyttBrygg: IBryggRegistrering) => void
    onChangeProperty?: (property: string, newValue: number | string) => void
    nyttBrygg?: IBryggRegistrering
    muligeKaffer?: IKaffe[]
}

let BryggRegistreringComp : React.StatelessComponent<IBryggRegistreringComp> = ({onSubmitBrygg, onChangeProperty, nyttBrygg, muligeKaffer}) => {
    return (
        <form className="holder bryggRegistrering" onSubmit={ (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); e.stopPropagation(); onSubmitBrygg(nyttBrygg) }}>
            <div className="formInputContent">
                <label htmlFor="navn">Bryggnavn
                    <input name="navn" type="text" onChange={ (e: React.FormEvent<HTMLInputElement>) => { e.preventDefault(); onChangeProperty("navn", e.currentTarget.value) }} value={nyttBrygg.navn} placeholder="Gang of four"/>
                </label>
                <label htmlFor="brygger">Brygger
                    <input name="brygger" type="text" onChange={ (e: React.FormEvent<HTMLInputElement>) => { e.preventDefault(); onChangeProperty("brygger", e.currentTarget.value) }} value={nyttBrygg.brygger} placeholder="Jerre"/>
                </label>
                <label htmlFor="kaffeId">Kaffe
                    <KaffeSelect value={nyttBrygg.kaffeId} name="kaffeId" muligeKaffer={muligeKaffer} onChangeKaffe={onChangeProperty} />
                </label>
                <label htmlFor="liter">Liter
                    <input name="liter" type="number" min="0.1" step="0.1" value={nyttBrygg.liter} onChange={ (e: React.FormEvent<HTMLInputElement>) => { e.preventDefault(); onChangeProperty("liter", parseFloat(e.currentTarget.value))}} placeholder="1.0"/>
                </label>
                <label htmlFor="skjeer">Skjeer
                    <input name="skjeer" type="number" min="0.25" step="0.25" value={nyttBrygg.skjeer} onChange={ (e: React.FormEvent<HTMLInputElement>) => { e.preventDefault(); onChangeProperty("skjeer", parseFloat(e.currentTarget.value))}} placeholder="5.5"/>
                </label>
            </div>
            <input type="submit" value="Registrer brygg"/>
        </form>
    )
}

const mapStateToProps = (state: IState, props: IBryggRegistreringComp) : IBryggRegistreringComp => {
    return {
        nyttBrygg: state.nyttBrygg.brygg,
        muligeKaffer: state.kaffer.muligeKaffer
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: IBryggRegistreringComp) : IBryggRegistreringComp => {
    return {
        onSubmitBrygg: (nyttBrygg: IBryggRegistrering) => {
            dispatch(addBryggAction(nyttBrygg))
        },
        onChangeProperty: (property: string, newValue: string | number) => {
          dispatch(createBryggPropertyChangeAction(property, newValue))
        }
    }
}

const BryggRegistrering = connect(mapStateToProps, mapDispatchToProps)(BryggRegistreringComp)
export default BryggRegistrering