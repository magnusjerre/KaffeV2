package kaffe.api.data.statistikk

data class GjetteStatistikk(var nGjettinger: Int = 0,
                            var nRiktige: Int = 0,
                            var snittKarakter: Float = 0f,
                            var andelRiktige: Float = 0f) {

    fun addGjetting(riktig: Boolean, karakter: Float) {
        snittKarakter = (nGjettinger * snittKarakter + karakter) / (nGjettinger + 1)
        nGjettinger++
        if(riktig) {
            nRiktige++
        }
        andelRiktige = 1f * nRiktige / nGjettinger
    }
}
