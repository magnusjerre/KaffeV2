package kaffe.data

data class Karakter(
        var bruker: Bruker,
        var kaffe: Kaffe,
        var karakter: Byte,
        var kommentar: String = "") {

    constructor() : this(Bruker(), Kaffe(), 0, "")

    /**
     * Kun lov å endre karakter og kommentar, NB! begge endres
     */
    fun endreKarakter(other: Karakter) {
        this.karakter = other.karakter
        this.kommentar = other.kommentar
    }
}
