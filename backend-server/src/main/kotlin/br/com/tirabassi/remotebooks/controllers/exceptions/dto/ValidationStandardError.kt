package br.com.tirabassi.remotebooks.controllers.exceptions.dto

/**
 * Classe que mapeia o erro de validação lançado pelo hibernate.
 *
 * @property statusCode O código de status HTTP.
 * @property message A mensagem de erro.
 * @property timestamp A data que ocorreu o erro.
 * @property errors A lista com os erros
 */
class ValidationStandardError(
    statusCode: Int,
    message: String,
    timestamp: Long,
    val errors: List<ErrorFieldMessage>,
) : StandardError(statusCode, message, timestamp)
