package kaffe.service

import org.springframework.stereotype.Service

@Service
open class LandService {

    fun getAlle(): Array<String> {
        return arrayOf("Brasil", "Etiopia")
    }

}