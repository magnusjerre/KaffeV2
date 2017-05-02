import * as React from 'react';
import Header from './header'
import NavBar from './nav-bar'
import BryggListe from "./ContainerComponents/BryggListe";
import {createBrygg} from "../factory";
import BryggRegistrering from "./ContainerComponents/BryggRegistrering"
import RegistreringContainer from "./ContainerComponents/RegistreringContainer";
import Calendar from "./Calendar";
import {KeyCode} from "../KeyCode";
import {connect, Dispatch} from "react-redux";
import {createClearSelectedDayAction} from "../actions/kalender_actions";
import {addKeyUpListener} from "../KeyboardInterceptor";

let pluss = require("../../images/pluss.png")
require("../../css/styles.scss")

declare function require(name: string): any

interface IApp {
    onClose?: VoidFunction
}

const AppComp : React.StatelessComponent<IApp> = ({onClose, children}) => {
    addKeyUpListener(KeyCode.ESCAPE, onClose, false)

    return (
    <div>
        <Header />
        <NavBar />
        <div className="content">
        {
            children
        }
        </div>
    </div>
)}

const mapDispatchToProps = (dispatch: Dispatch<any>) : IApp => {
    return {
        onClose: () => {
            dispatch(createClearSelectedDayAction())
        }
    }
}

const App = connect(null, mapDispatchToProps)(AppComp)
export default App
