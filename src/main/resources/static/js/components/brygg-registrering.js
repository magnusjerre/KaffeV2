import React, { Component } from 'react';
import KaffeSelector from './kaffe-selector.js'
import TextInput from './text-input.js'
import NumberInput from './number-input.js'
import $ from '../jquery-3.1.1.min.js';
require('../../css/styles.css');

export default class BryggRegistrering extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navn: '',
            brygger: '',
            kaffer:[],
            kaffeId: '',
            liter: 0,
            skjeer: 0
        };
        this._storeChange.bind(this);
        this._handleKafferChange.bind(this);
        this._handleSubmit.bind(this);
    }

    componentWillMount() {
        $.getJSON('api/kaffe/synlige',null, (data) => {
            this.setState({
                kaffer: data
            });
        });
    }

    render() {
        return <form id="bryggregistreringForm" className="flexboxColumn registreringBox" onSubmit={event => this._handleSubmit(event)}>
                <TextInput label="Bryggnavn: " required="required" name="navn" placeholder="Gang of four" value={this.state.navn} onChange={(event) => this._storeChange(event)} />
                <TextInput label="Brygger: " required="required" name="brygger" placeholder="Jerre" value={this.state.brygger} onChange={(event) => this._storeChange(event)} />
                <KaffeSelector required="required" name="kaffeId" kaffer={this.state.kaffer} valgtKaffe={this.state.kaffeId} onChange={(event) => this._handleKafferChange(event)}/>
                <NumberInput label="Liter: " name="liter" required="required" value={this.state.liter} max="4" onChange={event => this._storeChange(event)} />
                <NumberInput label="Skjeer: " name="skjeer" required="required" value={this.state.skjeer} step="0.5" min="0.5" max="15" onChange={event => this._storeChange(event)} />
                <input type="submit" value="Registrer brygg"/>
            </form>
    }

    _storeChange(event) {
        event.preventDefault();
        let tempState = {};
        tempState[event.target.name] = event.target.value;
        this.setState(tempState);
    }

    _handleKafferChange(event) {
        let nyVerdi = {};
        nyVerdi[event.target.name] = event.target.value;
        this.setState(nyVerdi);
    }

    _handleSubmit(event) {
        event.preventDefault();
        let nyttBrygg = this.convertFormToJSON();
        $.ajax("api/brygg", {
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify(nyttBrygg),
            dataType: 'json',
            method: 'POST',
            success: (data, textStatus, jqXHR) => {
                this.clearForm()
                this.props.onRegistrerBrygg();
            }
        });
    }

    convertFormToJSON() {
        let formArray = $("#bryggregistreringForm").serializeArray();
        let brygg = {dato: new Date().getTime(), vis: true, kommentar: '', malthet: 'FINMALT', karakterer: []};
        for (let i = 0; i < formArray.length; i++) {
            let name = formArray[i].name;
            let val = formArray[i].value;
            if (name == 'skjeer' || name == 'liter') {
                brygg[name] = parseFloat(val);
            } else {
                brygg[name] = val;
            }
        }
        return brygg;
    }

    clearForm() {
        console.log("clearing form");
        this.setState({
            navn: '',
            brygger: '',
            kaffeId: '',
            liter: 0,
            skjeer: 0
        });
    }
}