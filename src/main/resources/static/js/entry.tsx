import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory} from 'react-router';
import App from './components/app'
import { createStore } from "redux"
import combinedReducers from "./reducers/combined-reducers";
import {Provider} from "react-redux";
import thunk from "redux-thunk"
import {applyMiddleware} from "redux";
import {fetchKafferAction} from "./actions/kaffe_actions";
import {createFetchBryggAction} from "./actions/brygg_actions";
import Header from "./components/header";
import CalendarItem from "./components/CalendarItem";
import {createFetchBryggForMonthAction} from "./actions/kalender_actions";
import RegistreringContainer from "./components/ContainerComponents/RegistreringContainer";
import Historikk from "./components/ContainerComponents/Historikk"
import KaffeRegistrering from "./components/ContainerComponents/KaffeRegistrering";

// Vil helst bruke følgende, men dette gir en irriterende editor-feilmelding, den kompilerer riktignok..
// import { composeWithDevTools } from "redux-devtools-extension"
let { composeWithDevTools } = require("redux-devtools-extension")
declare function require(name: string): any

let store = createStore(combinedReducers, composeWithDevTools(applyMiddleware(thunk)))
store.dispatch(fetchKafferAction())
store.dispatch(createFetchBryggAction())
store.dispatch(createFetchBryggForMonthAction(new Date().getFullYear(), new Date().getMonth()))

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={RegistreringContainer} />
                <Route path="historikk" component={Historikk} />
                <Route path="kafferegistrering" component={KaffeRegistrering} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById("react")
);