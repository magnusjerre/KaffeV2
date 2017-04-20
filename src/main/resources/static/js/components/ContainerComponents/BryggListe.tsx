import * as React from "react";
import {IBrygg, IState} from "../../models";
import {connect} from "react-redux";
import Brygg from "./KarakterRegistrering";
import KarakterResultat from "./KarakterResultat";
import KarakterLukker from "./KarakterLukker";

interface IBryggListeComp {
    bryggListe?: IBrygg[]
}

let BryggListeComp: React.StatelessComponent<IBryggListeComp> = (props) => (
    <ul className="nonListDisplay horizontalContainer">
        {
            props.bryggListe.map(
                (brygg: IBrygg) => (
                    <div className="flipContainer inlineblock" key={brygg._id}>
                        <Brygg brygg={brygg} />
                        <KarakterResultat brygg={brygg}/>
                        <KarakterLukker bryggNavn={brygg.navn} bryggId={brygg._id}/>
                    </div>
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