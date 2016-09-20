package kaffe

import kaffe.data.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.format.annotation.DateTimeFormat
import org.springframework.web.bind.annotation.*
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

    @RequestMapping("kaffe")
    fun getAllKaffe() : MutableList<Kaffe> {
        return kaffeService.getAllKaffe();
    }

    @RequestMapping("produsent/{id}")
    fun getProdusent(@PathVariable id: String): Produsent? {
        return produsentService.getById(id)
    }

    @RequestMapping("produsent/soknavn/{navn}")
    fun getProdusentMedSokNavn(@PathVariable navn: String): Produsent? {
        return produsentService.getMedSokNavn(navn)
    }

    @RequestMapping("produsenter")
    fun getProdusenter(): MutableList<Produsent> {
        return produsentService.getAlle()
    }

    @RequestMapping("land/{id}")
    fun getLandMedId(@PathVariable id: String): Land? {
        return landService.getById(id)
    }

    @RequestMapping("land/soknavn/{navn}")
    fun getLandMedSokNavn(@PathVariable navn: String): Land? {
       return landService.getMedSokNavn(navn)
    }

    @RequestMapping("land")
    fun getAlleLand() : MutableList<Land> {
        return landService.getAlle()
    }

    @RequestMapping("bruker/{id}")
    fun getBrukerMedId(@PathVariable id: String) : Bruker? {
        return brukerService.getById(id)
    }

    @RequestMapping("bruker/navn/{soknavn}")
    fun getBrukerMedSokNavn(@PathVariable soknavn: String) : Bruker? {
        return brukerService.getMedSokNavn(soknavn)
    }

    @RequestMapping("brukere")
    fun getAlleBrukere(): MutableList<Bruker> {
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
}
