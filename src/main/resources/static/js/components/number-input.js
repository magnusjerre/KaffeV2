import React, {Component} from 'react'

export default function NumberInput(props) {
    return (
        <label className="flexLabel" htmlFor={props.name}>{props.label}
            <input className="flexLabelInput" type="number" name={props.name} min={props.min || 0} max={props.max || 4} step={props.step || 0.25} value={props.value || 0} onChange={event => props.onChange(event)} />
        </label>
    );
}