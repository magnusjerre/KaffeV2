package kaffe

import kaffe.data.Bruker
import kaffe.repository.BrukerRepository
import org.springframework.stereotype.Service

@Service
open class BrukerService : SokNavnService<BrukerRepository, Bruker>()