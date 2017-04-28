import * as React from "react";
import {IKaffe, IState} from "../models";
import {connect, Dispatch} from "react-redux";
import CheckBox from "./Checkbox";
import {changeVisibility} from "../actions/kaffe_actions";

interface IKaffeRad {
    kaffe: IKaffe
    changeVisibility: (visible: boolean, id: string) => void
    id: string
}

const KaffeRad : React.StatelessComponent<IKaffeRad> = ({kaffe, changeVisibility, id}) => (
    <tr>
        <td>{kaffe.navn}</td>
        <td>{kaffe.produsent}</td>
        <td>{kaffe.land}</td>
        <td>
            <CheckBox onChangeCheck={changeVisibility} checked={kaffe.vis} id={id}/>
        </td>
    </tr>
)

interface IKaffeTabell {
    kaffer?: IKaffe[]
    changeVisibility?: (visible: boolean, id: string) => void
}

const KaffeTabell : React.StatelessComponent<IKaffeTabell> = ({kaffer, changeVisibility}) => (
    <div className="verticalContainer">
        <table>
            <thead>
                <tr>
                    <th>Navn</th>
                    <th>Produsent</th>
                    <th>Land</th>
                    <th>Vis</th>
                </tr>
            </thead>
            <tbody>
                {
                    kaffer.map((kaffe: IKaffe) => (
                        <KaffeRad key={kaffe._id} kaffe={kaffe} changeVisibility={changeVisibility} id={kaffe._id}/>
                    ))
                }
            </tbody>
        </table>
    </div>
)

const mapStateToProps = (state: IState, ownProps: IKaffeTabell) : IKaffeTabell => {
    return {
        kaffer: state.kaffer.alleKaffer
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) : IKaffeTabell => {
    return {
        changeVisibility: (visible: boolean, id: string) => {
            dispatch(changeVisibility(visible, id))
        }
    }
}

const KaffeListe = connect(mapStateToProps, mapDispatchToProps)(KaffeTabell)
export default KaffeListe