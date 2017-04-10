import { IBrygg } from "./models";

export function createBrygg (navn: string, brygger: string, kaffeId: string, liter: number, skjeer: number) : IBrygg {
    return {
        _id: null,
        navn: navn,
        brygger: brygger,
        kaffeId: kaffeId,
        liter: liter,
        skjeer: skjeer,
        karakterer: []
    }
}