import React, {Component} from 'react'

export default function NumberInput(props) {
    let max = props.max || 4;
    let min = props.min || 0;
    let requiredClass = meetsRequirement(props.value, min, max) ? 'requiredOK' : 'requiredNotOK';
    return (
        <label className="flexLabel" htmlFor={props.name}>{props.label}{props.required ? <span className={requiredClass}> * </span> : null}
            <input className="flexLabelInput" type="number" name={props.name} min={min} max={max} step={props.step || 0.25} value={props.value || 0} onChange={event => props.onChange(event)} />
        </label>
    );
}

function meetsRequirement(value, min, max) {
    value = parseFloat(value);
    min = parseFloat(min)
    max = parseFloat(max)
    if (typeof value != 'number') {
        console.log("value is not a number")
        return false;
    }

    if (value < min || max < value) {
        console.log("value is out of range")
        return false;
    }

    return true;
}