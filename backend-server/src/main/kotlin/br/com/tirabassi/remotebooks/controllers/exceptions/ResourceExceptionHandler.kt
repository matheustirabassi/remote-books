package br.com.tirabassi.remotebooks.controllers.exceptions

import br.com.tirabassi.remotebooks.controllers.exceptions.dto.ErrorFieldMessage
import br.com.tirabassi.remotebooks.controllers.exceptions.dto.StandardError
import br.com.tirabassi.remotebooks.controllers.exceptions.dto.ValidationStandardError
import br.com.tirabassi.remotebooks.services.exceptions.ServiceException
import jakarta.servlet.http.HttpServletRequest
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler

/**
 * Gerencia erros lançados nos endpoints.
 */
@ControllerAdvice
class ResourceExceptionHandler {
    companion object {
        /** Mensagem padrão para erro de validação. */
        private const val VALIDATION_ERROR = "VALIDATION_ERROR"
    }

    /**
     * Manipula as exceções lançadas pelo Hibernate Validation à requisição com o erro.
     */
    @ExceptionHandler(MethodArgumentNotValidException::class)
    fun handleValidationException(
        exception: MethodArgumentNotValidException,
        request: HttpServletRequest?
    ): ResponseEntity<StandardError> {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
            ValidationStandardError(
                HttpStatus.BAD_REQUEST.value(),
                VALIDATION_ERROR,
                System.currentTimeMillis(),
                mapArgumentNotValidExceptionToFieldMessage(exception)
            )
        )
    }

    /**
     * Mapeia a exceção lançada pelo Hibernate Validation para o dto de mensagem de erro.
     *
     * @exception validException O erro de validação
     * @return A lista contendo o nome do campo e o erro, caso ele seja inválido.
     */
    private fun mapArgumentNotValidExceptionToFieldMessage(
        validException: MethodArgumentNotValidException
    ) =
        validException.bindingResult.fieldErrors.map { error ->
            ErrorFieldMessage(error.field, error.defaultMessage.toString())
        }

    @ExceptionHandler(ServiceException::class)
    fun handleServiceException(
        serviceException: ServiceException,
        request: HttpServletRequest?
    ): ResponseEntity<StandardError> {
        val httpStatus = HttpStatus.valueOf(serviceException.httpStatusCode ?: HttpStatus.BAD_REQUEST.value())

        return ResponseEntity.status(httpStatus).body(
            StandardError(
                httpStatus.value(),
                serviceException.message!!,
                System.currentTimeMillis()
            )
        )
    }
}
