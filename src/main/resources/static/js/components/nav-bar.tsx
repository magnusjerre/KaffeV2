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
    return (
        <nav className="content">
            <IndexLink className="navElement" to="/" activeClassName="navValgt">Registrering</IndexLink>
            <Link className="navElement" to="/historikk" activeClassName="navValgt">Historikk</Link>
            <Link className="navElement" to="/kafferegistrering" activeClassName="navValgt">Kaffe registrering</Link>
        </nav>
    )}
export default NavBar;
