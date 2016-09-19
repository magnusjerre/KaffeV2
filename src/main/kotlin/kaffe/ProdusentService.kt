package kaffe

import kaffe.data.Produsent
import kaffe.repository.ProdusentRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
open class ProdusentService {

    @Autowired
    lateinit var produsentRepository: ProdusentRepository

    fun getProdusent(id: String) : Produsent? {
        return produsentRepository.findOne(id)
    }

    fun getProdusentMedSokNavn(navn: String): Produsent? {
        return produsentRepository.getMedSokNavn(navn)
    }

    fun getProusenter(): MutableList<Produsent> {
        return produsentRepository.findAll()
    }
}