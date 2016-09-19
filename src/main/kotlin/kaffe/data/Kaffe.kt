package kaffe.data

import kaffe.utils.sokbarString

data class Kaffe (
        var _id: String? = null,
        var navn: String,
        var produsent: Produsent,
        var land: Land,
        var vis: Boolean = true) : SokNavn {
        constructor() : this(null, "default", Produsent(), Land(), true)

        override fun sokNavn(): String {
            return sokbarString(navn)
        }
}