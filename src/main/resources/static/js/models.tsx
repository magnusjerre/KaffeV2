import {Dispatch} from "react-redux";
export interface IBrygg {
    _id: string
    navn: string
    kaffeId: string
    brygger: string
    dato: Date
    liter: number
    skjeer: number
    vis: Boolean
    kommentar: string
    malthet: Malthet
    karakterer: IKarakter[]
}

export enum Malthet {
    FINMALT, MEDIUM, GROV
}

export interface IKarakter {

}

export interface IKaffe {
    _id: string
    navn: string
    produsent: string
    land: string
    vis: Boolean
}

export interface IBryggState {

}

export interface IBryggRegistrering {
    navn?: string
    brygger?: string
    kaffeId?: string
    liter?: number
    skjeer?: number
    visBryggRegistrering?: boolean
}

export interface IState {
    bryggListe: IBrygg[],
    nyttBrygg: IBryggRegistrering,
    kaffer: IKaffeFetcher
}

export interface IAction<T> {
    type: string
    payload: T
}

export interface IDispatchable<T> {
    dispatch?: Dispatch<T>
}

export interface IKaffeSelect {
    muligeKaffer: IKaffe[]
    onChangeKaffe: (newId: string) => VoidFunction
    name: string
    kaffeId: string
    id: string
}

export interface IKaffeFetcher {
    muligeKaffer: IKaffe[]
    isFetching: Boolean
}
