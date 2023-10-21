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
import java.util.Date
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service

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
    @Transactional
    fun insertBook(bookDto: BookDto): Long {
        val newBook = createBook(bookDto)

        saveCategory(newBook, bookDto.categoryId)

        saveCollection(newBook, bookDto.collectionId)

        bookRepository.saveAndFlush(newBook)

        if (newBook.id == null) {
            throw ServiceException(ErrorMessages.UNEXPECTED_ERROR)
        }

        return newBook.id!!
    }

    private fun createBook(bookDto: BookDto): Book {
        val selectedAuthor = authorRepository.getReferenceById(bookDto.authorId!!)
        return Book(
            title = bookDto.title,
            sinopse = bookDto.sinopse,
            imageLink = bookDto.imageLink,
            releaseDate = bookDto.releaseDate,
            registrationDate = Date(),
            author = selectedAuthor,
        )
    }

    private fun saveCategory(
        newBook: Book,
        selectedCategoryId: Long?,
    ) {
        if (selectedCategoryId == null) {
            log.warn("Não foi possível salvar a categoria com o livro: $newBook")

            return
        }

        val categorySelected = categoryRepository.getReferenceById(selectedCategoryId)
        newBook.category = categorySelected
    }

    private fun saveCollection(
        newBook: Book,
        selectedCollectionId: Long?,
    ) {
        if (selectedCollectionId == null) {
            log.warn("Não foi possível salvar a coleção com o livro: $newBook")

            return
        }

        val collectionSelected = collectionRepository.getReferenceById(selectedCollectionId)
        newBook.collection = collectionSelected
    }

    /** Busca os livros de forma paginada e mapeia para BookDto */
    fun findAllBooks(pageable: Pageable): Page<BookDto> {
        return bookRepository.findAll(pageable).map { BookDto(it) }
    }
}
