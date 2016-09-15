package kaffe.data

data class Kaffe (
        var _id: String? = null,
        var navn: String,
        var produsent: Produsent,
        var land: Land,
        var kaffetype: Kaffetype,
        var vis: Boolean = true) {

        constructor() : this(null, "default", Produsent(), Land(), Kaffetype(), true)
}