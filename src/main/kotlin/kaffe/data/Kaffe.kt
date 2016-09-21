package kaffe.data

import kaffe.utils.sokbarString

data class Kaffe (
        var _id: String? = null,
        var navn: String,
        var produsent: String,
        var land: String,
        var vis: Boolean = true) : SokNavn {
        constructor() : this(null, "default", "default", "default", true)

        override fun sokNavn(): String {
            return sokbarString(navn)
        }
}