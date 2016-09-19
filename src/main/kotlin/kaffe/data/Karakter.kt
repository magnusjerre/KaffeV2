package kaffe.data

data class Karakter(
        var bruker: Bruker,
        var kaffe: KaffeEnkel,
        var karakter: Byte,
        var kommentar: String = "") {

    constructor() : this(Bruker(), KaffeEnkel(), 0, "")

    /**
     * Kun lov å endre karakter og kommentar, NB! begge endres
     */
    fun endreKarakter(other: Karakter) {
        this.karakter = other.karakter
        this.kommentar = other.kommentar
    }
}
