package br.com.borgestirabassi.remotebooks.dto

import br.com.borgestirabassi.remotebooks.utils.ErrorMessages
import jakarta.validation.Validation
import jakarta.validation.Validator
import java.util.Date
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test

class BookDtoTest {
    private val validator: Validator = Validation.buildDefaultValidatorFactory().validator

    @Test
    @DisplayName("Dado que o nome do livro está vazio, quando o dto é válidado, então lança uma exceção")
    fun newBookTest_BookTitleIsEmpty_ThrowValidationException() {
        val bookDto = BookDto("", "Abacaxi", "Uva", Date(), 1L)

        val validateList = validator.validate(bookDto)

        assertEquals(1, validateList.size)
        assertEquals(ErrorMessages.BOOK_TITLE_REQUIRED, validateList.toList()[0].message)
    }

    @Test
    @DisplayName("Dado que o link da imagem está vazio, quando o dto é válido, então lança uma exceção")
    fun newBookTest_ImageLinkIsEmpty_ThrowValidationException() {
        val bookDto = BookDto("Título", "sinopse", "", Date(), 1L)
        val validateList = validator.validate(bookDto)

        assertEquals(1, validateList.size)
        assertEquals(ErrorMessages.IMAGE_LINK_REQUIRED, validateList.toList()[0].message)
    }

    @Test
    @DisplayName("Dado que o autor é nulo, quando o dto é validado, então lança uma exceção")
    fun newBookTest_AuthorIdIsNull_ThrowValidationException() {
        val bookDto = BookDto("Título", "sinopse", "link", Date(), null)

        val validateList = validator.validate(bookDto)

        assertEquals(1, validateList.size)
        assertEquals(ErrorMessages.AUTHOR_ID_REQUIRED, validateList.toList()[0].message)
    }

    @Test
    @DisplayName("Dado que o dto é válido, quando o dto é validado, então a lista de validações é vazia")
    fun newBookTest_AllValid_ValidatorListIsEmpty() {
        val bookDto = BookDto("Título", "sinopse", "link", Date(), 1L)

        assertTrue(validator.validate(bookDto).isEmpty())
    }
}
