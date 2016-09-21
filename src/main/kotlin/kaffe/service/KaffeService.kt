package kaffe.service

import kaffe.data.Kaffe
import kaffe.repository.KaffeRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
open class KaffeService {
    @Autowired
    lateinit var kaffeRepository: KaffeRepository

    fun getKaffe(id: String) : Kaffe? {
        return kaffeRepository.findOne(id)
    }

    fun getKaffeMedSokNavn(navn: String): Kaffe? {
        return kaffeRepository.getMedSokNavn(navn)
    }

    fun getAllKaffe() : MutableList<Kaffe> {
        return kaffeRepository.findAll()
    }

    fun getSynligeKaffer() : MutableList<Kaffe> {
        return kaffeRepository.alleVisKaffe()
    }

    fun kvalitetssikreKaffe(eksKaffe: Kaffe) {
        val kaffe = getKaffe(eksKaffe._id!!)
        if (kaffe == null) {
            throw RuntimeException("Kaffe med id ${eksKaffe._id} finnes ikke, kan derfor ikke kvalitetssikre")
        } else {
            eksKaffe.land = kaffe.land
            eksKaffe.navn = kaffe.navn
            eksKaffe.produsent = kaffe.produsent
        }
    }

    fun insertKaffe(kaffe: Kaffe): Kaffe {
        kaffe.land = kaffe.land.trim()
        kaffe.produsent = kaffe.produsent.trim()
        return kaffeRepository.insert(kaffe)
    }

    fun verifiserKaffeId(id: String) {
        if (getKaffe(id) == null) {
            throw IllegalArgumentException("Kaffe med id ${id} finnes ikke")
        }
    }

}