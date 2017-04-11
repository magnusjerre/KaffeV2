import * as React from 'react';
import Header from './header'
import NavBar from './nav-bar'
import BryggListe from "./ContainerComponents/BryggListe";
import {createBrygg} from "../factory";
import BryggRegistrering from "./ContainerComponents/BryggRegistrering"

let pluss = require("../../images/pluss.png")
require("../../css/styles.scss")

declare function require(name: string): any

const App : React.StatelessComponent<any> = props => (
    <div>
        <Header />
        <NavBar />
        <div className="appContent">
            <img src={pluss} alt="pluss"></img>
        </div>
        <BryggListe />
        <BryggRegistrering />
        {/*<BryggListe bryggListe={[createBrygg("hh", "Hh", "22", 1, 2)]}/>*/}
    </div>
)

export default App
