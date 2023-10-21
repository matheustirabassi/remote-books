package br.com.tirabassi.remotebooks.services

import br.com.tirabassi.remotebooks.domain.Author
import br.com.tirabassi.remotebooks.dto.AuthorDto
import br.com.tirabassi.remotebooks.repositories.AuthorRepository
import br.com.tirabassi.remotebooks.services.exceptions.ServiceException
import br.com.tirabassi.remotebooks.utils.ErrorMessages
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
            dateOfBirth = authorDto.dateOfBirth!!,
        )

        authorRepository.saveAndFlush(newAuthor)

        if (null == newAuthor.id) {
            throw ServiceException(ErrorMessages.UNEXPECTED_ERROR)
        }

        return newAuthor.id!!
    }

    fun getAuthors(): List<AuthorDto> {
        return mapToDto(authorRepository.findAll())
    }

    private fun mapToDto(authors: List<Author>): List<AuthorDto> {
        return authors.map { author -> AuthorDto(id = author.id, name = author.name) }
    }
}
