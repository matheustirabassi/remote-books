package br.com.borgestirabassi.remotebooks.services

import br.com.borgestirabassi.remotebooks.domain.Author
import br.com.borgestirabassi.remotebooks.dto.AuthorDto
import br.com.borgestirabassi.remotebooks.repositories.AuthorRepository
import br.com.borgestirabassi.remotebooks.services.exceptions.ServiceException
import br.com.borgestirabassi.remotebooks.utils.ErrorMessages
import jakarta.transaction.Transactional
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class AuthorService {

    @Autowired
    private lateinit var authorRepository: AuthorRepository

    /**
     * Adiciona um novo autor no sistema.
     *
     * @param authorDto O Dto do autor.
     *
     * @return O identificador do novo autor criada.
     */
    @Transactional
    fun insertAuthor(authorDto: AuthorDto): Long {
        val newAuthor = Author(
            name = authorDto.name,
            dateOfBirth = authorDto.dateOfBirth,
        )

        authorRepository.saveAndFlush(newAuthor)

        return newAuthor.id ?: throw ServiceException(
            ErrorMessages.UNEXPECTED_ERROR,
        )
    }
}
