package kaffe

import kaffe.data.Kaffe
import kaffe.data.Kaffetype
import kaffe.data.Land
import kaffe.data.Produsent
import kaffe.repository.KaffeRepository
import kaffe.repository.KaffetypeRepository
import kaffe.repository.LandRepository
import kaffe.repository.ProdusentRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
open class KaffeService {
    @Autowired
    lateinit var kaffeRepository: KaffeRepository

    @Autowired
    lateinit var landRepository: LandRepository

    @Autowired
    lateinit var produsentRepository: ProdusentRepository

    @Autowired
    lateinit var kaffetypeRepository: KaffetypeRepository

    fun getKaffe(id: String) : Kaffe? {
        return kaffeRepository.findOne(id)
    }

    fun getAllKaffe() : MutableList<Kaffe> {
        return kaffeRepository.findAll()
    }

    fun getProdusent(id: String) : Produsent? {
        return produsentRepository.findOne(id)
    }

    fun getProusenter(): MutableList<Produsent> {
        return produsentRepository.findAll()
    }

    fun getLand(id: String) : Land? {
        return landRepository.findOne(id)
    }

    fun getAlleLand(): MutableList<Land> {
        return landRepository.findAll()
    }

    fun getKaffetype(id: String): Kaffetype? {
        return kaffetypeRepository.findOne(id)
    }

    fun getKaffetyper(): MutableList<Kaffetype> {
        return kaffetypeRepository.findAll()
    }

}