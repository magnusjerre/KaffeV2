import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactRouer, {Router, Route, IndexRoute, browserHistory} from 'react-router';
import App from './components/app'
import Registrering from './components/registrering'
import Header from './components/header'

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Registrering}/>
            <Route path="historikk" component={Header}/>
        </Route>
    </Router>,
    document.getElementById("react")
);