import React, {Component} from 'react'
import Karakter from './karakter.js'

export default class KarakterLabel extends Component {
    render() {
        let requiredClass = this.props.karakter > 0 ? 'requiredOK' : 'requiredNotOK';
        return (
            <label className="flexLabel">Karakter: {this.props.required ? <span className={requiredClass}> * </span> : null}
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
