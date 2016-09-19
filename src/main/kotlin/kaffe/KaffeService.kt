package kaffe

import kaffe.data.Bruker
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

    fun kvalitetssikreKaffeEnkel(kaffeEnkel: KaffeEnkel): KaffeEnkel {
        val kaffe = getKaffe(kaffeEnkel.id)
        if (kaffe == null) {
            throw RuntimeException("Kaffe med id ${kaffeEnkel.id} finnes ikke")
        } else {
            return kaffeEnkelfromKaffe(kaffe)
        }
    }

}