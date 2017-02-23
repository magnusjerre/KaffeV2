import React, {Component} from 'react'
import KaffeSelector from './kaffe-selector'
import TextInput from './text-input'
import KarakterLabel from './karakter-label'
import Dialog from './dialog'
import $ from '../jquery-3.1.1.min.js';
require('../../css/styles.css');
import cross from '../../images/cross.png'

export default class BryggKarakterRegistrering extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kaffeId: 'default',
            bruker: '',
            kommentar: '',
            karakter: 0,
            showCloseDialog: false
        };
        this._handleKafferChange.bind(this);
        this._handleSubmit.bind(this);
        this._handleClose.bind(this);
    }

    render() {
        return (
            <div className="flexboxColumn registreringBox boxListElemet">
                <header className="bryggRegistrertHeader">
                    <h1 className="bryggNavnHeader">{this.props.bryggnavn}</h1>
                    <img src={cross} alt="Close" className="closeButton" onClick={() => this.setState({showCloseDialog: !this.state.showCloseDialog})}/>
                </header>
                {this.state.showCloseDialog ?
                    <Dialog text={`Sikker på at du vil skjule "${this.props.bryggnavn}"? Det vil da ikke være mulig å registrere flere karakterer for dette brygget.`} positiveButton="Ja" negativeButton="Nei"
                            onPositive={() => {this._handleClose()}} onNegative={() => this.setState({showCloseDialog: false})}/>
                    :

                    <form className="flexboxColumn" onSubmit={event => this._handleSubmit(event)}>
                        <KaffeSelector label="Kaffe: " name="kaffeId" kaffer={this.props.muligeKaffer} valgtKaffe={this.state.kaffeId} required={true} onChange={event => this._handleKafferChange(event)} />
                        <TextInput label="Bruker: " name="bruker" required="required" placeholder="Jerre" value={this.state.bruker} onChange={event => this._handleKafferChange(event)} />
                        <TextInput label="Kommentar: " name="kommentar" placeholder="Denne var rar..." value={this.state.kommentar} onChange={event => this._handleKafferChange(event)} />
                        <KarakterLabel isEditable={true} maxKarakter={5} karakter={this.state.karakter} handleValgtKarakter={ verdi => this._handleKarakterValgt(verdi)} required={true}/>
                        <input type="submit" value="Registrer karakter"/>
                    </form>
                }
            </div>
        );
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

    _handleClose() {
        $.ajax(`api/brygg/${this.props.bryggid}/skjul`, {
            method: 'POST',
            data: null,
            success: () => {
                this.props.onSkjulBrygg();
            },
            error: () => {
                console.log(`Klarte ikke å skjule brygget "${this.props.bryggnavn}", id: ${this.props.bryggid}`);
            }
        });
    }

    clearForm() {
        this.setState({
            kaffeId: 'default',
            bruker: '',
            kommentar: '',
            karakter: 0
        });
    }
}