package kaffe.service

import kaffe.data.Kaffe
import kaffe.data.KaffeEnkel
import kaffe.repository.KaffeRepository
import kaffe.utils.kaffeEnkelfromKaffe
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
open class KaffeService {
    @Autowired
    lateinit var kaffeRepository: KaffeRepository

    @Autowired
    lateinit var landService: LandService

    @Autowired
    lateinit var produsentService: ProdusentService

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

    fun kvalitetssikreKaffeEnkel(kaffeEnkel: KaffeEnkel): KaffeEnkel {
        val kaffe = getKaffe(kaffeEnkel.id)
        if (kaffe == null) {
            throw RuntimeException("Kaffe med id ${kaffeEnkel.id} finnes ikke")
        } else {
            return kaffeEnkelfromKaffe(kaffe)
        }
    }

    fun insertKaffe(kaffe: Kaffe): Kaffe {
        kaffe.land = landService.insert(kaffe.land)
        kaffe.produsent = produsentService.insert(kaffe.produsent)
        return kaffeRepository.insert(kaffe)
    }

}