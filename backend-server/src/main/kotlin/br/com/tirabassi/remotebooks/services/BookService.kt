package br.com.tirabassi.remotebooks.services

import br.com.tirabassi.remotebooks.domain.Book
import br.com.tirabassi.remotebooks.dto.BookDto
import br.com.tirabassi.remotebooks.repositories.AuthorRepository
import br.com.tirabassi.remotebooks.repositories.BookRepository
import br.com.tirabassi.remotebooks.repositories.CategoryRepository
import br.com.tirabassi.remotebooks.repositories.CollectionRepository
import br.com.tirabassi.remotebooks.services.exceptions.ServiceException
import br.com.tirabassi.remotebooks.utils.ErrorMessages
import jakarta.transaction.Transactional
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import java.util.Date

@Service
class BookService {

    private val log: Logger = LoggerFactory.getLogger(BookService::class.java)

    @Autowired
    private lateinit var bookRepository: BookRepository

    @Autowired
    private lateinit var authorRepository: AuthorRepository

    @Autowired
    private lateinit var categoryRepository: CategoryRepository

    @Autowired
    private lateinit var collectionRepository: CollectionRepository

    /**
     * Adiciona um novo livro no sistema.
     *
     * @param bookDto O Dto do livro.
     *
     * @return O identificador do novo livro criado.
     */
    @Transactional(rollbackOn = [ServiceException::class, RuntimeException::class])
    fun insertBook(bookDto: BookDto): Long {
        val selectedAuthor = authorRepository.getReferenceById(bookDto.authorId!!)
        val newBook = Book(
            title = bookDto.title,
            sinopse = bookDto.sinopse,
            imageLink = bookDto.imageLink,
            accessLink = bookDto.accessLink,
            releaseDate = bookDto.releaseDate,
            registrationDate = Date(),
            author = selectedAuthor
        )

        if (isCategorySelected(bookDto.categoryId)) {
            val categorySelected = categoryRepository.getReferenceById(bookDto.categoryId!!)
            newBook.category = categorySelected
        }

        if (isCollectionSelected(bookDto.collectionId)) {
            val collectionSelected = collectionRepository.getReferenceById(bookDto.collectionId!!)
            newBook.collection = collectionSelected
        }

        bookRepository.saveAndFlush(newBook)

        if (newBook.id == null) {
            throw ServiceException(ErrorMessages.UNEXPECTED_ERROR)
        }

        return newBook.id!!
    }

    private fun isCategorySelected(categoryId: Long?) = categoryId != null

    private fun isCollectionSelected(collectionId: Long?) = collectionId != null

    /** Busca os livros de forma paginada e mapeia para BookDto */
    fun findAllBooks(pageable: Pageable): Page<BookDto> {
        return bookRepository.findAll(pageable).map { BookDto(it) }
    }
}
