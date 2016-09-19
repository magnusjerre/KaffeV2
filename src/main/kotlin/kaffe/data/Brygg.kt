package kaffe.data

import java.util.*

data class Brygg(
        var _id: String?,
        var navn: String,
        var kaffe: Kaffe,
        var brygger: Bruker,
        var dato: Date,
        var liter: Float,
        var skjeer: Float,
        var vis: Boolean,
        var kommentar: String = "",
        var malthet: Malthet,
        var karakterer: MutableList<Karakter>) {

    constructor(): this(null, "default", Kaffe(), Bruker(), Date(), 0f, 0f, true, "", Malthet.MEDIUM, mutableListOf())

    fun getKarakterForBruker(bruker: Bruker) : Karakter? {
        for (karakter in karakterer) {
            if (karakter.bruker.erSammeBruker(bruker)) {
                return karakter
            }
        }
        return null
    }
}