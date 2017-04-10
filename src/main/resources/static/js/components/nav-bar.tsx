import * as React from 'react';
import {IndexLink, Link} from 'react-router';


const NavBar : React.StatelessComponent<{}> = (elementer) => (
    <nav>
        <li><IndexLink className="navElement" to="/" activeClassName="navValgt">Registrering</IndexLink></li>
        <li><Link className="navElement" to="/historikk" activeClassName="navValgt">Historikk</Link></li>
    </nav>
)
export default NavBar;
