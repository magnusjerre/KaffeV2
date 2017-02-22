import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import BryggRegistrering from './components/brygg-registrering';
import BryggKarakterContainer from './components/brygg-karakter-container.js';
import Header from './components/header'

ReactDOM.render(
    <div>
        <Header />
        <BryggRegistrering />
        <BryggKarakterContainer />
    </div>,
    document.getElementById("react")
);