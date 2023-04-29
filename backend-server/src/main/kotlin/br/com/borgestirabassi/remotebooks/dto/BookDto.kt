package br.com.borgestirabassi.remotebooks.dto

import br.com.borgestirabassi.remotebooks.utils.ErrorMessages
import jakarta.validation.constraints.NotBlank
import java.io.Serializable
import java.util.Date

/**
 * Dto usado para inserir um novo livro.
 *
 * @property title O nome do livro.
 * @property sinopse O resumo do livro.
 * @property imageLink O link da imagem do livro.
 * @property releaseDate A data de lançamento do livro.
 */
data class BookDto(
    @field:NotBlank(message = ErrorMessages.BOOK_TITLE_REQUIRED)
    val title: String,
    val sinopse: String?,
    @field:NotBlank(message = ErrorMessages.BOOK_IMAGE_LINK_REQUIRED)
    val imageLink: String,
    val releaseDate: Date,
) : Serializable
