import {Dispatch} from "react-redux";
export interface IBrygg {
    _id: string
    navn: string
    brygger: string
    kaffeId: string
    liter: number
    skjeer: number
    karakterer: IKarakter[]
}

export interface IKarakter {

}

export interface IKaffe {
    _id: string
    navn: string
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
    nyttBrygg: IBryggRegistrering
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
