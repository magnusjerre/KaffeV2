import React, {Component} from 'react';
import ReactRouter, {IndexLink, Link} from 'react-router';

export default function NavBar() {
    return (
        <nav>
            <li><IndexLink className="navElement" to="/" activeClassName="navValgt">Registrering</IndexLink></li>
            <li><Link className="navElement" to="/historikk" activeClassName="navValgt">Historikk</Link></li>
        </nav>
    );
}
