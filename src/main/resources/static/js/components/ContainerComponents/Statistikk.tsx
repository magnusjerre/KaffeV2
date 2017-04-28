import * as React from "react"
import {IBryggStatistikk, IGjetteStatistikk, IState, IStatistikk, IStatistikkState} from "../../models";
import {connect} from "react-redux";
let check = require("../../../images/check.png")

declare function require(name: string) : any

interface IBryggStatistikkRad {
    bruker: string
    statistikk: IBryggStatistikk
}

const BryggStatistikkRad : React.StatelessComponent<IBryggStatistikkRad> = ({bruker, statistikk}) => (
    <tr>
        <td>{bruker}</td>
        <td>{statistikk.nbrygg}</td>
        <td>{statistikk.snittKarakter}</td>
    </tr>
)

interface IStatistikkComp {
    tittel: string
    statistikkListe: IStatistikk[]
}

const BryggStatistikk : React.StatelessComponent<IStatistikkComp> = ({statistikkListe, tittel}) => (
    <div className="statistikk">
        <h1>{tittel}</h1>
        <table>
            <thead>
                <tr>
                    <th>Brygger</th>
                    <th>Antall</th>
                    <th>Snittkarakter</th>
                </tr>
            </thead>
            <tbody>
            {
                statistikkListe.map(statistikk =>
                    <BryggStatistikkRad key={tittel + statistikk.bruker} bruker={statistikk.bruker} statistikk={statistikk.bryggeStatistikk}/>
                )
            }
            </tbody>
        </table>
    </div>
)

interface IGjetteStatistikkRad {
    bruker: string
    statistikk: IGjetteStatistikk
}

const GjetteStatistikkRad : React.StatelessComponent<IGjetteStatistikkRad> = ({bruker, statistikk}) => (
    <tr>
        <td>{bruker}</td>
        <td>{statistikk.nriktige}</td>
        <td>{statistikk.ngjettinger}</td>
        <td>{statistikk.andelRiktige}</td>
        <td>{statistikk.snittKarakter}</td>
    </tr>
)

const GjetteStatistikk : React.StatelessComponent<IStatistikkComp> = ({statistikkListe, tittel}) => (
    <div className="statistikk">
        <h1>{tittel}</h1>
        <table>
            <thead>
                <tr>
                    <th>Bruker</th>
                    <th><img src={check} alt="Riktige" className="checkMark"/></th>
                    <th>Tot.</th>
                    <th>%</th>
                    <th>Snitt</th>
                </tr>
            </thead>
            <tbody>
            {
                statistikkListe.map(statistikk =>
                    <GjetteStatistikkRad key={tittel + statistikk.bruker} bruker={statistikk.bruker} statistikk={statistikk.gjetteStatistikk}/>
                )
            }
            </tbody>
        </table>
    </div>
)

const StatistikkComp : React.StatelessComponent<IStatistikkState> = ({uke, mnd, evigheten}) => (
    <div className="horizontalContainer">
        <GjetteStatistikk statistikkListe={uke} tittel="Uke"/>
        <GjetteStatistikk statistikkListe={mnd} tittel="Måned"/>
        <GjetteStatistikk statistikkListe={evigheten} tittel="Evigheten"/>
        <BryggStatistikk statistikkListe={evigheten} tittel="Brygg"/>
    </div>
)

const mapStateToProps = (state: IState) : IStatistikkState => {
    return {
        uke: state.statistikk.uke,
        mnd: state.statistikk.mnd,
        evigheten: state.statistikk.evigheten
    }
}

const Statistikk = connect(mapStateToProps)(StatistikkComp)
export default Statistikk


