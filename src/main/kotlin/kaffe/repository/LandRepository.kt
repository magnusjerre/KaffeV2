package kaffe.repository

import kaffe.data.Land
import org.springframework.data.mongodb.repository.MongoRepository

interface LandRepository : MongoRepository<Land, String>