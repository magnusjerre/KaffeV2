package kaffe

import kaffe.data.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.format.annotation.DateTimeFormat
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
open class KaffeAPIController {

    @Autowired
    lateinit var kaffeService: KaffeService

    @RequestMapping("/kaffe/{id}")
    fun getKaffeMedId(@PathVariable id: String) : Kaffe? {
        return kaffeService.getKaffe(id)
    }

    @RequestMapping("/kaffe")
    fun getAllKaffe() : MutableList<Kaffe> {
        return kaffeService.getAllKaffe();
    }

    @RequestMapping("/produsent/{id}")
    fun getProdusent(@PathVariable id: String): Produsent? {
        return kaffeService.getProdusent(id)
    }

    @RequestMapping("/produsenter")
    fun getProdusenter(): MutableList<Produsent> {
        return kaffeService.getProusenter()
    }

    @RequestMapping("/land/{id}")
    fun getLandMedId(@PathVariable id: String): Land? {
        return kaffeService.getLand(id)
    }

    @RequestMapping("/land")
    fun getAlleLand() : MutableList<Land> {
        return kaffeService.getAlleLand()
    }

    @RequestMapping("/kaffetype/{id}")
    fun getKaffetypeMedId(@PathVariable id: String): Kaffetype? {
        return kaffeService.getKaffetype(id)
    }

    @RequestMapping("/kaffetyper")
    fun getKaffetyper() : MutableList<Kaffetype> {
        return kaffeService.getKaffetyper()
    }

    @RequestMapping("/bruker/{id}")
    fun getBrukerMedId(@PathVariable id: String) : Bruker? {
        return kaffeService.getBruker(id)
    }

    @RequestMapping("/bruker/navn/{soknavn}")
    fun getBrukerMedSokNavn(@PathVariable soknavn: String) : Bruker? {
        return kaffeService.getBrukerMedSokNavn(soknavn)
    }

    @RequestMapping("/brukere")
    fun getAlleBrukere(): MutableList<Bruker> {
        return kaffeService.getAlleBrukere()
    }

    @RequestMapping("/brygg/{id}", method = arrayOf(RequestMethod.GET))
    fun getBryggMedId(@PathVariable id: String) : Brygg? {
        return kaffeService.getBrygg(id)
    }

    @RequestMapping("/brygg", method = arrayOf(RequestMethod.GET))
    fun getBryggDatoIntervall(@RequestParam(value = "fra", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") fra: Date? = null,
                           @RequestParam(value = "til", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") til: Date? = null) : MutableList<Brygg> {
        if (fra == null || til == null) {
            return kaffeService.getAlleBrygg()
        }
        return kaffeService.getBryggDatoIntervall(fra, til)
    }

    @RequestMapping("/brygg", method = arrayOf(RequestMethod.POST))
    fun insertBrygg(@RequestBody brygg: Brygg) : Brygg {
        return kaffeService.insertBrygg(brygg)
    }
}
