package kaffe.repository

import kaffe.data.Kaffe
import org.springframework.data.mongodb.repository.MongoRepository

interface KaffeRepository : SokNavnRepository<Kaffe>
