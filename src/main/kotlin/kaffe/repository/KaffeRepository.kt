package kaffe.repository

import kaffe.data.Kaffe
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query

interface KaffeRepository : MongoRepository<Kaffe, String> {

    @Query("{'vis': true}")
    fun alleVisKaffe(): MutableList<Kaffe>

    /**
     * Returnerer første match, er derfor viktig å alltid bruke hele brukernavnet ved søk
     */
    @Query("{'navn': {\$regex: ?0, \$options: 'i'}}")
    fun getMedSokNavn(navn: String) : Kaffe?
}
