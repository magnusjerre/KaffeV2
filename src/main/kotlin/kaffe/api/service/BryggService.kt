package kaffe.api.service

import kaffe.api.data.Brygg
import kaffe.api.data.Karakter
import kaffe.api.repository.BryggRepository
import kaffe.utils.sokbarString
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.*

@Service
open class BryggService {

    @Autowired
    lateinit var bryggRepository: BryggRepository

    @Autowired
    lateinit var kaffeService: KaffeService

    fun getBrygg(id: String): Brygg? {
        return bryggRepository.findOne(id)
    }

    fun getAlleBrygg(): MutableList<Brygg> {
        return bryggRepository.findAll()
    }

    fun getBryggDatoIntervall(fra: Date, til: Date, eksSkjulte: Boolean) : MutableList<Brygg> {
        val result = bryggRepository.getBryggFraTilDato(fra, til)
        if (!eksSkjulte) {
            return result
        }
        return result.filter{brygg -> brygg.vis}.toMutableList()
    }

    fun insertBrygg(brygg: Brygg) : Brygg {
        kaffeService.verifiserKaffeId(brygg.kaffeId)
        verifiserKarakterer(brygg.karakterer)
        return bryggRepository.insert(brygg)
    }

    fun skjulBrygg(id: String) {
        val brygg = getBrygg(id) ?: throw RuntimeException("Fant ikke brygg med id $id")
        brygg.vis = false
        bryggRepository.save(brygg)
    }

    private fun verifiserKarakterer(karakterer: MutableList<Karakter>) {
        verifiserUnikeKaraktergivere(karakterer)
        for (karakter in karakterer) {
            verifiserKarakterVerdi(karakter.karakter)
            kaffeService.verifiserKaffeId(karakter.kaffeId)
        }
    }

    private fun verifiserUnikeKaraktergivere(karakterer: MutableList<Karakter>) {
        val brukerSet: MutableSet<String> = mutableSetOf()
        for (karakter in karakterer) {
            if (brukerSet.contains(sokbarString(karakter.bruker))) {
                throw IllegalArgumentException("Kan ikke ha flere karakterer av samme bruker; ${sokbarString(karakter.bruker)}")
            }
            brukerSet.add(sokbarString(karakter.bruker))
        }
    }

    private fun verifiserKarakterVerdi(karakter: Byte) {
        if (karakter < 1 || 5 < karakter) {
            throw IllegalArgumentException("Karakterverdi må være et heltall i intervallet 1-5 inklusiv, men er: ${karakter}")
        }
    }

    fun registrerKarakter(bryggId: String, nyKarakter: Karakter): Brygg? {
        kaffeService.verifiserKaffeId(nyKarakter.kaffeId)
        verifiserKarakterVerdi(nyKarakter.karakter)
        val brygg = getBrygg(bryggId) ?: throw IllegalArgumentException("Kan ikke registrere karakter på brygg som ikke eksisterer")

        val eksKarakter = brygg.getKarakterForBruker(nyKarakter.bruker)
        if (eksKarakter != null) {
            brygg.karakterer.remove(eksKarakter)
        }
        brygg.karakterer.add(nyKarakter)

        return bryggRepository.save(brygg)
    }
}