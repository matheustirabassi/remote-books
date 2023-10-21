package br.com.tirabassi.remotebooks.services

import br.com.tirabassi.remotebooks.base.BaseUnitTest
import br.com.tirabassi.remotebooks.domain.Author
import br.com.tirabassi.remotebooks.dto.AuthorDto
import br.com.tirabassi.remotebooks.repositories.AuthorRepository
import br.com.tirabassi.remotebooks.services.exceptions.ServiceException
import br.com.tirabassi.remotebooks.utils.ErrorMessages
import br.com.tirabassi.remotebooks.utils.extensions.parseToDate
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
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
    @DisplayName("Dado que o autor é salvo, quando o `ìd` é nulo, então lança um erro de serviço")
    fun insertAuthorTest_CategoryIdIsNull_ServiceException() {
        `when`(authorRepository.saveAndFlush(any()))
            .thenReturn(
                Author(name = "Francisco", dateOfBirth = "2023-03-26".parseToDate()!!),
            )

        val exception = assertThrows<ServiceException> {
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
