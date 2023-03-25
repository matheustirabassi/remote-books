package br.com.borgestirabassi.remotebooks.services.exceptions

import java.io.Serializable

class ServiceException(
    message: String,
) : RuntimeException(message), Serializable
