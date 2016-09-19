package kaffe

import kaffe.data.Produsent
import kaffe.repository.ProdusentRepository
import org.springframework.stereotype.Service

@Service
open class ProdusentService : SokNavnService<ProdusentRepository, Produsent>()