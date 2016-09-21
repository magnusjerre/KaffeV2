package kaffe.utils

import kaffe.data.Kaffe
import kaffe.data.KaffeEnkel

fun sokbarString(s: String) : String {
    return s.trim().toLowerCase()
}

fun kaffeEnkelfromKaffe(kaffe: Kaffe): KaffeEnkel {
    return KaffeEnkel(id = kaffe._id!!, navn = kaffe.navn, prodNavn = kaffe.produsent, landNavn = kaffe.land)
}

fun erSammeBruker(bruker1: String, bruker2: String): Boolean {
    return sokbarString(bruker1).equals(sokbarString(bruker2))
}