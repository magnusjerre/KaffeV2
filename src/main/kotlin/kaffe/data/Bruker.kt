package kaffe.data

import kaffe.utils.sokbarString

data class Bruker (var _id: String?, var navn: String, var sokNavn: String) : SokNavn {
    constructor() : this(null, "default", sokbarString("default"))
    constructor(navn: String) : this(null, navn, sokbarString(navn))

    override fun sokNavn(): String {
        return sokNavn
    }

}