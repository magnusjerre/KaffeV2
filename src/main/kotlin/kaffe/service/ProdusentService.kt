package kaffe.service

import org.springframework.stereotype.Service

@Service
open class ProdusentService {
    fun getAlle(): Array<String> {
        return arrayOf("Friele", "Evergood")
    }
}