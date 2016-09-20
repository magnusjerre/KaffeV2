package kaffe.data.statistikk

data class BryggeStatistikk(var nBrygg: Int = 0,
                            var nKarakterer: Int = 0,
                            var snittKarakter: Float = 0f) {

    fun addKarakter(karakter: Float) {
        snittKarakter = (snittKarakter * nKarakterer + karakter) / (nKarakterer + 1)
        nKarakterer++
    }
}