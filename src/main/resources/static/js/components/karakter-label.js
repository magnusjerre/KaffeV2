import React, {Component} from 'react'
import Karakter from './karakter.js'

export default class KarakterLabel extends Component {
    render() {
        return (
            <label className="flexLabel">Karakter:
                <Karakter karakter={this.props.karakter} maxKarakter={this.props.maxKarakter} isEditable={this.props.isEditable}
                          handleValgtKarakter={verdi => this.props.handleValgtKarakter(verdi)}/>
            </label>
        );
    }
}

KarakterLabel.propTypes = {
    karakter: React.PropTypes.number.isRequired,
    maxKarakter: React.PropTypes.number.isRequired,
    handleValgtKarakter: React.PropTypes.func,
    isEditable: React.PropTypes.bool
};
