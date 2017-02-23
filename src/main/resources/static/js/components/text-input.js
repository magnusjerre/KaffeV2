import React, {Component} from 'react'

export default function TextInput(props) {
    let requiredClass = meetsRequirement(props.value) ? 'requiredOK' : 'requiredNotOK';
    return (
        <label className="flexLabel" htmlFor={props.name}>{props.label}{props.required ? <span className={requiredClass}>  *  </span> : null}
            <input className="flexLabelInput" name={props.name} type="text" required={props.required} placeholder={props.placeholder} onChange={ event => props.onChange(event)} value={props.value || ''} />
        </label>
    );
}

function meetsRequirement(value) {
    let regex = /[a-zA-Z0-9]+$/
    return value != null && regex.test(value);
}