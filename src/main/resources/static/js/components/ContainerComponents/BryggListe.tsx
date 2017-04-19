import * as React from "react"
import {IBrygg, IState} from "../../models";
import {connect} from "react-redux";
import Brygg from "../KarakterRegistrering";

interface IBryggListeComp {
    bryggListe?: IBrygg[]
}

let BryggListeComp: React.StatelessComponent<IBryggListeComp> = (props) => (
    <ul>
        {
            props.bryggListe.map(
                (brygg: IBrygg) => (
                    <Brygg key={brygg._id} brygg={brygg} />
                )
            )
        }
    </ul>
)

const mapStateToProps = (state: IState, props: IBryggListeComp) : IBryggListeComp => {
    return {
        bryggListe: state.bryggListe
    }
}

const BryggListe = connect(mapStateToProps)(BryggListeComp)
export default BryggListe