package kaffe.web

import kaffe.api.service.KaffeService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.servlet.ModelAndView

@Controller
open class WebController {

    @Autowired
    lateinit var kaffeService: KaffeService

    @RequestMapping("/*", method = arrayOf(RequestMethod.GET))
    fun index(model: Model): String {
        model.addAttribute("kaffe", kaffeService.getAllKaffe())
        return "index"
    }
}
