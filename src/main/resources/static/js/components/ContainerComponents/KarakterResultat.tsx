import * as React from "react"
import {IBrygg, IKaffe, IState} from "../../models";
import DismissableMessage from "../DismissableMessage";
import {connect, Dispatch} from "react-redux";
import {createChangeKarakterResultVisibilityAction} from "../../actions/karakter_actions";


interface IMethods {
    dismiss?: (id: string) => void
    message?: string
    classes?: string
}

interface IProps extends IMethods {
    brygg: IBrygg
}

const KarakterRes : React.StatelessComponent<IProps> = ({brygg, dismiss, classes, message}) => {return (
    <DismissableMessage title={brygg.navn} message={message} classes={classes} dismiss={dismiss} bryggId={brygg._id} />
)}

const mapStateToProps = (state: IState, ownProps: IProps) : IMethods => {
    return {
        classes: "messageBox flippable " + (ownProps.brygg.visGjetteResultat ? "notFlipped" : "flipped"),
        message: getMessage(ownProps.brygg, state.kaffer.muligeKaffer),
    }
}

function getMessage(brygg: IBrygg, kaffer: IKaffe[]) {
    if (!brygg.gjetteResultat || brygg.gjetteResultat.kaffeId === "") {
        return "Ingen gjetting enda"
    }

    let korrektKaffe = getKaffeById(brygg.kaffeId, kaffer)
    let delmelding = `Dagens kaffe var "${korrektKaffe.navn}" av ${korrektKaffe.produsent}`
    if (brygg.kaffeId === brygg.gjetteResultat.kaffeId) {
        return `Korrekt! ${delmelding}`
    }
    return `Feil... ${delmelding}`
}

function getKaffeById(id: string, kaffer: IKaffe[]) {
    for (let i = 0; i < kaffer.length; i++) {
        let kaffe = kaffer[i]
        if (kaffe._id === id) {
            return kaffe
        }
    }
    return null
}


const mapDispatchToProps = (dispatch: Dispatch<any>) : IMethods => {
    return {
        dismiss: (id: string) => {
            dispatch(createChangeKarakterResultVisibilityAction(id, false))
        }
    }
}

const KarakterResultat = connect(mapStateToProps, mapDispatchToProps)(KarakterRes)
export default KarakterResultat