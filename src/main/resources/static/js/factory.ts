import {IBrygg, Malthet} from "./models";

export function createBrygg (navn: string, brygger: string, kaffeId: string, liter: number, skjeer: number) : IBrygg {
    return {
        _id: null,
        navn: navn,
        dato: new Date(),
        kaffeId: kaffeId,
        brygger: brygger,
        liter: liter,
        skjeer: skjeer,
        vis: true,
        kommentar: "",
        malthet: Malthet.MEDIUM,
        karakterer: []
    }
}