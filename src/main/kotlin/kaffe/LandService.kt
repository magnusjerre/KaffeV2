package kaffe

import kaffe.data.Land
import kaffe.repository.LandRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
open class LandService {

    @Autowired
    lateinit var landRepository: LandRepository

    fun getLand(id: String) : Land? {
        return landRepository.findOne(id)
    }

    fun getLandMedSokNavn(navn: String): Land? {
        return landRepository.getMedSokNavn(navn)
    }

    fun getAlleLand(): MutableList<Land> {
        return landRepository.findAll()
    }
}