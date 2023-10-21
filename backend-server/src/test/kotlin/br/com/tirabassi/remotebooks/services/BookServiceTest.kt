package br.com.tirabassi.remotebooks.services

import br.com.tirabassi.remotebooks.base.BaseUnitTest
import br.com.tirabassi.remotebooks.domain.Author
import br.com.tirabassi.remotebooks.domain.Book
import br.com.tirabassi.remotebooks.domain.Category
import br.com.tirabassi.remotebooks.domain.Collection
import br.com.tirabassi.remotebooks.dto.BookDto
import br.com.tirabassi.remotebooks.repositories.AuthorRepository
import br.com.tirabassi.remotebooks.repositories.BookRepository
import br.com.tirabassi.remotebooks.services.exceptions.ServiceException
import br.com.tirabassi.remotebooks.utils.ErrorMessages
import br.com.tirabassi.remotebooks.utils.extensions.parseToDate
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
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

    private lateinit var bookDto: BookDto

    @BeforeEach
    fun setUp() {
        bookDto = BookDto(
            title = "",
            sinopse = null,
            imageLink = "",
            accessLink = "",
            releaseDate = Date(),
            1L
        )
    }

    // region insertBook tests

    @Test
    @DisplayName("Dado que o livro foi criado, quando é salvo, então retorna o novo id desse novo livro criado")
    fun insertBookTest_BookCreated_ReturnNewIdFromThisBookCreated() {
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
                books = emptyList()
            )
        )

        val currentBookId = service.insertBook(bookDto)

        val expectedBookId = 1L
        assertEquals(
            expectedBookId,
            currentBookId
        )
    }

    @Test
    @DisplayName(
        "Dado que o livro não foi criado, quando o identificador do livro é nulo, então lança um erro " +
            "inesperado"
    )
    fun insertBookTest_BookDoNotCreated_ServiceException() {
        `when`(authorRepository.getReferenceById(anyLong())).thenReturn(
            Author(
                id = 1L,
                name = "Roman Cook",
                dateOfBirth = Date(),
                books = emptyList()
            )
        )

        val exception = assertThrows<ServiceException> {
            service.insertBook(bookDto)
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
            accessLink = "",
            registrationDate = "2020-06-14".parseToDate()!!,
            releaseDate = "2020-06-14".parseToDate()!!,
            author = Author(
                id = 1L,
                name = "Marsha Blair",
                dateOfBirth = "2020-06-14".parseToDate()!!,
                books = listOf()
            ),
            category = Category(1L, name = "", books = listOf()),
            collection = Collection(
                id = null,
                name = "Kennith Dunlap",
                books = listOf()
            )
        )

        `when`(bookRepository.findAll(any(Pageable::class.java))).thenReturn(PageImpl(listOf(book)))

        assertEquals(BookDto(book), service.findAllBooks(Pageable.unpaged()).first())
    }

    // endregion
}
