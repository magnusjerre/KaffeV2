import {IBrygg, IKaffe, Malthet} from "./models";

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

export function retrieveKaffer(json: any) : IKaffe[] {
    let kaffer : IKaffe[] = []
    for (let i = 0; i < json.length; i++) {
        let kaffe : IKaffe = json[i]
        kaffer.push(kaffe)
    }
    return kaffer
}

export function deepCopy(obj: any) : any {
    return JSON.parse(JSON.stringify(obj))
}