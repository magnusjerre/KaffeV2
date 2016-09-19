package kaffe.data

import kaffe.utils.sokbarString

data class Bruker (var _id: String?, var navn: String) : SokNavn {
    constructor() : this(null, "default")
    constructor(navn: String) : this(null, navn)

    override fun sokNavn(): String {
        return sokbarString(navn)
    }

    fun erSammeBruker(other: Bruker) : Boolean {
        return sokNavn().equals(other.sokNavn())
    }

}