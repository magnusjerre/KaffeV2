import * as React from "react"
import {IKaffe, IState, Malthet} from "../../models"
import SubmitScalable from "../SubmitScalable";
import {Dispatch, connect} from "react-redux";
import {
    createChangeKaffeRegistreringPropertyAction, createClearRegistreringAction,
    createRegistrerKaffeAction
} from "../../actions/kaffe_actions";

interface IKaffeRegistreringComp {
    nyKaffe: IKaffe
    submitKaffe?: (kaffe: IKaffe, flippable: HTMLElement, focusElement: HTMLInputElement) => void
    onChangeProperty?: (prop: string, val: any) => void
}

const KaffeRegistreringComp : React.StatelessComponent<IKaffeRegistreringComp> = ({nyKaffe, submitKaffe, onChangeProperty}) => {
    let focusElement : HTMLInputElement = null;
    let flippable : HTMLElement = null;
    return (
    <div className="verticalContainer">
        <div className="flipContainer">
            <form className="holder flipper" onSubmit={ (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); e.stopPropagation(); submitKaffe(nyKaffe, flippable, focusElement)}} ref={ (elem: HTMLElement) => { flippable = elem}}>
                <h1>Ny kaffe</h1>
                <div className="formInputContent">
                    <label htmlFor="navn">Kaffenavn
                        <input required={true} autoFocus={true} name="navn" type="text" onChange={ (e: React.FormEvent<HTMLInputElement>) => { e.preventDefault(); onChangeProperty("navn", e.currentTarget.value) }}
                               value={nyKaffe.navn} placeholder="Frokostkaffe" ref={ (e: HTMLInputElement) => {focusElement = e}}/>
                    </label>
                    <label htmlFor="produsent">Produsent
                        <input required={true} name="produsent" type="text" onChange={ (e: React.FormEvent<HTMLInputElement>) => { e.preventDefault(); onChangeProperty("produsent", e.currentTarget.value) }} value={nyKaffe.produsent} placeholder="Friele"/>
                    </label>
                    <label htmlFor="land">Land
                        <input required={true} name="land" type="string" value={nyKaffe.land} onChange={ (e: React.FormEvent<HTMLInputElement>) => { e.preventDefault(); onChangeProperty("land", e.currentTarget.value) }} placeholder="Brasil"/>
                    </label>
                </div>
                <SubmitScalable value="Registrer kaffe"/>
            </form>
        </div>
    </div>
)}

const mapStateToProps = (state: IState, props: IKaffeRegistreringComp) : IKaffeRegistreringComp => {
    return {
        nyKaffe: state.kaffeRegistrering
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        submitKaffe: (kaffe: IKaffe, flippable: HTMLElement, focusElement: HTMLInputElement) => {
            let initClassName = flippable.className
            flippable.className = initClassName + " flip90Deg"
            focusElement.focus()
            dispatch(createRegistrerKaffeAction(kaffe))

            setTimeout(() => {
                dispatch(createClearRegistreringAction())
                flippable.className = initClassName
            }, 500) //Se $long variabelen i styles.scss for tilsvarende verdi
        },
        onChangeProperty: (prop: string, val: string) => {
            dispatch(createChangeKaffeRegistreringPropertyAction(prop, val))
        }
    }
}

const KaffeRegistrering = connect(mapStateToProps, mapDispatchToProps)(KaffeRegistreringComp)
export default KaffeRegistrering