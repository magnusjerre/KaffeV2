package kaffe

import kaffe.data.*
import kaffe.data.statistikk.Statistikk
import kaffe.service.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.format.annotation.DateTimeFormat
import org.springframework.web.bind.annotation.*
import java.time.Instant
import java.util.*

@RestController
@RequestMapping("api")
open class KaffeAPIController {

    @Autowired
    lateinit var kaffeService: KaffeService

    @Autowired
    lateinit var bryggService: BryggService

    @Autowired
    lateinit var landService: LandService

    @Autowired
    lateinit var produsentService: ProdusentService

    @Autowired
    lateinit var brukerService: BrukerService

    @Autowired
    lateinit var statistikkService: StatistikkService

    @RequestMapping("kaffe", method = arrayOf(RequestMethod.POST))
    fun insertKaffe(@RequestBody kaffe: Kaffe): Kaffe {
        return kaffeService.insertKaffe(kaffe)
    }

    @RequestMapping("kaffe/{id}")
    fun getKaffeMedId(@PathVariable id: String) : Kaffe? {
        return kaffeService.getKaffe(id)
    }

    @RequestMapping("kaffe/soknavn/{navn}")
    fun getKaffeMedSoknavn(@PathVariable navn: String): Kaffe? {
        return kaffeService.getKaffeMedSokNavn(navn)
    }

    @RequestMapping("kaffe/synlige")
    fun getSynligeKaffer(): MutableList<Kaffe> {
        return kaffeService.getSynligeKaffer()
    }

    @RequestMapping("kaffe")
    fun getAllKaffe() : MutableList<Kaffe> {
        return kaffeService.getAllKaffe();
    }

    @RequestMapping("produsenter")
    fun getProdusenter(): Array<String> {
        return produsentService.getAlle()
    }

    @RequestMapping("land")
    fun getAlleLand() : Array<String> {
        return landService.getAlle()
    }

    @RequestMapping("brukere")
    fun getAlleBrukere(): Array<String> {
        return brukerService.getAlle()
    }

    @RequestMapping("brygg/{id}", method = arrayOf(RequestMethod.GET))
    fun getBryggMedId(@PathVariable id: String) : Brygg? {
        return bryggService.getBrygg(id)
    }

    @RequestMapping("brygg", method = arrayOf(RequestMethod.GET))
    fun getBryggDatoIntervall(@RequestParam(value = "fra", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") fra: Date? = null,
                           @RequestParam(value = "til", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") til: Date? = null) : MutableList<Brygg> {
        if (fra == null || til == null) {
            return bryggService.getAlleBrygg()
        }
        return bryggService.getBryggDatoIntervall(fra, til)
    }

    @RequestMapping("brygg", method = arrayOf(RequestMethod.POST))
    fun insertBrygg(@RequestBody brygg: Brygg) : Brygg {
        return bryggService.insertBrygg(brygg)
    }

    @RequestMapping("brygg/{id}/karakter", method = arrayOf(RequestMethod.POST))
    fun registrerKarakter(@PathVariable id: String, @RequestBody karakter: Karakter): Brygg? {
        return bryggService.registrerKarakter(id, karakter)
    }

    @RequestMapping("statistikk", method = arrayOf(RequestMethod.GET))
    fun getStatistikk(@RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") fra: Date?,
                      @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") til: Date?) : MutableList<Statistikk> {
        val fraDato = fra ?: Date.from(Instant.EPOCH)
        val tilDato = til ?: Date()
        return statistikkService.getStatistikkForPeriode(fraDato, tilDato)
    }
}
