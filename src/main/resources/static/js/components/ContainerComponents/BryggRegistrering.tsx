import * as React from "react";
import {
    addBryggAction, newBryggBryggerAction, newBryggKaffeId, newBryggLiter,
    newBryggNavnAction, newBryggSkjeer
} from "../../actions/actions";
import {connect, Dispatch} from "react-redux";
import {IBryggRegistrering, IDispatchable, IKaffe, IState} from "../../models";
import KaffeSelect from "../KaffeSelect";

interface IBryggRegistreringComp {
    onChangeBryggNavn?: (newValue: string) => VoidFunction
    onChangeBrygger?: (newValue: string) => VoidFunction
    onChangeKaffeId?: (newValue: string) => VoidFunction
    onChangeLiter?: (newValue: number) => VoidFunction
    onChangeSkjeer?: (newValue: number) => VoidFunction
    nyttBrygg?: IBryggRegistrering
    muligeKaffer?: IKaffe[]
}

let BryggRegistreringComp : React.StatelessComponent<IBryggRegistreringComp> = ({onChangeBryggNavn, onChangeBrygger, onChangeKaffeId, onChangeLiter, onChangeSkjeer, nyttBrygg, muligeKaffer}) => {
    return (
        <form>
            <input name="navn" type="text" onChange={ (e: React.FormEvent<HTMLInputElement>) => { e.preventDefault(); onChangeBryggNavn(e.currentTarget.value) }} value={nyttBrygg.navn} placeholder="Gang of four"/>
            <input name="brygger" type="text" onChange={ (e: React.FormEvent<HTMLInputElement>) => { e.preventDefault(); onChangeBrygger(e.currentTarget.value) }} value={nyttBrygg.brygger} placeholder="Jerre"/>
            <KaffeSelect id="kaffeSelector" kaffeId={nyttBrygg.kaffeId} name="kaffeSelector" muligeKaffer={muligeKaffer} onChangeKaffe={onChangeKaffeId} />
            {/*<select name="kaffeId" type="select" onChange={ (e: React.FormEvent<HTMLSelectElement>) => { e.preventDefault(); onChangeKaffeId(e.currentTarget.value)}} value={nyttBrygg.kaffeId}>*/}
                {/*<option value="def" disabled={true}>Eksempel</option>*/}
                {/*<option value="cake">Cake</option>*/}
                {/*<option value="fake">Fake</option>*/}
            {/*</select>*/}
            <input name="liter" type="number" min="0.1" step="0.1" value={nyttBrygg.liter} onChange={ (e: React.FormEvent<HTMLInputElement>) => { e.preventDefault(); onChangeLiter(parseFloat(e.currentTarget.value))}} placeholder="1.0"/>
            <input name="skjeer" type="number" min="0.25" step="0.25" value={nyttBrygg.skjeer} onChange={ (e: React.FormEvent<HTMLInputElement>) => { e.preventDefault(); onChangeSkjeer(parseFloat(e.currentTarget.value))}} placeholder="5.5"/>
            <input name="kaffeid" type="text" onChange={ (e: React.FormEvent<HTMLInputElement>) => { e.preventDefault(); onChangeKaffeId(e.currentTarget.value) }} value={nyttBrygg.kaffeId} />
        </form>
    )
}

const mapStateToProps = (state: IState, props: IBryggRegistreringComp) : IBryggRegistreringComp => {
    return {
        nyttBrygg: state.nyttBrygg,
        muligeKaffer: [{
            _id: "123", navn: "heio"
        }, {
            _id: "321", navn: "oieh"
        }]
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: IBryggRegistreringComp) => {
    return {
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