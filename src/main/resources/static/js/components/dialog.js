import React, {Component} from 'react';

export default function Dialog(props) {
    return (
        <div className="dialog card cardOutTop" ref={div => {if (props.addRef) props.addRef(div)}}>
            <p>{props.text}</p>
            <button onClick={() => props.onPositive()}>{props.positiveButton}</button>
            <button onClick={() => props.onNegative()}>{props.negativeButton}</button>
        </div>
    );
}