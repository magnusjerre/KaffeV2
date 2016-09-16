package kaffe.data

data class Karakter(
        var bruker: Bruker,
        var kaffe: Kaffe,
        var karakter: Byte,
        var kommentar: String = "") {

    constructor() : this(Bruker(), Kaffe(), 0, "")

}
