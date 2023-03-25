package br.com.borgestirabassi.remotebooks.services

import br.com.borgestirabassi.remotebooks.domain.Collection
import br.com.borgestirabassi.remotebooks.dto.CollectionDto
import br.com.borgestirabassi.remotebooks.repositories.CollectionRepository
import br.com.borgestirabassi.remotebooks.services.exceptions.ServiceException
import br.com.borgestirabassi.remotebooks.utils.ErrorMessages
import jakarta.transaction.Transactional
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class CollectionService {

    @Autowired
    private lateinit var collectionService: CollectionRepository

    /**
     * Adiciona uma nova categoria no sistema.
     *
     * @param collectionDto O Dto de categoria.
     *
     * @return O identificador da nova categoria criada.
     */
    @Transactional
    fun insertCollection(collectionDto: CollectionDto): Long {
        verifyIfCategoryNameNotExists(collectionDto)

        val newCollection = Collection(name = collectionDto.name)

        collectionService.saveAndFlush(newCollection)

        return newCollection.id ?: throw ServiceException(
            ErrorMessages.UNEXPECTED_ERROR,
        )
    }

    /**
     * Verifica se o nome da categoria não existe, caso exista, lança um erro de serviço.
     */
    private fun verifyIfCategoryNameNotExists(collectionDto: CollectionDto) {
        collectionService.findByName(collectionDto.name).ifPresent {
            throw ServiceException(
                ErrorMessages.COLLECTION_NAME_ALREADY_EXISTS,
            )
        }
    }
}
