package br.com.borgestirabassi.remotebooks.dto

import br.com.borgestirabassi.remotebooks.utils.ErrorMessages
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import java.io.Serializable
import java.util.Date

/**
 * Dto usado para inserir um novo autor.
 *
 * @property name O nome do autor.
 * @property dateOfBirth A data de nascimento.
 */
data class AuthorDto(
    @field:NotBlank(message = ErrorMessages.AUTHOR_NAME_REQUIRED)
    val name: String,
    @field:NotNull(message = ErrorMessages.AUTHOR_DATE_OF_BIRTH_REQUIRED)
    val dateOfBirth: Date,
) : Serializable
