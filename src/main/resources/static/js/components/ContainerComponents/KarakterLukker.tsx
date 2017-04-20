import * as React from "react"
import {IState, RegistreringVisning} from "../../models";
import {findBryggById} from "../../factory";
import {connect, Dispatch} from "react-redux";
import {createChangeVisningAction} from "../../actions/karakter_actions";
import {createLukkBryggAction} from "../../actions/brygg_actions";
import MessageBox from "../MessageBox";

interface IKarakterLukker extends IPrivateProps {
    bryggId: string
    bryggNavn: string
}

interface IPrivateProps {
    visning?: RegistreringVisning
    classes?: string
    message?: string

    cancel?: (id: string) => void
    accept?: (id: string) => void
}

const KarakterLukkerComp : React.StatelessComponent<IKarakterLukker> = ({cancel, accept, visning, bryggId, bryggNavn, classes, message}) => (
    <MessageBox cancel={cancel} accept={accept} classes={classes} bryggId={bryggId} message={message} title={bryggNavn} />
)

const mapStateToProps = (state: IState, props: IKarakterLukker) : IPrivateProps => {
    let brygg = findBryggById(props.bryggId, state.bryggListe)
    return {
        visning: brygg.visning,
        classes: "messageBox flippable " + (brygg.visning === RegistreringVisning.LUKK ? "notFlipped" : "flipped"),
        message: `Er du sikker på at du vil lukke dette brygget? Det vil i så fall ikke lenger være mulig å registrere flere karakterer`
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) : IPrivateProps => {
    return {
        cancel: (id: string) => {
            dispatch(createChangeVisningAction(id, RegistreringVisning.REGISTRERING))
        },
        accept: (id: string) => {
            dispatch(createLukkBryggAction(id))
        }
    }
}

const KarakterLukker = connect(mapStateToProps, mapDispatchToProps)(KarakterLukkerComp)
export default KarakterLukker