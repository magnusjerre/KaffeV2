import React, {Component} from 'react';
import cross from '../../images/cross.png'

export default function KarakterRegistreringResultat(props) {
    return (
        <div className="gjetteResultat card" ref={div => {if (props.addRef) props.addRef(div)}}>
            <h2>{props.title}</h2>
            <p>{props.text}</p>
            <button className="closeButton lukkGjetteResultat" onClick={() => props.onLukkMelding()}></button>
        </div>
    );
}
