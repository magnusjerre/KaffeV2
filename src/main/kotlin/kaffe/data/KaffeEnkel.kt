package kaffe.data

data class KaffeEnkel(var id: String, var navn: String, var prodNavn: String, var landNavn: String) {
    constructor() : this("default", "default", "default", "default")
}