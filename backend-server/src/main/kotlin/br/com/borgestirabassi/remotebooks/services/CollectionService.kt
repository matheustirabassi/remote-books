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
    private lateinit var collectionRepository: CollectionRepository

    /**
     * Adiciona uma nova coleção no sistema.
     *
     * @param collectionDto O Dto da coleção.
     *
     * @return O identificador com a nova coleção criada.
     */
    @Transactional
    fun insertCollection(collectionDto: CollectionDto): Long {
        verifyIfCategoryNameNotExists(collectionDto)

        val newCollection = Collection(name = collectionDto.name)

        collectionRepository.saveAndFlush(newCollection)

        return newCollection.id ?: throw ServiceException(
            ErrorMessages.UNEXPECTED_ERROR,
        )
    }

    /**
     * Verifica se o nome da coleção não existe, caso exista, lança um erro de serviço.
     */
    private fun verifyIfCategoryNameNotExists(collectionDto: CollectionDto) {
        collectionRepository.findByName(collectionDto.name).ifPresent {
            throw ServiceException(
                ErrorMessages.COLLECTION_NAME_ALREADY_EXISTS,
            )
        }
    }

    fun getCollections(): List<CollectionDto> {
        return mapToDto(collectionRepository.findAll())
    }

    private fun mapToDto(collections: List<Collection>): List<CollectionDto> {
        return collections.map { collection ->
            CollectionDto(
                id = collection.id,
                name = collection.name,
            )
        }
    }
}
