package kaffe.service

import kaffe.data.Land
import kaffe.repository.LandRepository
import org.springframework.stereotype.Service

@Service
open class LandService : SokNavnService<LandRepository, Land>()