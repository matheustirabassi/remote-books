package br.com.borgestirabassi.remotebooks.services

import br.com.borgestirabassi.remotebooks.base.BaseUnitTest
import br.com.borgestirabassi.remotebooks.domain.Author
import br.com.borgestirabassi.remotebooks.domain.Book
import br.com.borgestirabassi.remotebooks.domain.Category
import br.com.borgestirabassi.remotebooks.domain.Collection
import br.com.borgestirabassi.remotebooks.dto.BookDto
import br.com.borgestirabassi.remotebooks.repositories.AuthorRepository
import br.com.borgestirabassi.remotebooks.repositories.BookRepository
import br.com.borgestirabassi.remotebooks.services.exceptions.ServiceException
import br.com.borgestirabassi.remotebooks.utils.ErrorMessages
import br.com.borgestirabassi.remotebooks.utils.extensions.parseToDate
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.mockito.ArgumentMatchers.any
import org.mockito.ArgumentMatchers.anyLong
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito.`when`
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.Pageable
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

    // region findAllBooks tests

    @Test
    @DisplayName("Dado que há um livro, retorna esse livro")
    fun findAllBooksTest_HasABook_ReturnThisBook() {
        val book = Book(
            id = 1L,
            title = "aliquip",
            sinopse = null,
            imageLink = "deterruisset",
            registrationDate = "2020-06-14".parseToDate()!!,
            releaseDate = "2020-06-14".parseToDate()!!,
            author = Author(
                id = 1L,
                name = "Marsha Blair",
                dateOfBirth = "2020-06-14".parseToDate()!!,
                books = listOf(),
            ),
            category = Category(1L, name = "", books = listOf()),
            collection = Collection(
                id = null,
                name = "Kennith Dunlap",
                books = listOf(),
            ),
        )

        `when`(bookRepository.findAll(any(Pageable::class.java))).thenReturn(PageImpl(listOf(book)))

        assertEquals(BookDto(book), service.findAllBooks(Pageable.unpaged()).first())
    }

    // endregion
}
