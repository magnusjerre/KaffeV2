import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory} from 'react-router';
import App from './components/app'
import { createStore } from "redux"
import combinedReducers from "./reducers/combined-reducers";
import {Provider} from "react-redux";

let store = createStore(combinedReducers)

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                {/*<IndexRoute component={Registrering}/>*/}
                {/*<Route path="historikk" component={Header}/>*/}
            </Route>
        </Router>
    </Provider>,
    document.getElementById("react")
);