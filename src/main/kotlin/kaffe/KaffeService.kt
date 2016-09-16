package kaffe

import kaffe.data.*
import kaffe.repository.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.*

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
    lateinit var bryggRepository: BryggRepository

    @Autowired
    lateinit var brukerService: BrukerService

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

    fun getBrygg(id: String): Brygg? {
        return bryggRepository.findOne(id)
    }

    fun getAlleBrygg(): MutableList<Brygg> {
        return bryggRepository.findAll()
    }

    fun getBryggDatoIntervall(fra: Date, til: Date) : MutableList<Brygg> {
        return bryggRepository.getBryggFraTilDato(fra, til)
    }

    fun insertBrygg(brygg: Brygg) : Brygg {
        return bryggRepository.insert(brygg)
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