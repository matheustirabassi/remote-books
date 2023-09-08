package br.com.borgestirabassi.remotebooks.services

import br.com.borgestirabassi.remotebooks.domain.Book
import br.com.borgestirabassi.remotebooks.dto.BookDto
import br.com.borgestirabassi.remotebooks.repositories.AuthorRepository
import br.com.borgestirabassi.remotebooks.repositories.BookRepository
import br.com.borgestirabassi.remotebooks.repositories.CategoryRepository
import br.com.borgestirabassi.remotebooks.repositories.CollectionRepository
import br.com.borgestirabassi.remotebooks.services.exceptions.ServiceException
import br.com.borgestirabassi.remotebooks.utils.ErrorMessages
import jakarta.transaction.Transactional
import java.util.Date
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class BookService {

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

        if (null == newBook.id) {
            throw ServiceException(ErrorMessages.UNEXPECTED_ERROR)
        }

        return newBook.id!!
    }

    private fun createBook(bookDto: BookDto) = Book(
        title = bookDto.title,
        sinopse = bookDto.sinopse,
        imageLink = bookDto.imageLink,
        releaseDate = bookDto.releaseDate,
        registrationDate = Date(),
        author = authorRepository.getReferenceById(bookDto.authorId!!),
    )

    private fun saveCategory(
        newBook: Book,
        categoryId: Long?,
    ) {
        if (categoryId == null) {
            return
        }

        newBook.category = categoryRepository.getReferenceById(categoryId)
    }

    private fun saveCollection(
        newBook: Book,
        collectionId: Long?,
    ) {
        if (collectionId == null) {
            return
        }

        newBook.collection = collectionRepository.getReferenceById(collectionId)
    }

}
