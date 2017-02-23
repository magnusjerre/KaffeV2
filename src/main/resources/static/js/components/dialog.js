import React, {Component} from 'react';

export default function Dialog(props) {
    return (
        <div className="dialog">
            <p>{props.text}</p>
            <button onClick={() => props.onPositive()}>{props.positiveButton}</button>
            <button onClick={() => props.onNegative()}>{props.negativeButton}</button>
        </div>
    );
}