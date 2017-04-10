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

}

export interface IBryggState {

}

export interface IBryggRegistrering {
    navn: string
    brygger: string
    kaffer: IKaffe[]
    kaffeId: string
    liter: number
    skjeer: number
}

export interface IState {
    bryggListe: IBrygg[]
}

export interface IAction<T> {
    type: string
    payload: T
}
