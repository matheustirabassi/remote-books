package br.com.borgestirabassi.remotebooks.dto

import br.com.borgestirabassi.remotebooks.utils.ErrorMessages
import jakarta.validation.constraints.NotBlank
import java.io.Serializable

/**
 * Dto usado para inserir uma coleção.
 *
 * @property id O identificador da coleção.
 * @property name O nome da coleção.
 */
data class CollectionDto(
    val id: Long? = null,
    @field:NotBlank(message = ErrorMessages.COLLECTION_NAME_REQUIRED)
    val name: String,
) : Serializable
