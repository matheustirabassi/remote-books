package br.com.tirabassi.remotebooks.dto

import br.com.tirabassi.remotebooks.utils.ErrorMessages
import jakarta.validation.constraints.NotBlank
import java.io.Serializable

/**
 * Dto usado para inserir uma categoria.
 *
 * @property id O identificador da categoria.
 * @property name O nome da categoria
 */
data class CategoryDto(
    val id: Long? = null,
    @field:NotBlank(message = ErrorMessages.CATEGORY_NAME_REQUIRED)
    val name: String
) : Serializable
