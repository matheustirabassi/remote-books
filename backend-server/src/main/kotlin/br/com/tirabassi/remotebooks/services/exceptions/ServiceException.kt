package br.com.tirabassi.remotebooks.services.exceptions

import java.io.Serializable

class ServiceException(
    message: String
) : RuntimeException(message), Serializable
