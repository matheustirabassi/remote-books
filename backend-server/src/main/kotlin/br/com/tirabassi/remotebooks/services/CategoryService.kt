package br.com.tirabassi.remotebooks.services

import br.com.tirabassi.remotebooks.domain.Category
import br.com.tirabassi.remotebooks.dto.CategoryDto
import br.com.tirabassi.remotebooks.repositories.CategoryRepository
import br.com.tirabassi.remotebooks.services.exceptions.ServiceException
import br.com.tirabassi.remotebooks.utils.ErrorMessages
import jakarta.transaction.Transactional
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class CategoryService {

    @Autowired
    private lateinit var categoryRepository: CategoryRepository

    /**
     * Adiciona uma nova categoria no sistema.
     *
     * @param categoryDto O Dto de categoria.
     *
     * @return O identificador da nova categoria criada.
     */
    @Transactional
    fun insertCategory(categoryDto: CategoryDto): Long {
        verifyIfCategoryNameNotExists(categoryDto)

        val newCategory = Category(name = categoryDto.name)

        categoryRepository.saveAndFlush(newCategory)

        return newCategory.id ?: throw ServiceException(
            ErrorMessages.UNEXPECTED_ERROR,
        )
    }

    /**
     * Verifica se o nome da categoria não existe, caso exista, lança um erro de serviço.
     */
    private fun verifyIfCategoryNameNotExists(categoryDto: CategoryDto) {
        categoryRepository.findByName(categoryDto.name).ifPresent {
            throw ServiceException(
                ErrorMessages.CATEGORY_NAME_ALREADY_EXISTS,
            )
        }
    }

    fun getCategories(): List<CategoryDto> {
        return mapToDto(categoryRepository.findAll())
    }

    private fun mapToDto(categories: List<Category>): List<CategoryDto> {
        return categories.map { category -> CategoryDto(id = category.id, name = category.name) }
    }
}
