package kaffe.service

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

    @Autowired
    lateinit var kaffeService: KaffeService

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
        brygg.kaffe = kaffeService.kvalitetssikreKaffeEnkel(brygg.kaffe)
        brygg.brygger = brukerService.kvalitetssikreBruker(brygg.brygger)
        for (karakter in brygg.karakterer) {
            verifiserKarakterVerdi(karakter.karakter)
            karakter.bruker = brukerService.kvalitetssikreBruker(karakter.bruker)
            karakter.kaffe = kaffeService.kvalitetssikreKaffeEnkel(karakter.kaffe)
        }
        return bryggRepository.insert(brygg)
    }

    fun registrerKarakter(bryggId: String, nyKarakter: Karakter): Brygg? {
        verifiserKarakterVerdi(nyKarakter.karakter)
        val brygg = getBrygg(bryggId) ?: throw IllegalArgumentException("Kan ikke registrere karakter på brygg som ikke eksisterer")

        var eksKarakter = brygg.getKarakterForBruker(nyKarakter.bruker)
        if (eksKarakter != null) {
            eksKarakter.endreKarakter(nyKarakter)
        } else {
            //Dersom karakteren ikke finnes, vil det ikke være noen id for brukeren, denne må derfor hentes
            var eksBruker = brukerService.getMedSokNavn(nyKarakter.bruker.sokNavn())
            if (eksBruker == null) {
                eksBruker = brukerService.insert(nyKarakter.bruker)
            }
            nyKarakter.bruker = eksBruker
            brygg.karakterer.add(nyKarakter)
        }
        return bryggRepository.save(brygg)
    }

    private fun verifiserKarakterVerdi(karakter: Byte) {
        if (karakter < 1 || 5 < karakter) {
            throw IllegalArgumentException("Karakterverdi må være et heltall i intervallet 1-5 inklusiv, men er: ${karakter}")
        }
    }
}