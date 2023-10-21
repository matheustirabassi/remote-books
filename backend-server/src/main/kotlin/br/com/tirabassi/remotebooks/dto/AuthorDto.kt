package br.com.tirabassi.remotebooks.dto

import br.com.tirabassi.remotebooks.utils.ErrorMessages
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import java.io.Serializable
import java.util.Date

/**
 * Dto usado para inserir um novo autor.
 *
 * @property id O identificador do autor.
 * @property name O nome do autor.
 * @property dateOfBirth A data de nascimento.
 */
data class AuthorDto(
    val id: Long? = null,
    @field:NotBlank(message = ErrorMessages.AUTHOR_NAME_REQUIRED)
    val name: String,
    @field:NotNull(message = ErrorMessages.AUTHOR_DATE_OF_BIRTH_REQUIRED)
    val dateOfBirth: Date? = null,
) : Serializable
