package kaffe.service

import kaffe.data.Brygg
import kaffe.data.Karakter
import kaffe.data.statistikk.Statistikk
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.*

@Service
open class StatistikkService {

    @Autowired
    lateinit var bryggService: BryggService

    fun getStatistikkForPeriode(fra: Date, til: Date) : MutableList<Statistikk> {
        val alleBrygg = bryggService.getBryggDatoIntervall(fra, til)
        val statistikkMap: MutableMap<String, Statistikk> = mutableMapOf()

        for (brygg in alleBrygg) {
            oppdaterBryggstatistikk(getStatstikk(brygg.brygger, statistikkMap), brygg)
            for (karakter in brygg.karakterer) {
                oppdaterGjettestatistikk(fasitId = brygg.kaffe._id!!, karakter = karakter, statistikk = getStatstikk(karakter.bruker, statistikkMap))
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
        val erKorrekt = fasitId.equals(karakter.kaffe._id)
        statistikk.gjetteStatistikk.addGjetting(riktig = erKorrekt, karakter = karakter.karakter.toFloat())
    }
}