package kaffe.api.data

data class Kaffe (
        var _id: String? = null,
        var navn: String,
        var produsent: String,
        var land: String,
        var vis: Boolean = true) {
        constructor() : this(null, "default", "default", "default", true)
}