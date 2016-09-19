package kaffe

import kaffe.data.Brygg
import kaffe.data.Karakter
import kaffe.repository.BryggRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.*

@Service
open class BryggService {

    @Autowired
    lateinit var bryggRepository: BryggRepository

    @Autowired
    lateinit var brukerService: BrukerService

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

    fun registrerKarakter(bryggId: String, nyKarakter: Karakter): Brygg? {
        val brygg = getBrygg(bryggId) ?: return null

        var eksKarakter = brygg.getKarakterForBruker(nyKarakter.bruker)
        if (eksKarakter != null) {
            eksKarakter.endreKarakter(nyKarakter)
        } else {
            //Dersom karakteren ikke finnes, vil det ikke være noen id for brukeren, denne må derfor hentes
            var eksBruker = brukerService.getMedSokNavn(nyKarakter.bruker.sokNavn)
            if (eksBruker == null) {
                eksBruker = brukerService.insert(nyKarakter.bruker)
            }
            nyKarakter.bruker = eksBruker
            brygg.karakterer.add(nyKarakter)
        }
        return bryggRepository.save(brygg)
    }
}