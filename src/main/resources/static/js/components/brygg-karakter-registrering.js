import React, {Component} from 'react'
import KaffeSelector from './kaffe-selector'
import TextInput from './text-input'
import KarakterLabel from './karakter-label'
import $ from '../jquery-3.1.1.min.js';
require('../../css/styles.css');

export default class BryggKarakterRegistrering extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kaffeId: '',
            bruker: '',
            kommentar: '',
            karakter: 0
        };
        this._handleKafferChange.bind(this);
        this._handleSubmit.bind(this);
    }
    
    render() {
        return (
            <form className="flexboxColumn registreringBox boxListElemet" onSubmit={event => this._handleSubmit(event)}>
                <h1 className="bryggNavnHeader">{this.props.bryggnavn}</h1>
                <KaffeSelector label="Kaffe: " name="kaffeId" kaffer={this.props.muligeKaffer} valgtKaffe={this.state.kaffeId} onChange={event => this._handleKafferChange(event)} />
                <TextInput label="Bruker: " name="bruker" required="required" placeholder="Jerre" value={this.state.bruker} onChange={event => this._handleKafferChange(event)} />
                <TextInput label="Kommentar: " name="kommentar" placeholder="Denne var rar..." value={this.state.kommentar} onChange={event => this._handleKafferChange(event)} />
                <KarakterLabel isEditable={true} maxKarakter={5} karakter={this.state.karakter} handleValgtKarakter={ verdi => this._handleKarakterValgt(verdi)}/>
                <input type="submit" value="Registrer karakter"/>
            </form>
        );
    }

    getDefaultKaffeId() {
        if (this.props.muligeKaffer.length == 0) {
            return '';
        }
        return this.props.muligeKaffer[0].kaffeId
    }
    
    _handleKafferChange(event) {
        let nyVerdi = {};
        nyVerdi[event.target.name] = event.target.value;
        this.setState(nyVerdi);
    }

    _handleKarakterValgt(verdi) {
        this.setState({karakter: verdi});
    }

    _handleSubmit(event) {
        event.preventDefault();

        $.ajax('api/brygg/' + this.props.bryggid + '/karakter', {
                contentType: 'application/json; charset=UTF-8',
                data: JSON.stringify(this.state),
                method: 'POST',
                dataType: 'json',
                success: () => {
                    this.clearForm();
                }
            }
        );

    }

    clearForm() {
        this.setState({
            kaffeId: '',
            bruker: '',
            kommentar: '',
            karakter: 0
        });
    }
}