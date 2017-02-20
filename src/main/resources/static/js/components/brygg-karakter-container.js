import React, {Component} from 'react'
import BryggKarakterRegistrering from './brygg-karakter-registrering.js'
import $ from '../jquery-3.1.1.min.js';
require('../../css/styles.css');

export default class BryggKarakterContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brygg: [{navn: 'cake'}],
            kaffer: []
        };

        $.getJSON('api/kaffe/synlige', null, (data) => {
            this.setState({
                kaffer: data
            });
        });

        let now = new Date();
        let today = this.getDateString(now);

        now.setDate(now.getDate() + 1);
        let tomorrow = this.getDateString(now);


        $.getJSON('api/brygg', {fra: today, til: tomorrow}, (data) => {
            this.setState({
                brygg: data
            });
        });

        this._fallbackcounter = 1;
    }

    render() {
        return (
            <div>
                {
                    this.state.brygg.map( brygg => {
                        return (
                            <BryggKarakterRegistrering key={brygg._id ? brygg._id : this._fallbackcounter++} bryggid={brygg._id} bryggnavn={brygg.navn} muligeKaffer={this.state.kaffer} />
                        );
                    })
                }
            </div>
        );
    }

    getDateString(date) {
        let today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        let month = today.getMonth() < 9 ? '0' + (today.getMonth() + 1) : '' + (today.getMonth() + 1);
        let day = today.getDate() < 10 ? '0' + today.getDate() : '' + today.getDate();
        return today.getFullYear() + '-' + month + '-' + day;
    }
}
