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
    //Fields not part of the api
    nyKarakter?: IKarakter
}

export enum Malthet {
    FINMALT, MEDIUM, GROV
}

export interface IKarakter {
    karakter: number
    bruker: string
    kaffeId: string
    kommentar: string
}

export interface IKarakterRegistreringState {
    karakterRegistreringer: IKarakter[]
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
    onChangeKaffe: (property: string, newId: string) => void
    name: string
    value: string
}

export interface IKaffeFetcher {
    muligeKaffer: IKaffe[]
    isFetching: Boolean
}

export interface IPropertyChange {
    property: string
    value: any
}
