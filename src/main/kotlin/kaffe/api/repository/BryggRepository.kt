package kaffe.api.repository

import kaffe.api.data.Brygg
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query
import java.util.*

interface BryggRepository : MongoRepository<Brygg, String> {

    @Query("{'dato': {\$gte: ?0, \$lte: ?1}}")
    fun getBryggFraTilDato(fra: Date, til: Date) : MutableList<Brygg>

}