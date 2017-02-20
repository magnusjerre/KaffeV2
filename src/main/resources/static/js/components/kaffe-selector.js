import React, {Component} from 'react'

export default function KaffeSelector(props){
    return (
        <label className="flexLabel" htmlFor={props.name || 'kaffeSelector'}>Kaffe:
            <select className="flexLabelInput" name={props.name || 'kaffeSelector'} onChange={event => props.onChange(event)} value={props.valgtKaffe} required={props.required} >
                <option value="default" key="default" disabled="disabled">Velg kaffe</option>
                {props.kaffer.map(kaffe => <option value={kaffe._id} key={kaffe._id}>{kaffe.navn} - {kaffe.produsent}</option>)}
            </select>
        </label>
    );
}