package kaffe.data

data class Karakter(
        var bruker: String,
        var kaffeId: String,
        var karakter: Byte,
        var kommentar: String = "") {

    constructor() : this("default", "default", 0, "")
}
