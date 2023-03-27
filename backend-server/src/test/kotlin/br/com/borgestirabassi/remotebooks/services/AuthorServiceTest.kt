package br.com.borgestirabassi.remotebooks.services

import br.com.borgestirabassi.remotebooks.base.BaseUnitTest
import br.com.borgestirabassi.remotebooks.domain.Author
import br.com.borgestirabassi.remotebooks.dto.AuthorDto
import br.com.borgestirabassi.remotebooks.repositories.AuthorRepository
import br.com.borgestirabassi.remotebooks.services.exceptions.ServiceException
import br.com.borgestirabassi.remotebooks.utils.ErrorMessages
import br.com.borgestirabassi.remotebooks.utils.extensions.parseToDate
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.mockito.ArgumentMatchers.any
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito.`when`

class AuthorServiceTest : BaseUnitTest() {

    @InjectMocks
    private lateinit var authorService: AuthorService

    @Mock
    private lateinit var authorRepository: AuthorRepository

    @Test
    @DisplayName("Dado que o `ìd` da categoria é nulo após salvar, lança um erro de serviço")
    fun insertAuthorTest_CategoryIdIsNull_ServiceException() {
        `when`(authorRepository.saveAndFlush(any()))
            .thenReturn(
                Author(name = "Francisco", dateOfBirth = "2023-03-26".parseToDate()!!),
            )

        val exception = org.junit.jupiter.api.assertThrows<ServiceException> {
            authorService.insertAuthor(
                AuthorDto(
                    name = "Francisco",
                    dateOfBirth = "2023-03-26".parseToDate()!!,
                ),
            )
        }

        assertEquals(ErrorMessages.UNEXPECTED_ERROR, exception.message)
    }
}
