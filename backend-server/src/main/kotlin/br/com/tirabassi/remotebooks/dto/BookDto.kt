package br.com.tirabassi.remotebooks.dto

import br.com.tirabassi.remotebooks.domain.Book
import br.com.tirabassi.remotebooks.utils.ErrorMessages
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import java.io.Serializable
import java.util.Date

/**
 * Dto usado para inserir um novo livro.
 *
 * @property title O nome do livro.
 * @property sinopse O resumo do livro.
 * @property imageLink O link da imagem do livro.
 * @property releaseDate A data de lançamento do livro.
 * @property authorId O identificador do autor.
 * @property categoryId O id da categoria.
 * @property collectionId O identificador da coleção.
 */
data class BookDto(
    @field:NotBlank(message = ErrorMessages.BOOK_TITLE_REQUIRED)
    val title: String,
    val sinopse: String?,
    @field:NotBlank(message = ErrorMessages.IMAGE_LINK_REQUIRED)
    val imageLink: String,
    val releaseDate: Date,
    @field:NotNull(message = ErrorMessages.AUTHOR_ID_REQUIRED)
    val authorId: Long?,
    val id: Long? = null,
    val authorName: String? = null,
    val categoryId: Long? = null,
    val collectionId: Long? = null
) : Serializable {
    constructor(book: Book) : this(
        id = book.id,
        authorName = book.author.name,
        title = book.title,
        sinopse = book.sinopse,
        imageLink = book.imageLink,
        releaseDate = book.releaseDate,
        authorId = book.author.id!!,
        categoryId = book.category?.id,
        collectionId = book.collection?.id
    )
}
