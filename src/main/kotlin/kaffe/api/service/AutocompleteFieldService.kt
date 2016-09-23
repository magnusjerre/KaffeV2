package kaffe.api.service

import kaffe.api.data.AutocompleteField
import kaffe.api.repository.AutocompleteFieldRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
open class AutocompleteFieldService {

    @Autowired
    lateinit var autocompleteRepository: AutocompleteFieldRepository

    val BRUKERE = "brukere"
    val PRODUSENTER = "produsenter"
    val LAND = "land"

    /**
     * Casesensitive insert
     */
    fun insertBruker(bruker: String): String {
        val b = bruker.trim()
        return insertValue(BRUKERE, b)
    }

    /**
     * Casesensitive insert
     */
    fun insertProdusent(produsent: String): String {
        val p = produsent.trim()
        return insertValue(PRODUSENTER, p)
    }

    /**
     * Casesensitive insert
     */
    fun insertLand(land: String): String {
        val l = land.trim()
        return insertValue(LAND, l)
    }

    private fun insertValue(id: String, value: String): String {
        var autocomplete = autocompleteRepository.getAutocompleteField(id)
        if (autocomplete == null) {
            autocomplete = autocompleteRepository.insert(AutocompleteField(id, mutableSetOf(value)))
            return autocomplete.values.elementAt(0)
        } else {
            if (autocomplete.values.add(value)) {
                autocompleteRepository.save(autocomplete)
            }
            return value
        }
    }

    fun getAlleBrukere(): MutableSet<String> {
        return getAlle(BRUKERE)
    }

    fun getAlleLand(): MutableSet<String> {
        return getAlle(LAND)
    }

    fun getAlleProdusenter(): MutableSet<String> {
        return getAlle(PRODUSENTER)
    }

    private fun getAlle(id: String): MutableSet<String> {
        val autocmplete = autocompleteRepository.getAutocompleteField(id)
        if (autocmplete != null) {
            return autocmplete.values
        }
        return mutableSetOf()
    }

}
