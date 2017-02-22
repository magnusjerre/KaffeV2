import React, {Component} from 'react';
import BryggRegistrering from './brygg-registrering';
import BryggKarakterContainer from './brygg-karakter-container'

export default class Registrering extends Component {
    render() {
        return (
            <div>
                <BryggRegistrering />
                <BryggKarakterContainer />
            </div>
        );
    }
}
