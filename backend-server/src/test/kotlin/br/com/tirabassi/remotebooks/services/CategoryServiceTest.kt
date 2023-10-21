package br.com.tirabassi.remotebooks.services

import br.com.tirabassi.remotebooks.base.BaseUnitTest
import br.com.tirabassi.remotebooks.domain.Category
import br.com.tirabassi.remotebooks.dto.CategoryDto
import br.com.tirabassi.remotebooks.repositories.CategoryRepository
import br.com.tirabassi.remotebooks.services.exceptions.ServiceException
import br.com.tirabassi.remotebooks.utils.ErrorMessages
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.mockito.ArgumentMatchers.any
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito.anyString
import org.mockito.Mockito.`when`
import java.util.Optional

class CategoryServiceTest : BaseUnitTest() {

    @InjectMocks
    private lateinit var categoryService: CategoryService

    @Mock
    private lateinit var categoryRepository: CategoryRepository

    @Test
    @DisplayName("Dado que o nome da categoria já existe, lança um erro de serviço")
    fun insertCategoryTest_CategoryNameAlreadyExists_ServiceException() {
        `when`(categoryRepository.findByName(anyString())).thenReturn(
            Optional.of(Category(name = "Romance"))
        )

        val exception = assertThrows<ServiceException> {
            categoryService.insertCategory(CategoryDto(name = "Romance"))
        }

        assertEquals(ErrorMessages.CATEGORY_NAME_ALREADY_EXISTS, exception.message)
    }

    @Test
    @DisplayName("Dado que o `ìd` da categoria é nulo após salvar, lança um erro de serviço")
    fun insertCategoryTest_CategoryIdIsNull_ServiceException() {
        `when`(categoryRepository.saveAndFlush(any(Category::class.java))).thenReturn(
            Category(name = "Romance")
        )

        val exception = assertThrows<ServiceException> {
            categoryService.insertCategory(CategoryDto(name = "Romance"))
        }

        assertEquals(ErrorMessages.UNEXPECTED_ERROR, exception.message)
    }
}
