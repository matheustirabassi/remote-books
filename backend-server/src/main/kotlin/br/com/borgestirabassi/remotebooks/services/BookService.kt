package br.com.borgestirabassi.remotebooks.services

import br.com.borgestirabassi.remotebooks.domain.Book
import br.com.borgestirabassi.remotebooks.dto.BookDto
import br.com.borgestirabassi.remotebooks.repositories.BookRepository
import br.com.borgestirabassi.remotebooks.services.exceptions.ServiceException
import br.com.borgestirabassi.remotebooks.utils.ErrorMessages
import jakarta.transaction.Transactional
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.Date

@Service
class BookService {

    @Autowired
    private lateinit var bookRepository: BookRepository

    /**
     * Adiciona um novo livro no sistema.
     *
     * @param bookDto O Dto do livro.
     *
     * @return O identificador do novo livro criado.
     */
    @Transactional
    fun insertBook(bookDto: BookDto): Long {
        val newBook = createBook(bookDto)

        bookRepository.saveAndFlush(newBook)

        return newBook.id ?: throw ServiceException(
            ErrorMessages.UNEXPECTED_ERROR,
        )
    }

    private fun createBook(bookDto: BookDto) = Book(
        title = bookDto.title,
        sinopse = bookDto.sinopse,
        imageLink = bookDto.imageLink,
        releaseDate = bookDto.releaseDate,
        registrationDate = Date(),
    )
}
