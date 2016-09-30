package kaffe;

import kaffe.api.KaffeAPIController
import kaffe.web.WebController
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication

@SpringBootApplication
open class Application {
    @Autowired
    lateinit var apiController: KaffeAPIController

    @Autowired
    lateinit var webController: WebController
}

fun main(args: Array<String>) {
    SpringApplication.run(Application::class.java, *args)
}