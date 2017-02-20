import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import BryggRegistrering from './components/brygg-registrering';
import BryggKarakterContainer from './components/brygg-karakter-container.js';

ReactDOM.render(
    <div>
        <BryggRegistrering />
        <BryggKarakterContainer />
    </div>,
    document.getElementById("react")
);