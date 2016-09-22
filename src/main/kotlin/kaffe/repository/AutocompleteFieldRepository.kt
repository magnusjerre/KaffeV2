package kaffe.repository

import kaffe.data.AutocompleteField
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query

interface AutocompleteFieldRepository : MongoRepository<AutocompleteField, String> {

    @Query("{_id: ?0}")
    fun getAutocompleteField(navn: String): AutocompleteField?

}
