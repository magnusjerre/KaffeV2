package kaffe.service

import kaffe.data.Bruker
import kaffe.repository.BrukerRepository
import org.springframework.stereotype.Service

@Service
open class BrukerService : SokNavnService<BrukerRepository, Bruker>() {

    fun kvalitetssikreBruker(bruker: Bruker) {
        if (bruker._id == null) {   //Ny bruker, kan ikke kvalitetssikre dette
            return
        }

        val eksBruker = getById(bruker._id as String)
        if (eksBruker != null) {
            bruker.navn = eksBruker.navn
        } else {
            throw RuntimeException("Bruker med id ${bruker._id} finnes ikke, kan derfor ikke kvalitetssikre")
        }
    }

}