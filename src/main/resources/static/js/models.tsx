import {Dispatch} from "react-redux";
export interface IBrygg {
    _id: string
    navn: string
    kaffeId: string
    brygger: string
    dato: Date | string //Date when sending to server, string when receiving from server
    liter: number
    skjeer: number
    vis: Boolean
    kommentar: string
    malthet: Malthet
    karakterer: IKarakter[]
    //Fields not part of the api
    nyKarakter?: IKarakter
    gjetteResultat?: IKarakter
    visning?: RegistreringVisning
}

export enum RegistreringVisning {
    REGISTRERING, RESULTAT, LUKK
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
    _id?: string
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

export interface IBryggReg {
    brygg: IBryggRegistrering
    visKnapp: boolean
}

export interface IState {
    bryggListe: IBrygg[]
    nyttBrygg: IBryggReg
    kaffer: IKaffeFetcher
    kalender: IKalenderState
    kaffeRegistrering: IKaffe
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
    autofocus?: boolean
    required?: boolean
}

export interface IKaffeFetcher {
    muligeKaffer: IKaffe[]
    isFetching: Boolean
}

export interface IPropertyChange {
    property: string
    value: any
}

export interface IKalenderState {
    year: number
    month: number
    utvalgteBrygg: string[]
    utvalgtBrygg: IBrygg
    bryggForMnd: IBrygg[]
}
