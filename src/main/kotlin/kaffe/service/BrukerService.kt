package kaffe.service

import org.springframework.stereotype.Service

@Service
open class BrukerService {

    fun getAlle(): Array<String> {
        return arrayOf("Magnus", "Marius", "Cake")
    }
}