import * as React from 'react';
import {IndexLink, Link} from 'react-router';


const NavBar : React.StatelessComponent<{}> = (elementer) => (
    <nav className="content">
        <IndexLink className="navElement" to="/" activeClassName="navValgt">Registrering</IndexLink>
        <Link className="navElement" to="/historikk" activeClassName="navValgt">Historikk</Link>
    </nav>
)
export default NavBar;
