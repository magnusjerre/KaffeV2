import {IBrygg, IKaffe, IKarakter, IStatistikk, Malthet} from "./models";

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

export function findKaffeForId(id: string, kaffer: IKaffe[]) : IKaffe {
    for (let i = 0; i < kaffer.length; i++) {
        let kaffe = kaffer[i]
        if (kaffe._id === id) {
            return kaffe
        }
    }
    return null
}

export function deepCopy(obj: any) : any {
    return JSON.parse(JSON.stringify(obj))
}

export function findBryggById(id: string, bryggListe: IBrygg[]) : IBrygg {
    let index = findIndexForBryggById(id, bryggListe)
    if (index == -1) {
        return null
    }
    return bryggListe[index]
}

export function findBryggWithIDs(id: string[], bryggListe: IBrygg[]) : IBrygg[] {
    let out : IBrygg[] = []
    if (!id || id.length == 0 || !bryggListe || bryggListe.length == 0) {
        return out
    }
    for(let i = 0; i < id.length; i++) {
        let brygg = findBryggById(id[i], bryggListe)
        if (brygg != null) {
            out.push(brygg)
        }
    }
    return out
}

export function findIndexForBryggById(id: string, bryggListe: IBrygg[]) : number {
    for (let i = 0; i < bryggListe.length; i++) {
        let brygg = bryggListe[i]
        if (brygg._id === id) {
            return i
        }
    }
    return -1
}

export function getMonthName(month: number) : string {
    switch (month) {
        case 0: { return "Januar" }
        case 1: { return "Februar"}
        case 2: { return "Mars"}
        case 3: { return "April" }
        case 4: { return "Mai" }
        case 5: { return "Juni" }
        case 6: { return "Juli" }
        case 7: { return "August" }
        case 8: { return "September" }
        case 9: { return "Oktober" }
        case 10: { return "November" }
        default: { return "Desember" }
    }
}

export function calculateSnittKarakter(karakterer: IKarakter[]) : number {
    let sum = 0
    for (let i = 0; i < karakterer.length; i++) {
        sum += karakterer[i].karakter
    }
    return sum / karakterer.length
}

export function getToday() {
    let today = new Date()
    return new Date(today.getFullYear(), today.getMonth(), today.getDate())
}

export function getFirstDayOfWeek () {
    let firstDayOfWeek  = getToday()
    if (firstDayOfWeek.getDay() != 1) { //monday = 1
        while (firstDayOfWeek.getDay() != 1) {
            firstDayOfWeek.setDate(firstDayOfWeek.getDate() - 1)
        }
    }
    return firstDayOfWeek
}

export function getLastDayOfWeek() {
    let lastDayOfWeek = getToday()
    if (lastDayOfWeek.getDay() != 0) {
        lastDayOfWeek.setDate(lastDayOfWeek.getDate() + (7 - lastDayOfWeek.getDay()))
    }
    return lastDayOfWeek
}

export function getFirstDayOfMonth() {
    let firstDayOfMonth = getToday()
    firstDayOfMonth.setDate(1)
    return firstDayOfMonth
}

export function getLastDayOfMonth() {
    let lastDayOfMonth = getToday()
    lastDayOfMonth.setDate(1)
    lastDayOfMonth.setMonth(lastDayOfMonth.getMonth() + 1)
    lastDayOfMonth.setDate(0)
    return lastDayOfMonth;
}

export function getEpoch() {
    return new Date(0)
}

export function getTomorrow() {
    let tomorrow = getToday()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow
}