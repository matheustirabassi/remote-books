package br.com.borgestirabassi.remotebooks.services

import br.com.borgestirabassi.remotebooks.base.BaseUnitTest
import br.com.borgestirabassi.remotebooks.domain.Author
import br.com.borgestirabassi.remotebooks.domain.Book
import br.com.borgestirabassi.remotebooks.dto.BookDto
import br.com.borgestirabassi.remotebooks.repositories.AuthorRepository
import br.com.borgestirabassi.remotebooks.repositories.BookRepository
import br.com.borgestirabassi.remotebooks.services.exceptions.ServiceException
import br.com.borgestirabassi.remotebooks.utils.ErrorMessages
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.mockito.ArgumentMatchers.any
import org.mockito.ArgumentMatchers.anyLong
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito.`when`
import java.util.Date

class BookServiceTest : BaseUnitTest() {

    @InjectMocks
    private lateinit var service: BookService

    @Mock
    private lateinit var bookRepository: BookRepository

    @Mock
    private lateinit var authorRepository: AuthorRepository

    // region insertBook tests

    @Test
    @DisplayName("Dado que o livro foi criado, retorna o novo id")
    fun insertBookTest_BookCreated_ReturnNewId() {
        `when`(bookRepository.saveAndFlush(any(Book::class.java))).thenAnswer {
            val book = it.getArgument<Book>(0)
            book.id = 1L

            book
        }

        `when`(authorRepository.getReferenceById(anyLong())).thenReturn(
            Author(
                id = 1L,
                name = "Roman Cook",
                dateOfBirth = Date(),
                books = emptyList(),
            ),
        )

        assertEquals(
            1L,
            service.insertBook(
                BookDto(
                    title = "",
                    sinopse = null,
                    imageLink = "",
                    releaseDate = Date(),
                    1L,
                ),
            ),
        )
    }

    @Test
    @DisplayName("Dado que o livro não foi criado, lança uma exceção de serviço")
    fun insertBookTest_BookDoNotCreated_ServiceException() {
        `when`(authorRepository.getReferenceById(anyLong())).thenReturn(
            Author(
                id = 1L,
                name = "Roman Cook",
                dateOfBirth = Date(),
                books = emptyList(),
            ),
        )

        val exception = assertThrows<ServiceException> {
            service.insertBook(
                BookDto(
                    title = "",
                    sinopse = null,
                    imageLink = "",
                    releaseDate = Date(),
                    authorId = 1L,
                ),
            )
        }

        assertEquals(ErrorMessages.UNEXPECTED_ERROR, exception.message)
    }

    // endregion
}