package kaffe.data

import kaffe.utils.erSammeBruker
import java.util.*

data class Brygg(
        var _id: String?,
        var navn: String,
        var kaffe: Kaffe,
        var brygger: String,
        var dato: Date,
        var liter: Float,
        var skjeer: Float,
        var vis: Boolean,
        var kommentar: String = "",
        var malthet: Malthet,
        var karakterer: MutableList<Karakter>) {

    constructor(): this(null, "default", Kaffe(), "default", Date(), 0f, 0f, true, "", Malthet.MEDIUM, mutableListOf())

    fun getKarakterForBruker(bruker: String) : Karakter? {
        for (karakter in karakterer) {
            if (erSammeBruker(bruker, karakter.bruker)) {
                return karakter
            }
        }
        return null
    }
}