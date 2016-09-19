package kaffe

import kaffe.data.Land
import kaffe.repository.LandRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
open class LandService : SokNavnService<LandRepository, Land>()