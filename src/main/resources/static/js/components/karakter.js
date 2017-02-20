import React, {Component} from 'react'
import bean from '../../css/images/coffee_bean.png'

export default class Karakter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            karakterArray: this._velgBeansOpptilKarakter(props.karakter)
        };
        this._setSelectedBeans.bind(this);
        this._handleClick.bind(this);
        this._handleLeavingKarakterField.bind(this);
    }
    render() {
        let valgtClasses = "karakterBean";
        let ikkeValgtClasses = valgtClasses + " gray";
        return (
            <div className="inline-block-element" onMouseLeave={() => this._handleLeavingKarakterField()}>
                {this.state.karakterArray.map( element => {return <img key={element.value} src={bean} alt="Bean" className={element.valgt ? valgtClasses : ikkeValgtClasses}
                                                                       onMouseEnter={event => this._setSelectedBeans(element.value)} onMouseUp={() => this._handleClick(element.value)} />})}
            </div>
        );
    }

    hasKarakter() {
        return this.props.karakter != null && !isNaN(this.props.karakter);
    }

    isEditable() {
        return this.props.isEditable !== undefined &&
            this.props.isEditable === true;
    }

    _handleLeavingKarakterField() {
        if (this.isEditable()) {
            this._setSelectedBeans(this.props.karakter);
        }
    }

    _handleClick(value) {
        if (this.isEditable()) {
            this.props.handleValgtKarakter(value);
        }
    }

    _setSelectedBeans(value) {
        if (this.isEditable()) {
            this.setState({karakterArray: this._velgBeansOpptilKarakter(value)});
        }
    }

    _velgBeansOpptilKarakter(karakter) {
        let newKarakterArray = [];
        for (let i = 0; i < this.props.maxKarakter; i++) {
            if (i < karakter) {
                newKarakterArray.push({value: (i+1), valgt: true});
            } else {
                newKarakterArray.push({value: (i+1), valgt: false});
            }
        }
        return newKarakterArray;
    }
}

Karakter.propTypes = {
    karakter: React.PropTypes.number.isRequired,
    maxKarakter: React.PropTypes.number.isRequired,
    handleValgtKarakter: React.PropTypes.func,
    isEditable: React.PropTypes.bool
};
