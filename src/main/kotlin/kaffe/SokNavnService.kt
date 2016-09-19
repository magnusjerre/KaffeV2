package kaffe

import kaffe.data.SokNavn
import kaffe.repository.SokNavnRepository
import org.springframework.beans.factory.annotation.Autowired

abstract open class SokNavnService<R: SokNavnRepository<T>, T : SokNavn> {

    @Autowired
    lateinit var repository: R

    fun getById(id: String) : T? {
        return repository.findOne(id)
    }

    fun getMedSokNavn(sokNavn: String) : T? {
        return repository.getMedSokNavn(sokNavn)
    }

    fun getMedSokNavn(sokNavn: Array<String>) : MutableList<T> {
        val output: MutableList<T> = mutableListOf()
        for (navn in sokNavn) {
            val t = getMedSokNavn(navn)
            if (t != null) {
                output.add(t)
            }
        }

        return output
    }

    protected fun insertUtenSokNavnSjekk(obj: T) : T {
        return repository.insert(obj)
    }

    fun insert(sokNavn: T) : T {
        val eksSokNavn = getMedSokNavn(sokNavn.sokNavn())
        if (eksSokNavn != null) {
            return eksSokNavn
        }
        return repository.insert(sokNavn)
    }

    fun getAlle() : MutableList<T> {
        return repository.findAll()
    }

    fun insertNye(sokNavnCollection: MutableList<T>) : MutableList<T> {
        val nyeSokNavn = getNyeSokNavn(sokNavnCollection)
        val output: MutableList<T> = mutableListOf()
        for (nyttsokNavn in nyeSokNavn) {
            output.add(insertUtenSokNavnSjekk(nyttsokNavn))
        }
        return output
    }

    fun getNyeSokNavn(sokNavnCollection: MutableList<T>) : MutableList<T> {
        val soknavnArray = sokNavnCollection.map { s -> s.sokNavn() }.toTypedArray()
        val eksisterendeSokNavn = getMedSokNavn(soknavnArray)
        val nyeSokNavn = sokNavnCollection.filter { s -> !soknavnEksisterer(s, eksisterendeSokNavn) }.toMutableList()
        return nyeSokNavn
    }

    fun soknavnEksisterer(sokNavn: T, sokNavnCollection: Collection<T>) : Boolean {
        for (s in sokNavnCollection) {
            if (s.sokNavn().equals(sokNavn.sokNavn())) {
                return true
            }
        }
        return false
    }

}