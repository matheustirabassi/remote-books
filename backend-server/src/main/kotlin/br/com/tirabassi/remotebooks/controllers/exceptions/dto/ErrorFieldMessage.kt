package br.com.tirabassi.remotebooks.controllers.exceptions.dto

import java.io.Serializable

/**
 * Representa um erro para um campo de um Dto.
 *
 * @property fieldName O nome do campo.
 * @property message A mensagem de erro.
 */
class ErrorFieldMessage(
    val fieldName: String,
    val message: String,
) : Serializable
