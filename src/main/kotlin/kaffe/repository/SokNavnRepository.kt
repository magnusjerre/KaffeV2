package kaffe.repository

import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query
import org.springframework.data.repository.NoRepositoryBean

@NoRepositoryBean
interface SokNavnRepository<T> : MongoRepository<T, String> {

    @Query("{'sokNavn': ?0}")
    fun getMedSokNavn(navn: String) : T?

    @Query("{'sokNavn': {\$in: ?0}}")
    fun getMedSokNavn(navn: Array<String>) : MutableList<T>
}
