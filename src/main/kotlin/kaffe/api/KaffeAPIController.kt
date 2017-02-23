package kaffe.api

import kaffe.api.data.Brygg
import kaffe.api.data.Kaffe
import kaffe.api.data.Karakter
import kaffe.api.data.statistikk.Statistikk
import kaffe.api.service.AutocompleteFieldService
import kaffe.api.service.BryggService
import kaffe.api.service.KaffeService
import kaffe.api.service.StatistikkService
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
    lateinit var statistikkService: StatistikkService

    @Autowired
    lateinit var autocompleteService: AutocompleteFieldService

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
        return kaffeService.getAllKaffe()
    }

    @RequestMapping("produsenter", method = arrayOf(RequestMethod.GET))
    fun getProdusenter(): MutableSet<String> {
        return autocompleteService.getAlleProdusenter()
    }

    @RequestMapping("land")
    fun getAlleLand() : MutableSet<String> {
        return autocompleteService.getAlleLand()
    }

    @RequestMapping("brukere")
    fun getAlleBrukere(): MutableSet<String> {
        return autocompleteService.getAlleBrukere()
    }

    @RequestMapping("brygg/{id}", method = arrayOf(RequestMethod.GET))
    fun getBryggMedId(@PathVariable id: String) : Brygg? {
        return bryggService.getBrygg(id)
    }

    @RequestMapping("brygg", method = arrayOf(RequestMethod.GET))
    fun getBryggDatoIntervall(@RequestParam(value = "fra", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") fra: Date? = null,
                           @RequestParam(value = "til", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") til: Date? = null,
                              @RequestParam(value = "eksSkjulte", required = false) eksSkjulte: Boolean = false) : MutableList<Brygg> {
        if (fra == null || til == null) {
            return bryggService.getAlleBrygg()
        }
        return bryggService.getBryggDatoIntervall(fra, til, eksSkjulte)
    }

    @RequestMapping("brygg", method = arrayOf(RequestMethod.POST))
    fun insertBrygg(@RequestBody brygg: Brygg) : Brygg {
        return bryggService.insertBrygg(brygg)
    }

    @RequestMapping("brygg/{id}/karakter", method = arrayOf(RequestMethod.POST))
    fun registrerKarakter(@PathVariable id: String, @RequestBody karakter: Karakter): Brygg? {
        return bryggService.registrerKarakter(id, karakter)
    }

    @RequestMapping("brygg/{id}/skjul", method = arrayOf(RequestMethod.POST))
    fun lukkBrygg(@PathVariable id: String) {
        bryggService.skjulBrygg(id)
    }

    @RequestMapping("statistikk", method = arrayOf(RequestMethod.GET))
    fun getStatistikk(@RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") fra: Date?,
                      @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") til: Date?) : MutableList<Statistikk> {
        val fraDato = fra ?: Date.from(Instant.EPOCH)
        val tilDato = til ?: Date()
        return statistikkService.getStatistikkForPeriode(fraDato, tilDato)
    }

    @RequestMapping("bruker", method = arrayOf(RequestMethod.POST))
    fun insertBruker(@RequestBody navn: String): String {
        return autocompleteService.insertBruker(navn)
    }

    @RequestMapping("land", method = arrayOf(RequestMethod.POST))
    fun insertLand(@RequestBody navn: String): String {
        return autocompleteService.insertLand(navn)
    }

    @RequestMapping("produsent", method = arrayOf(RequestMethod.POST))
    fun insertProdusent(@RequestBody navn: String): String {
        return autocompleteService.insertProdusent(navn)
    }
}
