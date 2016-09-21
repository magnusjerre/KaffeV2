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

    fun kvalitetssikreKaffeEnkel(kaffeEnkel: KaffeEnkel) {
        val kaffe = getKaffe(kaffeEnkel.id)
        if (kaffe == null) {
            throw RuntimeException("Kaffe med id ${kaffeEnkel.id} finnes ikke, kan derfor ikke kvalitetssikre")
        } else {
            val eksKaffeEnkel = kaffeEnkelfromKaffe(kaffe)
            kaffeEnkel.landNavn = eksKaffeEnkel.landNavn
            kaffeEnkel.navn = eksKaffeEnkel.navn
            kaffeEnkel.prodNavn = eksKaffeEnkel.prodNavn
        }
    }

    fun insertKaffe(kaffe: Kaffe): Kaffe {
        kaffe.land = kaffe.land.trim()
        kaffe.produsent = kaffe.produsent.trim()
        return kaffeRepository.insert(kaffe)
    }

}