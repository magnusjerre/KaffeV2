import * as React from 'react';
import Header from './header'
import NavBar from './nav-bar'
import BryggListe from "./ContainerComponents/BryggListe";
import {createBrygg} from "../factory";
import BryggRegistrering from "./ContainerComponents/BryggRegistrering"
import RegistreringContainer from "./ContainerComponents/RegistreringContainer";
import Calendar from "./Calendar";

let pluss = require("../../images/pluss.png")
require("../../css/styles.scss")

declare function require(name: string): any

const App : React.StatelessComponent<any> = props => (
    <div>
        <Header />
        <NavBar />
        <div className="content">
        {
            props.children
        }
        </div>
    </div>
)

export default App
