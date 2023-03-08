package br.com.borgestirabassi.remotebooks.dto

import br.com.borgestirabassi.remotebooks.utils.ErrorMessages
import jakarta.validation.constraints.NotBlank
import java.io.Serializable

/**
 * Dto usado para inserir uma categoria.
 *
 * @property name O nome da categoria
 */
data class CategoryDto(
    @field:NotBlank(message = ErrorMessages.CATEGORY_NAME_REQUIRED)
    val name: String,
) : Serializable
