package kaffe.repository

import kaffe.data.Kaffetype
import org.springframework.data.mongodb.repository.MongoRepository

interface KaffetypeRepository : SokNavnRepository<Kaffetype>