import * as React from "react";
import {IAction, IBryggReg, IState} from "../../models";
import BryggRegistrering from "./BryggRegistrering";
import {connect, Dispatch} from "react-redux";
import {createToggleNyBryggAction} from "../../actions/brygg_actions";
import BryggListe from "./BryggListe";

let pluss = require("../../../images/pluss.png")

declare function require(name: string): any

export interface IRegContainer {
    toggle?: VoidFunction
    visKnapp?: boolean
}

let RegCon : React.StatelessComponent<IRegContainer> = ({visKnapp, toggle}) => (
    <div className="verticalContainer content">
        <BryggListe />
        <div className="standardMargin">
        {
            visKnapp ? <button onClick={e => { toggle() }} className="nyttBryggKnapp"/> : <BryggRegistrering />
        }
        </div>
    </div>
)

const mapStateToProps = (state: IState, props: IRegContainer) : IRegContainer => {
    return {
        visKnapp: state.nyttBrygg.visKnapp
    }
}

const mapDispatchToProps = (dispatch: Dispatch<IAction<boolean>>) : IRegContainer => {
    return {
        toggle: () => {
            dispatch(createToggleNyBryggAction())
        }
    }
}

const RegistreringContainer = connect(mapStateToProps, mapDispatchToProps)(RegCon)
export default RegistreringContainer