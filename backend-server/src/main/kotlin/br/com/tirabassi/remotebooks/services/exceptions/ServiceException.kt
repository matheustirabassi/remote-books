package br.com.tirabassi.remotebooks.services.exceptions

import java.io.Serializable

class ServiceException(
    message: String,
    val httpStatusCode: Int? = null
) : RuntimeException(message), Serializable
