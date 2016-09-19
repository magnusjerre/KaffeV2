package kaffe.data

import kaffe.utils.sokbarString

data class Land(var _id: String?, var navn: String) : SokNavn {
    constructor() : this(null, "default")

    override fun sokNavn(): String {
        return sokbarString(navn)
    }
}
