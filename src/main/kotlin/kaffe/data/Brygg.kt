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
        var karakterer: MutableList<Karakter>) {

    constructor(): this(null, "default", Kaffe(), Bruker(), Date(), 0f, 0f, true, mutableListOf())

}