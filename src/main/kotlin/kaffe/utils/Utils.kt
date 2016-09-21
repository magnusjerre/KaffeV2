package kaffe.utils

import kaffe.data.Kaffe

fun sokbarString(s: String) : String {
    return s.trim().toLowerCase()
}

fun erSammeBruker(bruker1: String, bruker2: String): Boolean {
    return sokbarString(bruker1).equals(sokbarString(bruker2))
}