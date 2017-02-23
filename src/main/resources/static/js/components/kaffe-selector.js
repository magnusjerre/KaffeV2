import React, {Component} from 'react'

export default function KaffeSelector(props){
    let requiredClass = props.valgtKaffe != 'default' && props.valgtKaffe ? 'requiredOK' : 'requiredNotOK';
    return (
        <label className="flexLabel" htmlFor={props.name || 'kaffeSelector'}>Kaffe: {props.required ? <span className={requiredClass}>  *  </span> : null}
            <select className="flexLabelInput" name={props.name || 'kaffeSelector'} onChange={event => props.onChange(event)} value={props.valgtKaffe} required={props.required} >
                <option value="default" key="default" disabled="disabled">Velg kaffe</option>
                {props.kaffer.map(kaffe => <option value={kaffe._id} key={kaffe._id}>{kaffe.navn} - {kaffe.produsent}</option>)}
            </select>
        </label>
    );
}