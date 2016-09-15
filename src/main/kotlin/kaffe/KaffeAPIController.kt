package kaffe

import kaffe.data.Kaffe
import kaffe.data.Kaffetype
import kaffe.data.Land
import kaffe.data.Produsent
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

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
}
