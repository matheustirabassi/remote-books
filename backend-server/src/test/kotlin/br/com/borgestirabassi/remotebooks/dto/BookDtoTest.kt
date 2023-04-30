package br.com.borgestirabassi.remotebooks.dto

import br.com.borgestirabassi.remotebooks.utils.ErrorMessages
import jakarta.validation.Validation
import jakarta.validation.Validator
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import java.util.Date

class BookDtoTest {
    private val validator: Validator = Validation.buildDefaultValidatorFactory().validator

    @Test
    @DisplayName("Dado que o nome do livro está vazio, lança uma exceção")
    fun newBookTest_BookTitleIsEmpty_ThrowValidationException() {
        val validateList = validator.validate(BookDto("", "Abacaxi", "Uva", Date(), 1L))
        assertEquals(1, validateList.size)
        assertEquals(ErrorMessages.BOOK_TITLE_REQUIRED, validateList.toList()[0].message)
    }

    @Test
    @DisplayName("Dado que o link da imagem está vazio, lança uma exceção")
    fun newBookTest_ImageLinkIsEmpty_ThrowValidationException() {
        val validateList = validator.validate(BookDto("Título", "sinopse", "", Date(), 1L))
        assertEquals(1, validateList.size)
        assertEquals(ErrorMessages.IMAGE_LINK_REQUIRED, validateList.toList()[0].message)
    }

    @Test
    @DisplayName("Dado que o autor é nulo, lança uma exceção")
    fun newBookTest_AuthorIdIsNull_ThrowValidationException() {
        val validateList = validator.validate(BookDto("Título", "sinopse", "link", Date(), 0L))
        assertEquals(1, validateList.size)
        assertEquals(ErrorMessages.AUTHOR_ID_REQUIRED, validateList.toList()[0].message)
    }

    @Test
    @DisplayName("Dado que o dto é válido, a lista de validações é vazia")
    fun newBookTest_AllValid_ValidatorListIsEmpty() {
        assertTrue(validator.validate(BookDto("Título", "sinopse", "link", Date(), 1L)).isEmpty())
    }
}
