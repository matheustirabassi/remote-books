package br.com.tirabassi.remotebooks.controllers.exceptions

import br.com.tirabassi.remotebooks.services.exceptions.ServiceException
import br.com.tirabassi.remotebooks.utils.ErrorMessages
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.springframework.http.HttpStatus

class ResourceExceptionHandlerTest {

    val resourceExceptionHandler: ResourceExceptionHandler = ResourceExceptionHandler()

    // region handleServiceException
    @Test
    @DisplayName(
        "Dado que a exceção tem mensagem mas o código de erro é nulo, quando verifica se o código HTTP é diferente de nulo, retorna objeto que contém mensagem e status HTTP BAD_REQUESST"
    )
    fun handleServiceExceptionTest_HasMessageAndHttpStatusIsNull_CreateStandardErrorWithMessageAndBadRequest() {
        val dto =
            resourceExceptionHandler.handleServiceException(ServiceException(ErrorMessages.UNEXPECTED_ERROR), null)

        assertEquals(ErrorMessages.UNEXPECTED_ERROR, dto.body!!.message)
        assertEquals(400, dto.body!!.statusCode)
    }

    @Test
    @DisplayName(
        "Dado que a exceção tem mensagem mas o código de erro é nulo,quando verifica se o código HTTP é diferente de nulo, cria" +
            "o status http retornado é 400"
    )
    fun handleServiceExceptionTest_HasMessageAndHttpStatusIsNull_HttpStatusReturnedIs400() {
        val dto =
            resourceExceptionHandler.handleServiceException(ServiceException(ErrorMessages.UNEXPECTED_ERROR), null)

        assertEquals(HttpStatus.BAD_REQUEST, dto.statusCode)
    }

    @Test
    @DisplayName(
        "Dado que a exceção tem mensagem mas o código de erro é nulo, quando verifica se o código existe, cria" +
            "o objeto de código padrão com mensagem e status not found"
    )
    fun handleServiceExceptionTest_HasMessageAndHttpStatusIs404_CreateStandardErrorWithMessageAndBadRequest() {
        val dto = resourceExceptionHandler.handleServiceException(
            ServiceException(
                ErrorMessages.NOT_FOUND,
                HttpStatus.NOT_FOUND.value()
            ),
            null
        )

        assertEquals(ErrorMessages.NOT_FOUND, dto.body!!.message)
        assertEquals(404, dto.body!!.statusCode)
    }

    @Test
    @DisplayName(
        "Dado que a exceção tem mensagem mas o código de erro é nulo, quando verifica se o código existe, cria" +
            "o status http retornado é 404"
    )
    fun handleServiceExceptionTest_HasMessageAndHttpStatusIs404_HttpStatusReturnedIs400() {
        val dto = resourceExceptionHandler.handleServiceException(
            ServiceException(
                ErrorMessages.NOT_FOUND,
                HttpStatus.NOT_FOUND.value()
            ),
            null
        )

        assertEquals(HttpStatus.NOT_FOUND, dto.statusCode)
    }

    // endregion
}
