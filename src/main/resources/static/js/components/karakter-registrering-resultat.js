import React, {Component} from 'react';
import cross from '../../images/cross.png'

export default function KarakterRegistreringResultat(props) {
    return (
        <div className="gjetteResultat">
            <h2>{props.title}</h2>
            <p>{props.text}</p>
            <img className="lukkGjetteResultat" src={cross} alt="lukk" onClick={() => props.onLukkMelding()}/>
        </div>
    );
}
