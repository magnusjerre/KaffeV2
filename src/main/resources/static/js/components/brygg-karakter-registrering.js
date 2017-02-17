import React, {Component} from 'react'
import KaffeSelector from './kaffe-selector'
import TextInput from './text-input'

export default class BryggKarakterRegistrering extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kaffer: [
                { id: 1, navn: 'Frokostkaffe', produsent: 'Friele'}, 
                { id: 2, navn: 'Tinganga', produsent: 'Friele'}
            ],
            kaffeSelector: '',
        }
        this._handleKafferChange.bind(this);
    }
    
    render() {
        return (
            <div className="bryggRegistreringContainer">
                <KaffeSelector label="Kaffe: " kaffer={this.state.kaffer} onChange={event => this._handleKafferChange(event)} />
                <br/>
                <TextInput label="Bruker: " name="bruker" required="required" placeholder="Jerre" onChange={event => this._handleKafferChange(event)} />
                <br/>
                <TextInput label="Kommentar: " name="kommentar" placeholder="Denne var rar..." onChange={event => this._handleKafferChange(event)} />
            </div>
        );
    }
    
    _handleKafferChange(event) {
        let nyVerdi = {};
        nyVerdi[event.target.name] = event.target.value;
        this.setState(nyVerdi);
        console.log(event.target.name + ": " + nyVerdi[event.target.name]);
    }
}