package kaffe

import kaffe.data.Kaffe
import kaffe.data.Kaffetype
import kaffe.data.Land
import kaffe.data.Produsent
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
open class KaffeAPIController {

    @RequestMapping("/kaffe/{kaffeid}")
    fun getKaffeMedId(@PathVariable kaffeid: String) : Kaffe {
        return Kaffe("1", "Frokost kaffe", Produsent("1", "Friele"), Land("1", "Norge"), Kaffetype("1", "Bønner"), false)
    }
}
