package br.com.borgestirabassi.remotebooks.controllers.exceptions.dto

import java.io.Serializable

/**
 * A estrutura padrão para erros do sistema.
 *
 * @property statusCode O código de status HTTP.
 * @property message A mensagem de erro.
 * @property timestamp A data que aconteceu o erro.
 */
open class StandardError(
    val statusCode: Int,
    val message: String,
    val timestamp: Long,
) : Serializable
