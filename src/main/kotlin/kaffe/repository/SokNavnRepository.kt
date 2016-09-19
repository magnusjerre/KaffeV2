package kaffe.repository

import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query
import org.springframework.data.repository.NoRepositoryBean
@NoRepositoryBean
interface SokNavnRepository<T> : MongoRepository<T, String> {

    /**
     * Returnerer første match, er derfor viktig å alltid bruke hele brukernavnet ved søk
     */
    @Query("{'navn': {\$regex: ?0, \$options: 'i'}}")
    fun getMedSokNavn(navn: String) : T?

}
