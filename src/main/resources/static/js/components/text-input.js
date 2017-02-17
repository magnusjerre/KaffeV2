import React, {Component} from 'react'

export default function TextInput(props) {
    return (
        <label className="flexLabel" htmlFor={props.name}>{props.label}
            <input className="flexLabelInput" name={props.name} type="text" required={props.required} placeholder={props.placeholder} onChange={ event => props.onChange(event)} value={props.value || ''} />
        </label>
    );
}