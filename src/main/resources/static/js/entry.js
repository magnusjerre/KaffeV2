import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Kaffe extends Component {
    render() {
        return <span>Kaffe er bra for helsa!</span>;
    }
}

ReactDOM.render(
    <Kaffe />,
    document.getElementById("react")
);