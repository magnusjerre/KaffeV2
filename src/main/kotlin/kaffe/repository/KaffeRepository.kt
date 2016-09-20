package kaffe.repository

import kaffe.data.Kaffe
import org.springframework.data.mongodb.repository.Query

interface KaffeRepository : SokNavnRepository<Kaffe> {

    @Query("{'vis': true}")
    fun alleVisKaffe(): MutableList<Kaffe>
}
