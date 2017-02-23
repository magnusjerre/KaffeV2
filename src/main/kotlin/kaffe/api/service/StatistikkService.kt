package kaffe.api.service

import kaffe.api.data.Brygg
import kaffe.api.data.Karakter
import kaffe.api.data.statistikk.Statistikk
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.*

@Service
open class StatistikkService {

    @Autowired
    lateinit var bryggService: BryggService

    fun getStatistikkForPeriode(fra: Date, til: Date) : MutableList<Statistikk> {
        val alleBrygg = bryggService.getBryggDatoIntervall(fra, til, false)
        val statistikkMap: MutableMap<String, Statistikk> = mutableMapOf()

        for (brygg in alleBrygg) {
            oppdaterBryggstatistikk(getStatstikk(brygg.brygger, statistikkMap), brygg)
            for (karakter in brygg.karakterer) {
                oppdaterGjettestatistikk(fasitId = brygg.kaffeId, karakter = karakter, statistikk = getStatstikk(karakter.bruker, statistikkMap))
            }
        }
        return statistikkMap.values.toMutableList()
    }

    private fun getStatstikk(bruker: String, map: MutableMap<String, Statistikk>) : Statistikk {
        val key = bruker.trim()
        if (!map.containsKey(key)) {
            map.put(key, Statistikk(bruker = bruker))
        }
        return map.get(key)!!
    }

    private fun oppdaterBryggstatistikk(statistikk: Statistikk, brygg: Brygg) {
        statistikk.bryggeStatistikk.nBrygg++
        for (karakter in brygg.karakterer) {
            statistikk.bryggeStatistikk.addKarakter(karakter.karakter.toFloat())
        }
    }

    private fun oppdaterGjettestatistikk(fasitId: String, karakter: Karakter, statistikk: Statistikk) {
        val erKorrekt = fasitId.equals(karakter.kaffeId)
        statistikk.gjetteStatistikk.addGjetting(riktig = erKorrekt, karakter = karakter.karakter.toFloat())
    }
}