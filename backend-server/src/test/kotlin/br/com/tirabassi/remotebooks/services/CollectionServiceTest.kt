package br.com.tirabassi.remotebooks.services

import br.com.tirabassi.remotebooks.base.BaseUnitTest
import br.com.tirabassi.remotebooks.domain.Collection
import br.com.tirabassi.remotebooks.dto.CollectionDto
import br.com.tirabassi.remotebooks.repositories.CollectionRepository
import br.com.tirabassi.remotebooks.services.exceptions.ServiceException
import br.com.tirabassi.remotebooks.utils.ErrorMessages
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.mockito.ArgumentMatchers
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito
import java.util.Optional

class CollectionServiceTest : BaseUnitTest() {

    @InjectMocks
    private lateinit var collectionService: CollectionService

    @Mock
    private lateinit var collectionRepository: CollectionRepository

    @Test
    @DisplayName("Dado que o nome da coleção já existe, lança um erro de serviço")
    fun insertCollectionTest_CollectionNameAlreadyExists_ServiceException() {
        Mockito.`when`(collectionRepository.findByName(Mockito.anyString())).thenReturn(
            Optional.of(Collection(name = "Coleção"))
        )

        val exception = org.junit.jupiter.api.assertThrows<ServiceException> {
            collectionService.insertCollection(CollectionDto(name = "Coleção"))
        }

        assertEquals(ErrorMessages.COLLECTION_NAME_ALREADY_EXISTS, exception.message)
    }

    @Test
    @DisplayName("Dado que o `ìd` da coleção é nulo após salvar, lança um erro de serviço")
    fun insertCollectionTest_CollectionIdIsNull_ServiceException() {
        Mockito.`when`(collectionRepository.saveAndFlush(ArgumentMatchers.any(Collection::class.java)))
            .thenReturn(
                Collection(name = "Coleção")
            )

        val exception = org.junit.jupiter.api.assertThrows<ServiceException> {
            collectionService.insertCollection(CollectionDto(name = "Coleção"))
        }

        assertEquals(ErrorMessages.UNEXPECTED_ERROR, exception.message)
    }
}
