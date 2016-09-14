package kaffe.data

data class Kaffe (
        var _id: String,
        var navn: String,
        var produsent: Produsent,
        var land: Land,
        var kaffetype: Kaffetype,
        var vis: Boolean)