package kaffe

import kaffe.data.*
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

    @Autowired
    lateinit var brukerService: BrukerService

    fun getKaffe(id: String) : Kaffe? {
        return kaffeRepository.findOne(id)
    }

    fun getKaffeMedSokNavn(navn: String): Kaffe? {
        return kaffeRepository.getMedSokNavn(navn)
    }

    fun getAllKaffe() : MutableList<Kaffe> {
        return kaffeRepository.findAll()
    }

    fun getProdusent(id: String) : Produsent? {
        return produsentRepository.findOne(id)
    }

    fun getProdusentMedSokNavn(navn: String): Produsent? {
        return produsentRepository.getMedSokNavn(navn)
    }

    fun getProusenter(): MutableList<Produsent> {
        return produsentRepository.findAll()
    }

    fun getLand(id: String) : Land? {
        return landRepository.findOne(id)
    }

    fun getLandMedSokNavn(navn: String): Land? {
        return landRepository.getMedSokNavn(navn)
    }

    fun getAlleLand(): MutableList<Land> {
        return landRepository.findAll()
    }

    fun getKaffetype(id: String): Kaffetype? {
        return kaffetypeRepository.findOne(id)
    }

    fun getKaffetypeMedSokNavn(navn: String): Kaffetype? {
        return kaffetypeRepository.getMedSokNavn(navn)
    }

    fun getKaffetyper(): MutableList<Kaffetype> {
        return kaffetypeRepository.findAll()
    }

    fun getBruker(id: String) : Bruker? {
        return brukerService.getById(id)
    }

    fun getBrukerMedSokNavn(sokNavn: String) : Bruker? {
        return brukerService.getMedSokNavn(sokNavn)
    }

    fun getAlleBrukere() : MutableList<Bruker> {
        return brukerService.getAlle()
    }

}