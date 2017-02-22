import React, {Component} from 'react';
import BryggRegistrering from './brygg-registrering';
import BryggKarakterRegistrering from './brygg-karakter-registrering'
import $ from '../jquery-3.1.1.min.js';
import plussTegn from '../../images/pluss.png'
require('../../css/styles.css');

export default class Registrering extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brygg: [],
            kaffer: [],
            visRegistrerBrygg: false
        };

        $.getJSON('api/kaffe/synlige', null, (data) => {
            this.setState({
                kaffer: data
            });
        });

        this.fetchDagensBrygg();
        this._fallbackcounter = 1;
    }

    render() {
        return (
            <div className="appContent">
                { this.state.brygg.map( brygg => {
                        return (
                            <BryggKarakterRegistrering key={brygg._id ? brygg._id : this._fallbackcounter++} bryggid={brygg._id} bryggnavn={brygg.navn} muligeKaffer={this.state.kaffer} />
                        );
                    })
                }
                { this.state.visRegistrerBrygg ?
                        <BryggRegistrering onRegistrerBrygg={() => this._onRegistrerBrygg()}/>
                        : <img src={plussTegn} className="nyttBryggTegn" alt="Nytt brygg" onClick={() => this.setState({visRegistrerBrygg: true})}/>
                }
            </div>
        );
    }

    _onRegistrerBrygg() {
        this.fetchDagensBrygg();
    }

    fetchDagensBrygg() {
        let now = new Date();
        let today = this.getDateString(now);

        now.setDate(now.getDate() + 1);
        let tomorrow = this.getDateString(now);

        $.getJSON('api/brygg', {fra: today, til: tomorrow}, (data) => {
            this.setState({
                brygg: data,
                visRegistrerBrygg: data.length > 0 ? false : true
            })
        });
    }

    getDateString(date) {
        let today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        let month = today.getMonth() < 9 ? '0' + (today.getMonth() + 1) : '' + (today.getMonth() + 1);
        let day = today.getDate() < 10 ? '0' + today.getDate() : '' + today.getDate();
        return today.getFullYear() + '-' + month + '-' + day;
    }
}
