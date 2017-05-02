import * as React from "react";
import {browserHistory, IndexLink, Link} from "react-router";
import {addKeyUpListener} from "../KeyboardInterceptor";
import {KeyCode} from "../KeyCode";


const NavBar : React.StatelessComponent<{}> = () => {
    addKeyUpListener(KeyCode.R, () => {
        browserHistory.push("")
    })
    addKeyUpListener(KeyCode.H, () => {
        browserHistory.push("historikk")
    })
    addKeyUpListener(KeyCode.K, () => {
        browserHistory.push("kafferegistrering")
    })
    addKeyUpListener(KeyCode.L, () =>{
        browserHistory.push("kaffeliste")
    })
    addKeyUpListener(KeyCode.S, () => {
        browserHistory.push("statistikk")
    })
    addKeyUpListener(KeyCode.O, () => {
        browserHistory.push("om")
    })
    return (
        <nav className="content">
            <IndexLink className="navElement" to="/" activeClassName="navValgt" title="Snarvei: Alt + R">Registrering</IndexLink>
            <Link className="navElement" to="/historikk" activeClassName="navValgt" title="Snarvei: Alt + H">Historikk</Link>
            <Link className="navElement" to="/kafferegistrering" activeClassName="navValgt" title="Snarvei: Alt + K">Kaffe registrering</Link>
            <Link className="navElement" to="/kaffeliste" activeClassName="navValgt" title="Snarvei: Alt + L">Kaffeliste</Link>
            <Link className="navElement" to="/statistikk" activeClassName="navValgt" title="Snarvei: Alt + S">Statistikk</Link>
            <Link className="navElement" to="/om" activeClassName="navValgt" title="Snarvei: Alt + O">Om</Link>
        </nav>
    )}
export default NavBar;
