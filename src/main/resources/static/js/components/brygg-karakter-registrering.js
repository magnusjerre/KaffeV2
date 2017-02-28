import React, {Component} from 'react'
import KaffeSelector from './kaffe-selector'
import TextInput from './text-input'
import KarakterLabel from './karakter-label'
import Dialog from './dialog'
import KarakterRegistreringResultat from './karakter-registrering-resultat'
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
            gjetteResultat: {title: '', text: ''}
        };
        this._handleKafferChange.bind(this);
        this._handleSubmit.bind(this);
        this._handleClose.bind(this);
        this._handleLukkMelding.bind(this);
        this._toggleSkjulBryggBoks.bind(this);
    }

    render() {
        return (
            <div ref={div => this.div = div } className="flexboxColumn registreringBox boxListElemet">
                <header className="bryggRegistrertHeader">
                    <h1 className="bryggNavnHeader">{this.props.bryggnavn}</h1>
                    <button className="closeButton" onClick={() => this._toggleSkjulBryggBoks()}></button>
                </header>
                <div className="cardHolder">
                    <Dialog text={`Sikker på at du vil skjule "${this.props.bryggnavn}"? Det vil da ikke være mulig å registrere flere karakterer for dette brygget.`} positiveButton="Ja" negativeButton="Nei"
                            onPositive={() => {this._handleClose()}} onNegative={() => this._toggleSkjulBryggBoks()} addRef={div => this.dialog = div}/>
                    <KarakterRegistreringResultat title={this.state.gjetteResultat.title} text={this.state.gjetteResultat.text} onLukkMelding={() => this._handleLukkMelding()} addRef={div => this.regResultat = div}/>
                    <form ref={form => this.form = form } className="flexboxColumn card cardDefault" onSubmit={event => this._handleSubmit(event)}>
                        <KaffeSelector label="Kaffe: " name="kaffeId" kaffer={this.props.muligeKaffer} valgtKaffe={this.state.kaffeId} required={true} onChange={event => this._handleKafferChange(event)} />
                        <TextInput label="Bruker: " name="bruker" required="required" placeholder="Jerre" value={this.state.bruker} onChange={event => this._handleKafferChange(event)} />
                        <TextInput label="Kommentar: " name="kommentar" placeholder="Denne var rar..." value={this.state.kommentar} onChange={event => this._handleKafferChange(event)} />
                        <KarakterLabel isEditable={true} maxKarakter={5} karakter={this.state.karakter} handleValgtKarakter={ verdi => this._handleKarakterValgt(verdi)} required={true}/>
                        <input type="submit" value="Registrer karakter" ref={submit => this.submit = submit } />
                    </form>
                </div>
            </div>
        );
    }

    _toggleSkjulBryggBoks() {
        if ($(this.dialog).hasClass("cardOutTop")) {
            $(this.dialog).removeClass("cardOutTop");
            $(this.dialog).addClass("cardDefault");
            $(this.form).removeClass("cardDefault");
            $(this.form).addClass("cardOutBottom");
            $(this.regResultat).removeClass("cardDefault");
            $(this.regResultat).addClass("cardOutBottom");
        } else {
            $(this.dialog).removeClass("cardDefault");
            $(this.dialog).addClass("cardOutTop");
            $(this.form).removeClass("cardOutBottom");
            $(this.form).addClass("cardDefault");
            $(this.regResultat).removeClass("cardOutBottom");
            $(this.regResultat).addClass("cardDefault");
        }
    }

    componentDidMount() {
        $(this.regResultat).addClass("flipped");
    }

    isGjetteresultatChanged(previousGjetteState, nextGjetteState) {
        return previousGjetteState.title != nextGjetteState.title && previousGjetteState.text != nextGjetteState.text;
    }
    
    _handleKafferChange(event) {
        let nyVerdi = {};
        nyVerdi[event.target.name] = event.target.value;
        this.setState(nyVerdi);
    }

    _handleKarakterValgt(verdi) {
        this.setState({karakter: verdi});
    }

    _handleLukkMelding() {
        this.clearForm();
        $(this.form).removeClass("rotateRegistreringToBack toBackFace cardDefault");
        $(this.form).addClass("rotateRegistreringToFront toFrontFace");
        $(this.regResultat).removeClass("rotateRegistreringToFront toFrontFace cardDefault");
        $(this.regResultat).addClass("rotateRegistreringToBack toBackFace");
    }

    _handleSubmit(event) {
        event.preventDefault();
        $(this.form).removeClass("rotateRegistreringToFront toFrontFace cardDefault");
        $(this.form).addClass("rotateRegistreringToBack toBackFace");
        $(this.regResultat).removeClass("rotateRegistreringToBack toBackFace flipped cardDefault");
        $(this.regResultat).addClass("rotateRegistreringToFront toFrontFace");

        $.ajax('api/brygg/' + this.props.bryggid + '/karakter', {
                contentType: 'application/json; charset=UTF-8',
                data: JSON.stringify(this.state),
                method: 'POST',
                dataType: 'json'
            }
        );

        let gjetteResultat = {title: "", text: ""};
        let riktigKaffe = this.getRiktigKaffe();
        let korrektNavn = `${riktigKaffe.navn} - ${riktigKaffe.produsent}`;
        gjetteResultat.text = `Dagens kaffe var "${korrektNavn}".`;
        if (this.state.kaffeId == this.props.korrektKaffeId) {
            gjetteResultat.title = "Korrekt!";
        } else {
            gjetteResultat.title = "Feil...";
            gjetteResultat.text += " Bedre lykke neste gang!";
        }
        this.setState({
            gjetteResultat: gjetteResultat
        });
    }

    getRiktigKaffe() {
        for (let i = 0; i < this.props.muligeKaffer.length; i++) {
            let kaffe = this.props.muligeKaffer[i];
            if (this.props.korrektKaffeId == kaffe._id) {
                return kaffe;
            }
        }
        return null;
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